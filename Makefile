ifneq (,$(wildcard .env))
    include .env
    export
endif

build:
	@echo "Starting database"
	docker compose up -d
	@echo "Installing dependencies"
	pnpm install
	@echo "Resetting the database"
	pnpm prisma db push --force-reset
	echo "CREATE EXTENSION cube CASCADE;" | PGPASSWORD=password psql -U user -d db -h 127.0.0.1
	echo "CREATE EXTENSION earthdistance CASCADE;" | PGPASSWORD=password psql -U user -d db -h 127.0.0.1
	@echo "Generating the Prisma Client"
	pnpm prisma generate
	
import:
	cd cli && cp -r ../prisma/schema.prisma ./prisma/schema.prisma
	@echo "Importing the data"
	cd cli && pnpm i
	cd cli && pnpm prisma
	cd cli && pnpm cli import --all
	@echo "Indexing the data"
	cd cli && pnpm cli reindex

export:
	@echo "Resetting the prod database"
	prisma db push --force-reset
	@echo "Exporting the data"
	PGPASSWORD=password pg_dump db -U user -h 127.0.0.1 --data-only > db.sql
	@echo "Uploading the data"
	echo "CREATE EXTENSION cube CASCADE;" | psql -U "postgres.pzxllzbtbdbplfpajnlf" -h "aws-0-eu-central-1.pooler.supabase.com" -p 6543 -d postgres
	echo "CREATE EXTENSION earthdistance CASCADE;" | psql -U "postgres.pzxllzbtbdbplfpajnlf" -h "aws-0-eu-central-1.pooler.supabase.com" -p 6543 -d postgres
	psql -U "postgres.pzxllzbtbdbplfpajnlf" -h "aws-0-eu-central-1.pooler.supabase.com" -p 6543 postgres < db.sql

deploy:
	npx prisma migrate deploy
	pnpm prisma
	cd cli && cp -r ../prisma/schema.prisma ./prisma/schema.prisma
	cd cli && pnpm prisma