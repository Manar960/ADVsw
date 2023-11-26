
FROM node:slim


WORKDIR /index

COPY package*.json ./


RUN npm install


COPY . .


ENV PORT=3000

EXPOSE $PORT


CMD node index.js
