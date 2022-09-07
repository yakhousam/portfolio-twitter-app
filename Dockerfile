FROM node:16.15.0

WORKDIR /code

COPY package.json .
COPY package-lock.json .

RUN npm ci --production

COPY .env .

ADD dist/apps /code/

CMD node server/main.js