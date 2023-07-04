# Base image for building the app
FROM node:lts-buster-slim AS base
RUN apt-get update && apt-get install -y libssl-dev ca-certificates
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
COPY .env .env
COPY prisma prisma
COPY . .
ENV DATABASE_URL="postgres://default:HlJzr0v6eyGp@ep-calm-brook-757839.us-east-1.postgres.vercel-storage.com:5432/verceldb"
RUN npm run prisma:generate
RUN npm build

EXPOSE 3001

CMD ["npm", "start"]
