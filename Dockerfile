# Local preview of the production build.
#
# NOT the deployment path — the site is uploaded to Hostinger by hand from
# `dist/`. This exists so the static output can be served the way a real web
# server would serve it (clean URLs, a proper 404) before you upload it.

FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable

# Install dependencies first so this layer is cached across source changes.
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
