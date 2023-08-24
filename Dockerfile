FROM node:16-alpine as client

WORKDIR /app/client

COPY client/package.json /app/client

RUN npm install

COPY client .

RUN npm run build

FROM node:16-alpine

WORKDIR /app

COPY server/package.json .

RUN npm install

COPY server /app

COPY --from=client app/client/build client

EXPOSE 8080

CMD ["npm", "start"]