# Colors for output
YELLOW=\033[0;33m
GREEN=\033[0;32m
RED=\033[0;31m
NC=\033[0m # No Color

.PHONY: build start import logs sh stop

logs:
	docker compose logs -f

build:
	docker compose -f docker-compose.full.yml build --no-cache

start:
	docker compose -f docker-compose.full.yml up -d
	docker compose -f docker-compose.full.yml exec db sh -c 'psql -U user -d db -c "CREATE EXTENSION IF NOT EXISTS cube CASCADE;"'
	docker compose -f docker-compose.full.yml exec db sh -c 'psql -U user -d db -c "CREATE EXTENSION IF NOT EXISTS earthdistance CASCADE;"'
	docker compose -f docker-compose.full.yml exec db sh -c 'psql -U user -d db -c "SELECT * FROM pg_extension;"'
	docker compose -f docker-compose.full.yml logs -f

stop:
	docker compose -f docker-compose.full.yml down

db-start:
	docker compose up -d

dev:
	pnpm i
	pnpm prisma db push
	pnpm prisma generate
	pnpm dev

db-stop:
	docker compose down

db-reset:
	pnpm prisma db push --force-reset

sh:
	docker compose exec app sh

clean-posts:
	docker compose exec db sh -c 'psql -U user -d db -c "DELETE FROM public.\"Post\";"'

import:
	pnpm prisma db push --force-reset
	pnpm prisma generate
	docker compose exec db sh -c 'psql -U user -d db -c "CREATE EXTENSION IF NOT EXISTS cube CASCADE;"'
	docker compose exec db sh -c 'psql -U user -d db -c "CREATE EXTENSION IF NOT EXISTS earthdistance CASCADE;"'
	docker compose exec db sh -c 'psql -U user -d db -c "SELECT * FROM pg_extension;"'
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
	$(eval export DIRECT_URL)
	@echo "$(RED)WARNING: This will delete all data in the prod database$(NC)"
	@echo "$(RED)Are you sure you want to continue? [y/N]$(NC)"
	@read -r confirm; \
	if [ "$$confirm" != "y" ] && [ "$$confirm" != "Y" ]; then \
		echo "$(YELLOW)Operation cancelled.$(NC)"; \
		exit 1; \
	fi
	@echo "$(YELLOW)Pushing schema to prod database and resetting database...$(NC)"
	@echo "$(YELLOW)First, dropping all tables in the prod database database...$(NC)"
	@echo "$(YELLOW)Exporting the data...$(NC)"
	@PGPASSWORD=password pg_dump db -U user -h 127.0.0.1 --no-comments --no-owner --no-privileges > db.sql 2>/dev/null || (echo "$(RED)Error: Failed to export data$(NC)" && exit 1)
	@echo "$(YELLOW)Cleaning up SQL dump...$(NC)"
	@psql "$(DIRECT_URL)" -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public;" >/dev/null 2>&1 || (echo "$(RED)Error: Failed to drop schema in prod database$(NC)")
	@echo "$(GREEN)✓ All tables dropped in prod database database$(NC)"
	@echo "$(YELLOW)Installing database extensions...$(NC)"
	@psql "$(DIRECT_URL)" -c "CREATE EXTENSION IF NOT EXISTS cube CASCADE;" >/dev/null 2>&1 || echo "$(YELLOW)Note: cube extension might already exist$(NC)"
	@psql "$(DIRECT_URL)" -c "CREATE EXTENSION IF NOT EXISTS earthdistance CASCADE;" >/dev/null 2>&1 || echo "$(YELLOW)Note: earthdistance extension might already exist$(NC)"
	@echo "$(YELLOW)Uploading data to prod database (this may take a while)...$(NC)"
	@psql "$(DIRECT_URL)" < db.sql >/dev/null 2>&1 || (echo "$(RED)Error: Failed to upload data to prod database$(NC)" && exit 1)
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
