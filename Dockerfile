FROM node:16-alpine

WORKDIR /app

RUN npm i -g serve

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

CMD ["serve", "-s", "build"]