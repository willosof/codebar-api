FROM node:21-alpine AS node

ARG REDIS_HOST
ARG REDIS_PORT
ARG REDIS_USER
ARG REDIS_PASS

RUN apk update && apk add git openssh-client && npm config set shell sh

RUN mkdir -p /usr/src/
WORKDIR /usr/src/

COPY package.json yarn.lock tsconfig.json /usr/src/

COPY src/ /usr/src/src

RUN yarn add tsc
RUN yarn build

FROM node:21-bullseye-slim
COPY --from=node /usr/src/node_modules /usr/src/node_modules
COPY --from=node /usr/src/dist /usr/src/dist
COPY package.json /usr/src/
EXPOSE 3000
WORKDIR /usr/src/
CMD ["node", "./dist/index.js"]
