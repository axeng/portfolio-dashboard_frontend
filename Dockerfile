FROM node:14.15-alpine3.13

ARG VUE_APP_BACKEND_ADDRESS

WORKDIR /frontend

COPY package*.json /frontend/

RUN yarn install

COPY . /frontend/

RUN echo "VUE_APP_BACKEND_ADDRESS=${VUE_APP_BACKEND_ADDRESS}" >> .env.production.local

RUN yarn build

ENV ENV="production"
