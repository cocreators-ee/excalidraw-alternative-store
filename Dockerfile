# https://github.com/lietu/docker-images/tree/main/nodejs-base/ubuntu22.04-node20
FROM ghcr.io/lietu/nodejs-base:ubuntu22.04-node20

WORKDIR /src

ADD package.json .
ADD pnpm-lock.yaml .

RUN pnpm install

ADD . .

RUN pnpm run build

ENTRYPOINT ["pnpm", "run", "start"]
