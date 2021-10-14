# DataGalaxy Chromium Extension (built with React using Typescript and Css modules)

> This project host the chromium extension of DataGalaxy

## Prerequisite

-   [Rush](https://rushjs.io/)
-   [PNPM](https://pnpm.io/)

## Installation
```
rush update
```

## Lauch the app
1.  Complete the steps to build the project above
2.  Go to [_chrome://extensions_](chrome://extensions) in Google Chrome
3.  With the developer mode checkbox ticked, click **Load unpacked** and select the _dist_ folder from this repo

## Merging with master

Remember to update the app version in manifest.json before merging

## Install a new dependency

```
rush add <dependency>
```

## Build

```
pnpm build
```

## Watch for changes

```
pnpm watch
```

## Deploy production

First you need to update the version number

-   Open [manifest.json](./dist/manifest.json)
-   Change `"version": "<version number>"`to the new version number
-   Open [package.json](./package.json)
-   Change `"version": "<version number>"`to the new version number

Then you need to rebuild everything

```
rush rebuild
```

Then :

-   zip the `dist` folder
-   Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/u/1/webstore/devconsole/484e7c1a-5608-4422-9cc8-32041026e836?hl=fr)
-   Connect with cws-dev@datagalaxy.com account (Password pinned in Slack : `#datagalaxy-thetribe`)
-   Click on `DataGalaxy`
-   Go to `Package`
-   Click on `Import a new package` on the top right of the screen
-   Import the zipfile you previously created
-   Click on `Send for review`


