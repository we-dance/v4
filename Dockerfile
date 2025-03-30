FROM node:lts-alpine3.17

# Set environment variables
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV SHELL="/bin/sh"

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

RUN pnpm prisma generate

COPY . .

CMD ["sh", "-c", "pnpm prisma db push --force-reset && pnpm dev"]
