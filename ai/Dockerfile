# Use Node.js LTS version
FROM node:22-slim

# Create app directory
WORKDIR /usr/src/app/ai

RUN npm i -g corepack@latest && corepack enable

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Copy env file
COPY .env.example .env

# Command to run the bot
CMD ["pnpm", "run", "bot"] 