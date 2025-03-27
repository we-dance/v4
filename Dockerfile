FROM node:lts-alpine3.17

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

COPY . .

CMD ["sh", "-c", "npm install -g pnpm && pnpm install && pnpm prisma db push --force-reset && pnpm prisma generate && pnpm dev"]
