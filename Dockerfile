FROM node:20-alpine AS base
RUN npm i -g pnpm

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm run build

FROM gcr.io/distroless/nodejs20-debian12 AS production
WORKDIR /app

ARG JWT_SECRET
ARG NEXT_PUBLIC_API_URL

ENV JWT_SECRET=${JWT_SECRET}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ENV HOSTNAME="0.0.0.0"
CMD ["server.js"]


#
# FROM node:20-alpine AS base
# RUN npm i -g pnpm

# FROM base AS deps
# RUN apk add --no-cache libc6-compat
# WORKDIR /app
# COPY package.json pnpm-lock.yaml ./

# RUN pnpm install

# FROM base AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# RUN pnpm run build

# CMD ["pnpm", "run", "start"]
#
