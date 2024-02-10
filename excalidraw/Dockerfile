# https://github.com/lietu/docker-images/tree/main/nodejs-base/ubuntu22.04-node20
FROM ghcr.io/lietu/nodejs-base:ubuntu22.04-node20 AS build

WORKDIR /src

RUN : \
    && apt-get update \
    && apt-get install -y git \
    && git config --global --add safe.directory /src \
    && git clone --depth=1 https://github.com/excalidraw/excalidraw.git . \
    && yarn install \
    && yarn build:app:docker \
    && apt-get clean \
    && :


FROM nginx:1.25-alpine

COPY --from=build /src/build /usr/share/nginx/html

HEALTHCHECK CMD wget -q -O /dev/null http://localhost || exit 1
