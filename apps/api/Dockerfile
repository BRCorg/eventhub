# syntax=docker/dockerfile:1

# On part d'une image Node légère
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

# On installe toutes les dépendances
FROM base AS deps
RUN npm ci

# Dev : le code est monté par le compose, nodemon relance à chaque modif
FROM deps AS dev
ENV NODE_ENV=development
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# On compile le TypeScript
FROM deps AS build
COPY . .
RUN npm run build

# Prod : juste le JS compilé, sans les outils de dev, et pas en root
FROM base AS prod
ENV NODE_ENV=production
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/healthz || exit 1
CMD ["node", "dist/index.js"]
