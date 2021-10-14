# DataGalaxy extensions

## Repository infrastructure

This repository is a monorepo.
This means that multiple project are inside this repository.

### Infrastucture

- [common](./common/) : Rush configuration and temporary files
- [packages](./packages/) : The folder containing every projets of the repository
- [chromium-extension](./packages/chromium-extension) : The chromium extension project
- [slack-extension](./packages/slack-extension) : The slack extension project
- [shared](./packages/shared) : The shared library between all the extensions

## Prerequisite

- [Rush](https://rushjs.io/)
- [PNPM](https://pnpm.io/)

## Installation

```
rush update
```

## Install a new dependency inside a package

```
cd packages/<package-name>
rush add <dependency>
```

## Build all projects

```
rush build
```

## Watch for changes of one project

```
cd packages/<package-name>
pnpm watch
```
