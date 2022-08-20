FROM node:16

WORKDIR /store-builder/frontend

COPY frontend/package*.json ./
COPY frontend/yarn.lock ./

RUN yarn install

COPY frontend/ .

EXPOSE 3090

CMD ["/bin/sh", "-c", "PORT=3090 yarn start"]
