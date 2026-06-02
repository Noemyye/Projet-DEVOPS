FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001

RUN chown -R appuser:nodejs /usr/src/app

USER appuser

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/server.js"]