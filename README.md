[![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/xxxchromexxx?logo=google&logoColor=white&label=google%20users)](https://chrome.google.com/webstore/detail/smwc-web-extension/xxxchromexxx)
[![Mozilla Add-on Users](https://img.shields.io/amo/users/smwc-web-extension?logo=mozilla&label=mozilla%20users)](https://addons.mozilla.org/addon/smwc-web-extension)
[![Chrome Web Store Version](https://img.shields.io/chrome-web-store/v/xxxchromexxx?label=chrome&logo=googlechrome)](https://chrome.google.com/webstore/detail/smwc-web-extension/xxxchromexxx)
[![Mozilla Add-on Version](https://img.shields.io/amo/v/smwc-web-extension?label=firefox&logo=firefox)](https://addons.mozilla.org/addon/smwc-web-extension)
[![GitHub Release Version](https://img.shields.io/github/v/release/cssnr/smwc-web-extension?logo=github)](https://github.com/cssnr/smwc-web-extension/releases/latest)
[![Manifest Version](https://img.shields.io/github/manifest-json/v/cssnr/smwc-web-extension?filename=manifest.json&logo=json&label=manifest)](https://github.com/cssnr/smwc-web-extension/blob/master/manifest.json)
[![Build](https://github.com/cssnr/smwc-web-extension/actions/workflows/build.yaml/badge.svg)](https://github.com/cssnr/smwc-web-extension/actions/workflows/build.yaml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=cssnr_smwc-web-extension&metric=alert_status&label=quality)](https://sonarcloud.io/summary/overall?id=cssnr_smwc-web-extension)
# SMWC Web Extension

Modern Chrome and Firefox Addon to easily Patch and Play ROMs Online via [smwc.world](https://smwc.world).

*   [Install](#install)
*   [Features](#features)
*   [Configuration](#configuration)
*   [Development](#development)
    -   [Building](#building)

# Install

*   [Google Chrome Web Store](https://chrome.google.com/webstore/detail/smwc-web-extension/xxxchromexxx)
*   [Mozilla Firefox Add-ons](https://addons.mozilla.org/addon/smwc-web-extension)

[![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png)](https://chrome.google.com/webstore/detail/smwc-web-extension/xxxchromexxx)
[![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_48x48.png)](https://addons.mozilla.org/addon/smwc-web-extension)
[![Edge](https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_48x48.png)](https://chrome.google.com/webstore/detail/smwc-web-extension/xxxchromexxx)
[![Chromium](https://raw.githubusercontent.com/alrra/browser-logos/main/src/chromium/chromium_48x48.png)](https://chrome.google.com/webstore/detail/smwc-web-extension/xxxchromexxx)
[![Brave](https://raw.githubusercontent.com/alrra/browser-logos/main/src/brave/brave_48x48.png)](https://chrome.google.com/webstore/detail/smwc-web-extension/xxxchromexxx)
[![Vivaldi](https://raw.githubusercontent.com/alrra/browser-logos/main/src/vivaldi/vivaldi_48x48.png)](https://chrome.google.com/webstore/detail/smwc-web-extension/xxxchromexxx)
[![Opera](https://raw.githubusercontent.com/alrra/browser-logos/main/src/opera/opera_48x48.png)](https://chrome.google.com/webstore/detail/smwc-web-extension/xxxchromexxx)

All **Chromium** Based Browsers can install the extension from the
[Chrome Web Store](https://chrome.google.com/webstore/detail/smwc-web-extension/xxxchromexxx).

# Features

Please submit a [Feature Request](https://github.com/cssnr/smwc-web-extension/discussions/new?category=feature-requests) for new features.  
For any issues, bugs or concerns; please [Open an Issue](https://github.com/cssnr/smwc-web-extension/issues/new).  

# Configuration

You can pin the Addon by clicking the `Puzzle Piece`, find the SMWC Web Extension icon, then;  
**Chrome,** click the `Pin` icon.  
**Firefox,** click the `Settings Wheel` and `Pin to Toolbar`.

# Development

**Quick Start**

To install and run chrome or firefox with web-ext.
```shell
npm isntall
npm run chrome
npm run firefox
```

To Load Unpacked/Temporary Add-on make a `manifest.json` and run from the [src](src) folder.
```shell
npm run manifest:chrome
npm run manifest:firefox
```

For more information on web-ext, [read this documentation](https://extensionworkshop.com/documentation/develop/web-ext-command-reference/).  
To pass additional arguments to an `npm run` command, use `--`.  
Example: `npm run chrome -- --chromium-binary=...`  

## Building

Install the requirements and copy libraries into the `src/dist` directory by running `npm install`.
See [gulpfile.js](gulpfile.js) for more information on `postinstall`.
```shell
npm install
```

To load unpacked or temporary addon from the [src](src) folder, you must generate the `src/manifest.json` for the desired browser.
```shell
npm run manifest:chrome
npm run manifest:firefox
```

If you would like to create a `.zip` archive of the [src](src) directory for the desired browser.
```shell
npm run build
npm run build:chrome
npm run build:firefox
```

For more information on building, see the scripts in the [package.json](package.json) file.

## Chrome Setup

To install for production: https://chrome.google.com/webstore/detail/smwc-web-extension/xxxchromexxx

1.  Build or Download a [Release](https://github.com/cssnr/smwc-web-extension/releases).
1.  Unzip the archive, place the folder where it must remain and note its location for later.
1.  Open Chrome, click the `3 dots` in the top right, click `Extensions`, click `Manage Extensions`.
1.  In the top right, click `Developer Mode` then on the top left click `Load unpacked`.
1.  Navigate to the folder you extracted in step #3 then click `Select Folder`.

## Firefox Setup

To install for production: https://addons.mozilla.org/addon/smwc-web-extension

Note: Firefox Temporary addon's will **not** remain after restarting Firefox, therefore;
it is very useful to keep addon storage after uninstall/restart with `keepStorageOnUninstall`.

1.  Build or Download a [Release](https://github.com/cssnr/smwc-web-extension/releases).
1.  Unzip the archive, place the folder where it must remain and note its location for later.
1.  Go to `about:debugging#/runtime/this-firefox` and click `Load Temporary Add-on...`
1.  Navigate to the folder you extracted earlier, select `manifest.json` then click `Select File`.
1.  Open `about:config` search for `extensions.webextensions.keepStorageOnUninstall` and set to `true`.

If you need to test a restart, you must pack the addon. This only works in ESR, Development, or Nightly.

1.  Run `npm run build:firefox` then use `web-ext-artifacts/{name}-firefox-{version}.zip`.
1.  Open `about:config` search for `xpinstall.signatures.required` and set to `false`.
1.  Open `about:addons` and drag the zip file to the page or choose Install from File from the Settings wheel.
