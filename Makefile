# Colors for output
YELLOW=\033[0;33m
GREEN=\033[0;32m
RED=\033[0;31m
NC=\033[0m # No Color

.PHONY: build start import logs sh stop

logs:
	docker compose logs -f

build:
	docker compose build

stop:
	docker compose down

start:
	docker compose up -d
	docker compose exec db sh -c 'psql -U user -d db -c "CREATE EXTENSION IF NOT EXISTS cube CASCADE;"'
	docker compose exec db sh -c 'psql -U user -d db -c "CREATE EXTENSION IF NOT EXISTS earthdistance CASCADE;"'
	docker compose exec db sh -c 'psql -U user -d db -c "SELECT * FROM pg_extension;"'
	docker compose logs -f

sh:
	docker compose exec app sh

test-db-connection:
	@echo "$(YELLOW)Testing database connection to Docker container...$(NC)"
	@if [ -z "$(DB_USER)" ] || [ -z "$(DB_PASSWORD)" ] || [ -z "$(DB_NAME)" ]; then \
		echo "$(RED)Missing database credentials in environment variables.$(NC)"; \
		exit 1; \
	fi
	
	@# Find the right container name and store it
	@echo "$(YELLOW)Finding PostgreSQL container...$(NC)"
	@CONTAINER_NAME=$$(docker ps --format '{{.Names}}' | grep -E 'postgres|v4-postgres'); \
	if [ -z "$$CONTAINER_NAME" ]; then \
		echo "$(RED)PostgreSQL container not found. Starting database container...$(NC)"; \
		docker compose up -d; \
		echo "$(YELLOW)Waiting for container to start...$(NC)"; \
		sleep 10; \
		CONTAINER_NAME=$$(docker ps --format '{{.Names}}' | grep -E 'postgres|v4-postgres'); \
		if [ -z "$$CONTAINER_NAME" ]; then \
			echo "$(RED)Failed to start PostgreSQL container.$(NC)"; \
			exit 1; \
		fi; \
	else \
		echo "$(GREEN)✓ Found PostgreSQL container: $$CONTAINER_NAME$(NC)"; \
	fi; \
	\
	echo "$(YELLOW)Checking if container is running with correct DB setup...$(NC)"; \
	if docker exec $$CONTAINER_NAME psql -U $(DB_USER) -d $(DB_NAME) -c "SELECT 1;" >/dev/null 2>&1; then \
		echo "$(GREEN)✓ Database is ready and accessible$(NC)"; \
	else \
		echo "$(YELLOW)Database not ready yet. Waiting up to 30 seconds...$(NC)"; \
		max_attempts=30; \
		for i in $$(seq 1 $$max_attempts); do \
			if docker exec $$CONTAINER_NAME psql -U $(DB_USER) -d $(DB_NAME) -c "SELECT 1;" >/dev/null 2>&1; then \
				echo "$(GREEN)✓ Database is now ready and accessible$(NC)"; \
				break; \
			fi; \
			if [ $$i -eq $$max_attempts ]; then \
				echo "$(RED)Database still not accessible after $$max_attempts seconds.$(NC)"; \
				echo "$(YELLOW)Try directly accessing the container:$(NC)"; \
				echo "docker exec -it $$CONTAINER_NAME psql -U $(DB_USER) -d $(DB_NAME)"; \
				echo "$(YELLOW)Container logs:$(NC)"; \
				docker logs $$CONTAINER_NAME --tail 30; \
				exit 1; \
			fi; \
			echo "$(YELLOW)Waiting for database... ($$i/$$max_attempts)$(NC)"; \
			sleep 1; \
		done; \
	fi; \
	\
	echo "$(GREEN)✓ Successfully validated database connection$(NC)"

import:
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
	$(eval export DATABASE_URL)
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
	@echo "$(YELLOW)Exporting the data...$(NC)"
	@PGPASSWORD=password pg_dump db -U user -h 127.0.0.1 --no-comments --no-owner --no-privileges > db.sql 2>/dev/null || (echo "$(RED)Error: Failed to export data$(NC)" && exit 1)
	@echo "$(YELLOW)Cleaning up SQL dump...$(NC)"
	@PGPASSWORD="$(SUPABASE_DB_PASSWORD)" psql -U "$(SUPABASE_DB_USER)" -h "$(SUPABASE_DB_HOST)" -p $(SUPABASE_DB_PORT) "$(SUPABASE_DB_NAME)" -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public;" >/dev/null 2>&1 || (echo "$(RED)Error: Failed to drop schema in Supabase$(NC)" && exit 1)
	@echo "$(GREEN)✓ All tables dropped in Supabase database$(NC)"
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

get-postgres-container:
	@PG_CONTAINER=$$(docker ps --format '{{.Names}}' | grep -E 'postgres|v4-postgres'); \
	if [ -z "$$PG_CONTAINER" ]; then \
		echo "$(RED)Error: No running PostgreSQL container found.$(NC)"; \
		echo "$(YELLOW)Make sure docker is running and containers are started.$(NC)"; \
		exit 1; \
	fi; \
	echo $$PG_CONTAINER