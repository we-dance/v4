FROM node:lts-alpine3.17

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

COPY . .

RUN npm install -g pnpm
CMD ["sh", "-c", "pnpm install && pnpm prisma db push --force-reset && pnpm prisma generate && pnpm dev"]
