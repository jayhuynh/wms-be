FROM node:12.14.0-alpine

RUN mkdir /app

COPY . /app

WORKDIR /app

RUN npm install

CMD npm run watch

EXPOSE 3000
