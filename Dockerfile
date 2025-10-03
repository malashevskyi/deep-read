FROM node:22-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

COPY packages/server/package.json ./packages/server/
COPY packages/extension/package.json ./packages/extension/

RUN pnpm install --frozen-lockfile

COPY . .

FROM node:22-alpine

RUN npm install -g pnpm
WORKDIR /app

COPY --from=builder /app .

CMD ["pnpm", "--filter", "server", "run", "start:dev"]