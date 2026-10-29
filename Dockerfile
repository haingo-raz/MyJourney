FROM node:20-alpine AS web-build
WORKDIR /web

ARG REACT_APP_API_URL=""
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY web/package.json web/package-lock.json ./
RUN npm ci
COPY web/ ./
RUN npm run build

FROM node:20-alpine AS api
WORKDIR /app
ENV NODE_ENV=production

COPY api/package.json api/package-lock.json ./
RUN npm ci --omit=dev
COPY api/ ./

COPY --from=web-build /web/build ./public

EXPOSE 8080
CMD ["node", "server.js"]
