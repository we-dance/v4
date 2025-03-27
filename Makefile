ifneq (,$(wildcard .env))
    include .env
    export
endif

# Extract database credentials from DATABASE_URL
DB_USER      := $(shell echo $(DATABASE_URL) | sed -E 's|.*//([^:]+):.*|\1|')
DB_PASSWORD  := $(shell echo $(DATABASE_URL) | sed -E 's|.*//[^:]+:([^@]+)@.*|\1|')
DB_HOST      := $(shell echo $(DATABASE_URL) | sed -E 's|.*@([^:]+):.*|\1|')
DB_PORT      := $(shell echo $(DATABASE_URL) | sed -E 's|.*:([0-9]+)/.*|\1|')
DB_NAME      := $(shell echo $(DATABASE_URL) | sed -E 's|.*/([^?]+).*|\1|')

# Colors for output
YELLOW=\033[0;33m
GREEN=\033[0;32m
RED=\033[0;31m
NC=\033[0m # No Color

.PHONY: build start import

start:
	docker compose up -d

import:
	@echo "$(YELLOW)Importing data...$(NC)"
	cd cli && cp -r ../prisma/schema.prisma ./prisma/schema.prisma
	cd cli && pnpm i
	cd cli && pnpm prisma
	cd cli && pnpm cli import --all
	@echo "$(YELLOW)Indexing data...$(NC)"
	cd cli && pnpm cli reindex
	@echo "$(GREEN)✓ Data imported and indexed$(NC)"

export:
	@echo "$(YELLOW)Resetting the prod database...$(NC)"
	@if [ ! -f .env.prod ]; then \
		echo "$(YELLOW)Creating .env.prod file from example...$(NC)"; \
		cp .env.prod.example .env.prod; \
		echo "$(RED)Please edit .env.prod with your actual production credentials before continuing.$(NC)"; \
		echo "$(RED)Then run 'make export' again.$(NC)"; \
		exit 1; \
	else \
		echo "$(GREEN)✓ Using .env.prod file$(NC)"; \
	fi
	$(eval include .env.prod)
	$(eval export SUPABASE_DB_URL)
	$(eval export SUPABASE_DB_USER)
	$(eval export SUPABASE_DB_PASSWORD)
	$(eval export SUPABASE_DB_HOST)
	$(eval export SUPABASE_DB_PORT)
	$(eval export SUPABASE_DB_NAME)
	@echo "$(RED)WARNING: This will delete all data in the production database at $(SUPABASE_DB_HOST)$(NC)"
	@echo "$(RED)Are you sure you want to continue? [y/N]$(NC)"
	@read -r confirm; \
	if [ "$$confirm" != "y" ] && [ "$$confirm" != "Y" ]; then \
		echo "$(YELLOW)Operation cancelled.$(NC)"; \
		exit 1; \
	fi
	@echo "$(YELLOW)Pushing schema to Supabase and resetting database...$(NC)"
	@echo "$(YELLOW)First, dropping all tables in the Supabase database...$(NC)"
	@PGPASSWORD="$(SUPABASE_DB_PASSWORD)" psql -U "$(SUPABASE_DB_USER)" -h "$(SUPABASE_DB_HOST)" -p $(SUPABASE_DB_PORT) "$(SUPABASE_DB_NAME)" -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public;" >/dev/null 2>&1 || (echo "$(RED)Error: Failed to drop schema in Supabase$(NC)" && exit 1)
	@echo "$(GREEN)✓ All tables dropped in Supabase database$(NC)"
	@DATABASE_URL="$(SUPABASE_DB_URL)" npx prisma db push > /dev/null 2>&1 || (echo "$(RED)Error: Failed to push schema to Supabase$(NC)" && exit 1)
	@echo "$(GREEN)✓ Schema pushed to Supabase$(NC)"
	@echo "$(YELLOW)Exporting the data...$(NC)"
	@PGPASSWORD=password pg_dump db -U user -h 127.0.0.1 --no-comments --no-owner --no-privileges > db.sql 2>/dev/null || (echo "$(RED)Error: Failed to export data$(NC)" && exit 1)
	@echo "$(YELLOW)Cleaning up SQL dump...$(NC)"
	@echo "$(YELLOW)Installing database extensions...$(NC)"
	@PGPASSWORD="$(SUPABASE_DB_PASSWORD)" psql -U "$(SUPABASE_DB_USER)" -h "$(SUPABASE_DB_HOST)" -p $(SUPABASE_DB_PORT) -d "$(SUPABASE_DB_NAME)" -c "CREATE EXTENSION IF NOT EXISTS cube CASCADE;" >/dev/null 2>&1 || echo "$(YELLOW)Note: cube extension might already exist$(NC)"
	@PGPASSWORD="$(SUPABASE_DB_PASSWORD)" psql -U "$(SUPABASE_DB_USER)" -h "$(SUPABASE_DB_HOST)" -p $(SUPABASE_DB_PORT) -d "$(SUPABASE_DB_NAME)" -c "CREATE EXTENSION IF NOT EXISTS earthdistance CASCADE;" >/dev/null 2>&1 || echo "$(YELLOW)Note: earthdistance extension might already exist$(NC)"
	@echo "$(YELLOW)Uploading data to Supabase (this may take a while)...$(NC)"
	@PGPASSWORD="$(SUPABASE_DB_PASSWORD)" psql -U "$(SUPABASE_DB_USER)" -h "$(SUPABASE_DB_HOST)" -p $(SUPABASE_DB_PORT) "$(SUPABASE_DB_NAME)" < db.sql >/dev/null 2>&1 || (echo "$(RED)Error: Failed to upload data to Supabase$(NC)" && exit 1)
	@echo "$(GREEN)✓ Data exported and uploaded$(NC)"
	@echo "$(YELLOW)Cleaning up temporary files...$(NC)"
	@rm -f db.sql
	@echo "$(GREEN)✓ Temporary files removed$(NC)"

deploy:
	@echo "$(YELLOW)Deploying...$(NC)"
	npx prisma migrate deploy
	pnpm prisma
	cd cli && cp -r ../prisma/schema.prisma ./prisma/schema.prisma
	cd cli && pnpm prisma
	@echo "$(GREEN)✓ Deployment completed$(NC)"
