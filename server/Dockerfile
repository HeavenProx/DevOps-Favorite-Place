# ── Stage 1 : build ──────────────────────────────────────────────────────────
# On compile le TypeScript en JavaScript dans /app/dist
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY tsconfig.json ./
COPY src ./src
RUN yarn build

# ── Stage 2 : runtime ────────────────────────────────────────────────────────
# Image finale : seulement Node + dist/ + dépendances de PROD (pas de nodemon/ts-node)
FROM node:22-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile --production

COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]