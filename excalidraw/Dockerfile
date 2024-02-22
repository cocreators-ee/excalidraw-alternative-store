# https://github.com/lietu/docker-images/tree/main/nodejs-base/ubuntu22.04-node20
FROM ghcr.io/lietu/nodejs-base:ubuntu22.04-node20

ARG EXCALIDRAW_VERSION=v0.17.3

ENV VITE_APP_BACKEND_V2_GET_URL=$VITE_APP_BACKEND_V2_GET_URL \
    VITE_APP_BACKEND_V2_POST_URL=$VITE_APP_BACKEND_V2_POST_URL \
    VITE_APP_WS_SERVER_URL=$VITE_APP_WS_SERVER_URL \
    VITE_APP_DISABLE_TRACKING=true

WORKDIR /src

RUN set -x \
    && apt-get update \
    && apt-get install -y git nginx \
    && git config --global --add safe.directory /src \
    && git clone --depth=1 --branch $EXCALIDRAW_VERSION https://github.com/excalidraw/excalidraw.git . \
    && yarn install \
    && apt-get clean

COPY ./startup.sh .

ENTRYPOINT ["bash", "startup.sh"]
