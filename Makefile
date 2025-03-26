ifneq (,$(wildcard .env))
    include .env
    export
endif

# Detect operating system
UNAME_S := $(shell uname -s)
ifeq ($(UNAME_S),Darwin)
    OS := macos
else ifeq ($(UNAME_S),Linux)
    OS := linux
else
    OS := windows
endif

# Extract database credentials from DATABASE_URL
DB_USER      := $(shell echo $(DATABASE_URL) | sed -E 's|.*//([^:]+):.*|\1|')
DB_PASSWORD  := $(shell echo $(DATABASE_URL) | sed -E 's|.*//[^:]+:([^@]+)@.*|\1|')
DB_HOST      := $(shell echo $(DATABASE_URL) | sed -E 's|.*@([^:]+):.*|\1|')
DB_PORT      := $(shell echo $(DATABASE_URL) | sed -E 's|.*:([0-9]+)/.*|\1|')
DB_NAME      := $(shell echo $(DATABASE_URL) | sed -E 's|.*/([^?]+).*|\1|')

# Check if command exists
command_exists = $(shell which $(1) > /dev/null 2>&1 && echo 1 || echo 0)

# Get command versions
node_version = $(shell node -v 2>/dev/null)
pnpm_version = $(shell pnpm -v 2>/dev/null)
docker_version = $(shell docker --version 2>/dev/null | cut -d ' ' -f3 | tr -d ',')
git_version = $(shell git --version 2>/dev/null | cut -d ' ' -f3)

# Colors for output
YELLOW=\033[0;33m
GREEN=\033[0;32m
RED=\033[0;31m
NC=\033[0m # No Color

.PHONY: build start check-prereqs install-prereqs setup-env setup-db import

build: check-port-win check-prereqs setup-env check-quoted-env check-env-docker setup-db test-db-connection
	@echo "$(GREEN)Build completed successfully!$(NC)"
	@echo "$(GREEN)Run 'make start' to start the development server$(NC)"

start:
	@echo "$(GREEN)Starting development server...$(NC)"
	@if [ $(call command_exists,nvm) -eq 1 ]; then \
		echo "$(YELLOW)Running nvm use...$(NC)"; \
		export NVM_DIR="$$HOME/.nvm"; \
		[ -s "$$NVM_DIR/nvm.sh" ] && \. "$$NVM_DIR/nvm.sh"; \
		nvm use; \
		echo "$(GREEN)✓ Node version set$(NC)"; \
	else \
		echo "$(YELLOW)NVM not found, skipping nvm use$(NC)"; \
	fi
	@echo "$(YELLOW)Installing dependencies...$(NC)"
	pnpm i
	@echo "$(GREEN)✓ Dependencies installed$(NC)"
	pnpm dev

check-port-win:
	@if [ "$(OS)" = "windows" ]; then \
		echo "$(YELLOW)Checking if port 5432 is in use on Windows...$(NC)"; \
		PORT_CHECK=$$(netstat -ano | findstr :5432); \
		if [ ! -z "$$PORT_CHECK" ]; then \
			echo "$(YELLOW)Port 5432 is in use. Checking if it's Docker...$(NC)"; \
			DOCKER_RUNNING=$$(docker ps | findstr "postgres"); \
			if [ ! -z "$$DOCKER_RUNNING" ]; then \
				echo "$(GREEN)✓ Port 5432 is in use by your Docker PostgreSQL container, which is expected.$(NC)"; \
			else \
				echo "$(RED)Port 5432 is in use by another program (PID: $$(echo $$PORT_CHECK | awk '{print $$5}'))$(NC)"; \
				echo "$$PORT_CHECK"; \
				echo ""; \
				echo "$(YELLOW)You may need to stop the local PostgreSQL service:$(NC)"; \
				echo "  1. Open Services app (Win+R, type 'services.msc')"; \
				echo "  2. Find 'PostgreSQL' service and stop it"; \
				echo "  3. Or run this command to kill the process:"; \
				echo "     taskkill /PID $$(echo $$PORT_CHECK | awk '{print $$5}') /F"; \
				echo ""; \
			fi; \
		else \
			echo "$(GREEN)✓ Port 5432 is available$(NC)"; \
		fi; \
	fi

check-prereqs:
	@echo "$(YELLOW)Checking prerequisites...$(NC)"
	
	@if [ $(call command_exists,node) -eq 0 ]; then \
		echo "$(RED)Node.js is not installed$(NC)"; \
		$(MAKE) install-prereqs; \
	else \
		echo "$(GREEN)✓ Node.js is installed$(NC) ($(node_version))"; \
		node_major_version=$$(node -v | cut -d. -f1 | tr -d 'v'); \
		if [ $$node_major_version -lt 16 ]; then \
			echo "$(RED)Node.js version too old. Please use Node.js 16 or newer.$(NC)"; \
			echo "$(YELLOW)You can switch versions using: nvm use 16 (or higher)$(NC)"; \
			exit 1; \
		fi; \
	fi
	
	@if [ $(call command_exists,pnpm) -eq 0 ]; then \
		echo "$(RED)PNPM is not installed$(NC)"; \
		$(MAKE) install-prereqs; \
	else \
		echo "$(GREEN)✓ PNPM is installed$(NC) ($(pnpm_version))"; \
	fi
	
	@if [ $(call command_exists,docker) -eq 0 ]; then \
		echo "$(RED)Docker is not installed$(NC)"; \
		$(MAKE) install-prereqs; \
	else \
		echo "$(GREEN)✓ Docker is installed$(NC) ($(docker_version))"; \
	fi
	
	@if [ $(call command_exists,git) -eq 0 ]; then \
		echo "$(RED)Git is not installed$(NC)"; \
		$(MAKE) install-prereqs; \
	else \
		echo "$(GREEN)✓ Git is installed$(NC) ($(git_version))"; \
	fi

install-prereqs:
	@echo "$(YELLOW)Installing missing prerequisites...$(NC)"
	
	@if [ $(call command_exists,node) -eq 0 ]; then \
		echo "$(YELLOW)Installing Node.js via NVM...$(NC)"; \
		if [ $(call command_exists,nvm) -eq 0 ]; then \
			echo "$(YELLOW)Installing NVM first...$(NC)"; \
			if [ "$(OS)" = "macos" ] || [ "$(OS)" = "linux" ]; then \
				curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash; \
				export NVM_DIR="$$HOME/.nvm"; \
				[ -s "$$NVM_DIR/nvm.sh" ] && \. "$$NVM_DIR/nvm.sh"; \
			else \
				echo "$(RED)Please install NVM manually on Windows: https://github.com/nvm-sh/nvm#installing-and-updating$(NC)"; \
				exit 1; \
			fi; \
		fi; \
		nvm install; \
		nvm use; \
	fi
	
	@if [ $(call command_exists,pnpm) -eq 0 ]; then \
		echo "$(YELLOW)Installing PNPM...$(NC)"; \
		if [ "$(OS)" = "macos" ] || [ "$(OS)" = "linux" ]; then \
			curl -fsSL https://get.pnpm.io/install.sh | sh -; \
			export PNPM_HOME="$$HOME/.local/share/pnpm"; \
			export PATH="$$PNPM_HOME:$$PATH"; \
		else \
			echo "$(RED)Please install PNPM manually on Windows: https://pnpm.io/installation$(NC)"; \
			exit 1; \
		fi; \
	fi
	
	@if [ $(call command_exists,docker) -eq 0 ]; then \
		echo "$(RED)Please install Docker manually: https://www.docker.com/products/docker-desktop/$(NC)"; \
		exit 1; \
	fi

setup-env:
	@echo "$(YELLOW)Setting up environment...$(NC)"
	@if [ ! -f .env ]; then \
		echo "$(YELLOW)Creating .env file...$(NC)"; \
		cp .env.example .env; \
		echo "$(GREEN)✓ Created .env file$(NC)"; \
	else \
		echo "$(GREEN)✓ .env file already exists$(NC)"; \
	fi
	
	@if [ ! -f cli/.env ]; then \
		echo "$(YELLOW)Creating cli/.env file...$(NC)"; \
		cp cli/.env.example cli/.env; \
		echo "$(GREEN)✓ Created cli/.env file$(NC)"; \
	else \
		echo "$(GREEN)✓ cli/.env file already exists$(NC)"; \
	fi
	
	@echo "$(YELLOW)Installing dependencies...$(NC)"
	pnpm install
	@echo "$(GREEN)✓ Dependencies installed$(NC)"

check-quoted-env:
	@echo "$(YELLOW)Checking DATABASE_URL in .env file...$(NC)"
	@if [ ! -f .env ]; then \
		echo "$(RED).env file doesn't exist. Run 'make setup-env' first.$(NC)"; \
		exit 1; \
	fi
	
	@if ! grep -q '^DATABASE_URL=' .env; then \
		echo "$(RED)DATABASE_URL is missing in .env file.$(NC)"; \
		exit 1; \
	fi
	
	@if grep -q '^DATABASE_URL="[^"]*"' .env; then \
		echo "$(RED)DATABASE_URL has quotes around it in .env.$(NC)"; \
		echo "$(RED)Remove them, e.g.: DATABASE_URL=postgresql://user:password@localhost:5432/db$(NC)"; \
		exit 1; \
	else \
		echo "$(GREEN)✓ DATABASE_URL format is correct$(NC)"; \
	fi

check-env-docker:
	@echo "$(YELLOW)Checking if .env DB credentials match docker setup...$(NC)"
	@echo "DEBUG: DATABASE_URL=$(DATABASE_URL)"
	@echo "DEBUG: Extracted DB_USER=$(DB_USER)"
	@echo "DEBUG: Extracted DB_PASSWORD=$(DB_PASSWORD)"
	@echo "DEBUG: Extracted DB_HOST=$(DB_HOST)"
	@echo "DEBUG: Extracted DB_NAME=$(DB_NAME)"
	
	@if [ ! -f docker-compose.yml ] && [ ! -f docker-compose.yaml ]; then \
		echo "$(RED)No docker-compose file found. Cannot validate DB credentials.$(NC)"; \
		echo "$(YELLOW)Skipping DB credential check. Make sure your .env matches your Docker config.$(NC)"; \
		echo "Current values: DB_USER=$(DB_USER), DB_PASSWORD=$(DB_PASSWORD), DB_NAME=$(DB_NAME)"; \
		return 0; \
	fi
	
	@if [ "$(DB_USER)" != "user" ]; then \
		echo "$(RED).env DB_USER=$(DB_USER) does not match expected 'user' in docker-compose$(NC)"; \
		exit 1; \
	elif [ "$(DB_PASSWORD)" != "password" ]; then \
		echo "$(RED).env DB_PASSWORD does not match expected 'password' in docker-compose$(NC)"; \
		exit 1; \
	elif [ "$(DB_NAME)" != "db" ]; then \
		echo "$(RED).env DB_NAME=$(DB_NAME) does not match expected 'db' in docker-compose$(NC)"; \
		exit 1; \
	else \
		echo "$(GREEN)✓ .env DB credentials match docker setup$(NC)"; \
	fi

setup-db:
	@echo "$(YELLOW)Setting up database...$(NC)"
	
	@# Check if container already exists
	@PG_CONTAINER=$$(docker ps -a -q -f name=postgres 2>/dev/null); \
	if [ ! -z "$$PG_CONTAINER" ]; then \
		echo "$(YELLOW)PostgreSQL container already exists. Stopping and removing...$(NC)"; \
		docker stop $$PG_CONTAINER >/dev/null 2>&1; \
		docker rm $$PG_CONTAINER >/dev/null 2>&1; \
	fi
	
	@echo "$(YELLOW)Starting database...$(NC)"
	docker compose up -d
	@echo "$(GREEN)✓ Database started$(NC)"
	
	@# Wait for container to be ready
	@echo "$(YELLOW)Waiting for container to be ready...$(NC)"
	@sleep 5
	
	@echo "$(YELLOW)Resetting the database...$(NC)"
	pnpm prisma db push --force-reset
	@echo "$(GREEN)✓ Database reset$(NC)"
	
	@echo "$(YELLOW)Installing database extensions...$(NC)"
	@if command -v docker >/dev/null 2>&1; then \
		PG_CONTAINER=$$(docker ps -q -f name=postgres 2>/dev/null); \
		if [ ! -z "$$PG_CONTAINER" ]; then \
			docker exec -i $$PG_CONTAINER psql -U user -d db -c "CREATE EXTENSION IF NOT EXISTS cube CASCADE;" 2>/dev/null || echo "$(YELLOW)Could not create cube extension using Docker. Some geographic features may not work.$(NC)"; \
			docker exec -i $$PG_CONTAINER psql -U user -d db -c "CREATE EXTENSION IF NOT EXISTS earthdistance CASCADE;" 2>/dev/null || echo "$(YELLOW)Could not create earthdistance extension using Docker. Some geographic features may not work.$(NC)"; \
			echo "$(GREEN)✓ Database extensions installed$(NC)"; \
		else \
			echo "$(RED)PostgreSQL container not found after starting it. Something went wrong.$(NC)"; \
			exit 1; \
		fi; \
	else \
		echo "$(YELLOW)Docker command not available. Skipping database extensions installation.$(NC)"; \
		echo "$(YELLOW)Some geographic features may not work.$(NC)"; \
	fi
	
	@echo "$(YELLOW)Generating Prisma Client...$(NC)"
	pnpm prisma generate
	@echo "$(GREEN)✓ Prisma Client generated$(NC)"

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
	@echo "$(YELLOW)Checking required environment variables...$(NC)"
	@if [ -z "$(SUPABASE_DB_URL)" ]; then \
		echo "$(RED)Error: SUPABASE_DB_URL is not set in .env.prod$(NC)"; \
		exit 1; \
	fi
	@if [ -z "$(SUPABASE_DB_USER)" ]; then \
		echo "$(RED)Error: SUPABASE_DB_USER is not set in .env.prod$(NC)"; \
		exit 1; \
	fi
	@if [ -z "$(SUPABASE_DB_PASSWORD)" ]; then \
		echo "$(RED)Error: SUPABASE_DB_PASSWORD is not set in .env.prod$(NC)"; \
		exit 1; \
	fi
	@if [ -z "$(SUPABASE_DB_HOST)" ]; then \
		echo "$(RED)Error: SUPABASE_DB_HOST is not set in .env.prod$(NC)"; \
		exit 1; \
	fi
	@if [ -z "$(SUPABASE_DB_PORT)" ]; then \
		echo "$(RED)Error: SUPABASE_DB_PORT is not set in .env.prod$(NC)"; \
		exit 1; \
	fi
	@if [ -z "$(SUPABASE_DB_NAME)" ]; then \
		echo "$(RED)Error: SUPABASE_DB_NAME is not set in .env.prod$(NC)"; \
		exit 1; \
	fi
	@echo "$(GREEN)✓ All required environment variables are set$(NC)"
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
	@echo "$(YELLOW)Resetting the local database...$(NC)"
	@pnpm prisma db push --force-reset > /dev/null 2>&1 || (echo "$(RED)Error: Failed to reset local database$(NC)" && exit 1)
	@echo "$(GREEN)✓ Local database reset$(NC)"
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

get-postgres-container:
	@PG_CONTAINER=$$(docker ps --format '{{.Names}}' | grep -E 'postgres|v4-postgres'); \
	if [ -z "$$PG_CONTAINER" ]; then \
		echo "$(RED)Error: No running PostgreSQL container found.$(NC)"; \
		echo "$(YELLOW)Make sure docker is running and containers are started.$(NC)"; \
		exit 1; \
	fi; \
	echo $$PG_CONTAINER