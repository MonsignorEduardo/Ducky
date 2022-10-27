
FROM node:16 AS installer

WORKDIR /app
#Set pnpm
RUN corepack enable && corepack prepare pnpm@7.4.1 --activate 

COPY . .
RUN pnpm install
RUN pnpm turbo run build --filter=@ducky/telegram...

FROM node:16 AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app .

CMD node apps/telegram/build/index.js