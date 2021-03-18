FROM node:14.15-alpine3.13

ARG VUE_APP_BACKEND_ADDRESS
ARG VUE_APP_KEYCLOAK_ADDRESS
ARG VUE_APP_KEYCLOAK_REALM
ARG VUE_APP_KEYCLOAK_CLIENT_ID

WORKDIR /frontend

COPY package*.json /frontend/

RUN yarn install

COPY . /frontend/

RUN echo "VUE_APP_BACKEND_ADDRESS=${VUE_APP_BACKEND_ADDRESS}" >> .env.production.local
RUN echo "VUE_APP_KEYCLOAK_ADDRESS=${VUE_APP_KEYCLOAK_ADDRESS}" >> .env.production.local
RUN echo "VUE_APP_KEYCLOAK_REALM=${VUE_APP_KEYCLOAK_REALM}" >> .env.production.local
RUN echo "VUE_APP_KEYCLOAK_CLIENT_ID=${VUE_APP_KEYCLOAK_CLIENT_ID}" >> .env.production.local

RUN yarn build

ENV ENV="production"
