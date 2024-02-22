# Excalidraw Alternative Store

[![GitHub excalidraw-alternative-store image build](https://img.shields.io/github/actions/workflow/status/cocreators-ee/excalidraw-alternative-store/docker-image-excalidraw-alternative-store.yml)](https://github.com/cocreators-ee/excalidraw-alternative-store/actions/workflows/docker-image-excalidraw-alternative-store.yml)
[![GitHub excalidraw image build](https://img.shields.io/github/actions/workflow/status/cocreators-ee/excalidraw-alternative-store/docker-image-excalidraw.yml)](https://github.com/cocreators-ee/excalidraw-alternative-store/actions/workflows/docker-image-excalidraw.yml)
[![Pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit&logoColor=white)](https://github.com/cocreators-ee/excalidraw-alternative-store/blob/master/.pre-commit-config.yaml)

Provides alternative storage options for Excalidraw instead of [excalidraw-store](https://github.com/excalidraw/excalidraw-store).

Extensible way to store all the encrypted sharable drawings from [Excalidraw](https://excalidraw.com).

Currently implements the storage adapters for:

- [Local filesystem](.src/storage/local.ts)

Provides a reasonable easy and flexible API for providing more storage adapters.

## Usage

### Docker

To run with the default settings in port 8080, with local filesystem persistency in `./storage` run:

```shell
docker run -p 8080:8080 -v $(pwd)/storage:/src/storage ghcr.io/cocreators-ee/excalidraw-alternative-store
```

If you want to add configuration options, add e.g. `-e PORT=8000` after `run`.

### Manually

If you want, you can clone this repo, and run:

```shell
pnpm install
pnpm build
pnpm start
```

### Environment variables

`PORT` - Sinply the port to listen to. Defaults to 8080.

`FILE_SIZE_LIMIT` - Maximum upload size, in bytes. Defaults to 2097152 = 2MB.

`STORAGE_MODULE` - Which of the [implemented storage modules](./src/storage) will be used.

Valid options:

- `local`

`CORS_ALLOW_ORIGINS` - Comma separated list of origins to allow requests from. E.g. `http://localhost:` or `https://my.excalidraw.domain`

Defaults:

```
PORT=8080
FILE_SIZE_LIMIT=2097152
STORAGE_MODULE=local
CORS_ALLOW_ORIGINS=""
```

### Storage specific configuration

#### Local filesystem

`LOCAL_STORAGE_PATH` - Where should files be stored locally. Defaults to `./storage`.

## Development

Issues and PRs are welcome!

Please open an issue first to discuss the idea before sending a PR so that you know if it would be wanted or needs
re-thinking or if you should just make a fork for yourself.

You need Node 20+, PNPM, and pre-commit installed.

Once you clone the repo run `pre-commit install` in the repo root.

### Commands

```shell
pnpm dev
pnpm build
pnpm start
```

## "Protocol" as defined originally

The protocol is fairly silly, any upload is accepted and returns a new randomly generated ID for it, and you can then
retrieve the data with that ID again. You cannot update a file. No real checks of any kind are performed, so you can
store anything you want to any server following this protocol that fits in the configured filesize limit.

To make this piece better the protocol would have to be improved as well.

### POST

Example endpoint URL

```
https://json.excalidraw.com/api/v2/post/
```

#### Binary payload

Example of `binary` payload

```
1234567890
```

#### Response

```
{
  "id": "5633286537740288",
  "data": "https://json.excalidraw.com/api/v2/5633286537740288"
}
```

### GET

Example endpoint URL

```
https://json.excalidraw.com/api/v2/5633286537740288
```

#### Response

Example of binary response. If the id is found it will return the data. Otherwise 404.

```
1234567890
```

## License

The code is released under the MIT license. Details in the [LICENSE.md](./LICENSE.md) file.

# Financial support

This project has been made possible thanks to [Cocreators](https://cocreators.ee) and [Lietu](https://lietu.net). You
can help us continue our open source work by supporting us
on [Buy me a coffee](https://www.buymeacoffee.com/cocreators).

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/cocreators)
