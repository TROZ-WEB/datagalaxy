# DataGalaxy extensions

## Prerequisite

- [Rush](https://rushjs.io/)

## Installation

```
rush update
```

## Install a new dependency inside a package

```
cd packages/<package-name>
rush add <dependency>
```

## Repository infrastructure

This repository is a monorepo.
This means that multiple project are inside this repository.

### Infrastucture

- [common](./common/) : Rush configuration and temporary files
- [packages](./packages/) : The folder containing every projets of the repository
- [chrome](./packages/chrome) : The chrome extension project
- [slack](./packages/slack) : The slack extension project
- [shared](./packages/shared) : The shared library between all the extensions
