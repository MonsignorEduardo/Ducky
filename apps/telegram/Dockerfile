FROM node:alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
#Set pnpm
RUN corepack enable && corepack prepare pnpm@7.4.1 --activate 
# Set working directory
WORKDIR /app
COPY . .
RUN pnpm dlx turbo prune --scope=@ducky/telegram --docker


FROM node:alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
#Set pnpm
RUN corepack enable && corepack prepare pnpm@7.4.1 --activate 
# Set working directory
WORKDIR /app
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm turbo run build --filter=@ducky/telegram...




FROM node:16 AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app .

CMD node apps/telegram/build/index.js