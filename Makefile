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

build: check-prereqs setup-env setup-db
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

check-prereqs:
	@echo "$(YELLOW)Checking prerequisites...$(NC)"
	
	@if [ $(call command_exists,node) -eq 0 ]; then \
		echo "$(RED)Node.js is not installed$(NC)"; \
		$(MAKE) install-prereqs; \
	else \
		echo "$(GREEN)✓ Node.js is installed$(NC) ($(node_version))"; \
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

setup-db:
	@echo "$(YELLOW)Setting up database...$(NC)"
	@echo "$(YELLOW)Starting database...$(NC)"
	docker compose up -d
	@echo "$(GREEN)✓ Database started$(NC)"
	
	@echo "$(YELLOW)Resetting the database...$(NC)"
	pnpm prisma db push --force-reset
	@echo "$(GREEN)✓ Database reset$(NC)"
	
	@echo "$(YELLOW)Installing database extensions...$(NC)"
	echo "CREATE EXTENSION IF NOT EXISTS cube CASCADE;" | PGPASSWORD=password psql -U user -d db -h 127.0.0.1
	echo "CREATE EXTENSION IF NOT EXISTS earthdistance CASCADE;" | PGPASSWORD=password psql -U user -d db -h 127.0.0.1
	@echo "$(GREEN)✓ Database extensions installed$(NC)"
	
	@echo "$(YELLOW)Generating Prisma Client...$(NC)"
	pnpm prisma generate
	@echo "$(GREEN)✓ Prisma Client generated$(NC)"

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
	prisma db push --force-reset
	@echo "$(YELLOW)Exporting the data...$(NC)"
	PGPASSWORD=password pg_dump db -U user -h 127.0.0.1 --data-only > db.sql
	@echo "$(YELLOW)Uploading the data...$(NC)"
	echo "CREATE EXTENSION cube CASCADE;" | psql -U "postgres.pzxllzbtbdbplfpajnlf" -h "aws-0-eu-central-1.pooler.supabase.com" -p 6543 -d postgres
	echo "CREATE EXTENSION earthdistance CASCADE;" | psql -U "postgres.pzxllzbtbdbplfpajnlf" -h "aws-0-eu-central-1.pooler.supabase.com" -p 6543 -d postgres
	psql -U "postgres.pzxllzbtbdbplfpajnlf" -h "aws-0-eu-central-1.pooler.supabase.com" -p 6543 postgres < db.sql
	@echo "$(GREEN)✓ Data exported and uploaded$(NC)"

deploy:
	@echo "$(YELLOW)Deploying...$(NC)"
	npx prisma migrate deploy
	pnpm prisma
	cd cli && cp -r ../prisma/schema.prisma ./prisma/schema.prisma
	cd cli && pnpm prisma
	@echo "$(GREEN)✓ Deployment completed$(NC)"
