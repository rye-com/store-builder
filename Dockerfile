FROM node:16

WORKDIR /store-builder/
COPY dev_start.sh .

WORKDIR /store-builder/frontend
COPY frontend/package*.json ./
COPY frontend/yarn.lock ./
RUN yarn install
COPY frontend/ .

WORKDIR /store-builder/server
COPY server/ ./
RUN yarn install

EXPOSE 3090

WORKDIR /store-builder
CMD ./dev_start.sh
