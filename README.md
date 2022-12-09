# Rye store builder

Store builder demonstrates how to build apps on the RYE API. It allows influencers to build stores
in minutes. Store builder is located at https://rye.store

## Getting started

Make sure you have all dependencies installed

- [Docker](https://www.docker.com/get-started/)
- [Make](https://www.gnu.org/software/make/)
- [Node JS](https://nodejs.org/en/) - You need it to enable prettier and get intellisense in your code editor.
- Install prettier: `npm i -g prettier`
- [Setup prettier in your editor](https://prettier.io/docs/en/editors.html)

Update **hosts** file (/etc/hosts on \*nix):

```diff
255.255.255.255 broadcasthost
::1             localhost

+127.0.0.1 rye.local
+127.0.0.1 store-name.rye.local
# store-name is a name of the store that you want to be able to open locally.
# example: arjun (http://arjun.rye.local:3090)
```

(optional) Install **node_modules** to get intelisense:

```sh
cd frontend
yarn
cd ../server
yarn
```

Build docker image. You need this to be done only when dependencies of project change or you make changes to environment
configuration

```sh
make build
```

## Start the app

To run store-builder container use these commands

```sh
# To start container that makes calls to local API:
make start-with-local-api  # OR
# To start container that makes calls to production API
make start
# Navigate to the store builder
open "http://rye.store:3090"
```

To stop the container, run

```
make stop
```

## Docs

- [Docs](https://docs.rye.com/)

## What's next

Become a developer on RYE platform today. [Register](https://console.rye.com/register) and start playing around with our API on [tutorial](https://tutorial.rye.com/)

## License

Store builder is [MIT licensed](/LICENSE).
