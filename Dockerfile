FROM node:16.15.0

WORKDIR /code

COPY package.json .
COPY package-lock.json .

RUN npm i

RUN npx nx run-many --target=build


CMD node dist/apps/server/main.js