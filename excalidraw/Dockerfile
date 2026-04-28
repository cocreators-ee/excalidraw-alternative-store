# https://github.com/lietu/docker-images/tree/main/nodejs-base/ubuntu22.04-node20
FROM ghcr.io/lietu/nodejs-base:ubuntu22.04-node20

ARG EXCALIDRAW_VERSION=v0.17.3

ENV VITE_APP_BACKEND_V2_GET_URL=$VITE_APP_BACKEND_V2_GET_URL \
    VITE_APP_BACKEND_V2_POST_URL=$VITE_APP_BACKEND_V2_POST_URL \
    VITE_APP_WS_SERVER_URL=$VITE_APP_WS_SERVER_URL \
    VITE_APP_DISABLE_TRACKING=true

WORKDIR /src

COPY patches /patches

RUN set -x \
    && apt-get update \
    && apt-get install -y git nginx \
    && git config --global --add safe.directory /src \
    && git clone --depth=1 --branch $EXCALIDRAW_VERSION https://github.com/excalidraw/excalidraw.git . \
    && git config --global user.email "excali@draw.com" \
    && git config --global user.name "Patch Excalidraw Backend" \
    && git am --keep-cr --signoff < /patches/0001-Add-alternative-backend.patch \
    && git am --keep-cr --signoff < /patches/0002-Fix-analytics-not-being-disabled.patch \
    && yarn install \
    && apt-get clean

COPY ./startup.sh .

ENTRYPOINT ["bash", "startup.sh"]
