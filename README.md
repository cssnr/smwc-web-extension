[![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/foalfafgmnglcgpgkhhmcfhjgmdcjide?logo=google&logoColor=white&label=users)](https://chromewebstore.google.com/detail/smwc-web-extension/foalfafgmnglcgpgkhhmcfhjgmdcjide)
[![Mozilla Add-on Users](https://img.shields.io/amo/users/smwc-web-extension?logo=mozilla&label=users)](https://addons.mozilla.org/addon/smwc-web-extension)
[![Chrome Web Store Version](https://img.shields.io/chrome-web-store/v/foalfafgmnglcgpgkhhmcfhjgmdcjide?label=chrome&logo=googlechrome)](https://chromewebstore.google.com/detail/smwc-web-extension/foalfafgmnglcgpgkhhmcfhjgmdcjide)
[![Mozilla Add-on Version](https://img.shields.io/amo/v/smwc-web-extension?label=firefox&logo=firefox)](https://addons.mozilla.org/addon/smwc-web-extension)
[![GitHub Release Version](https://img.shields.io/github/v/release/cssnr/smwc-web-extension?logo=github&logoColor=white)](https://github.com/cssnr/smwc-web-extension/releases/latest)
[![Build](https://img.shields.io/github/actions/workflow/status/cssnr/smwc-web-extension/build.yaml?logo=github&logoColor=white&label=build)](https://github.com/cssnr/smwc-web-extension/actions/workflows/build.yaml)
[![Test](https://img.shields.io/github/actions/workflow/status/cssnr/smwc-web-extension/test.yaml?logo=github&logoColor=white&label=test)](https://github.com/cssnr/smwc-web-extension/actions/workflows/test.yaml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=cssnr_smwc-web-extension&metric=alert_status&label=quality)](https://sonarcloud.io/summary/overall?id=cssnr_smwc-web-extension)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/cssnr/smwc-web-extension?logo=github&logoColor=white&label=updated)](https://github.com/cssnr/smwc-web-extension/graphs/commit-activity)
[![GitHub Top Language](https://img.shields.io/github/languages/top/cssnr/smwc-web-extension?logo=htmx&logoColor=white)](https://github.com/cssnr/smwc-web-extension)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=github&logoColor=white)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/536290056571453450?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/6pzXJE5)
# SMWC Web Extension

Modern Chrome Web Extension and Firefox Browser Addon to easily Patch and Play ROMs Online via the [smwc.world](https://smwc.world) site.

*   [Install](#install)
*   [Features](#features)
*   [Configuration](#configuration)
*   [Support](#support)
*   [Development](#development)
    -   [Building](#building)
*   [Contributing](#Contributing)

## Install

*   [Google Chrome Web Store](https://chromewebstore.google.com/detail/smwc-web-extension/foalfafgmnglcgpgkhhmcfhjgmdcjide)
*   [Mozilla Firefox Add-ons](https://addons.mozilla.org/addon/smwc-web-extension)

[![Chrome](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/chrome_48.png)](https://chromewebstore.google.com/detail/smwc-web-extension/foalfafgmnglcgpgkhhmcfhjgmdcjide)
[![Firefox](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/firefox_48.png)](https://addons.mozilla.org/addon/smwc-web-extension)
[![Edge](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/edge_48.png)](https://chromewebstore.google.com/detail/smwc-web-extension/foalfafgmnglcgpgkhhmcfhjgmdcjide)
[![Chromium](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/chromium_48.png)](https://chromewebstore.google.com/detail/smwc-web-extension/foalfafgmnglcgpgkhhmcfhjgmdcjide)
[![Brave](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/brave_48.png)](https://chromewebstore.google.com/detail/smwc-web-extension/foalfafgmnglcgpgkhhmcfhjgmdcjide)
[![Vivaldi](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/vivaldi_48.png)](https://chromewebstore.google.com/detail/smwc-web-extension/foalfafgmnglcgpgkhhmcfhjgmdcjide)
[![Opera](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/opera_48.png)](https://chromewebstore.google.com/detail/smwc-web-extension/foalfafgmnglcgpgkhhmcfhjgmdcjide)

All **Chromium** Based Browsers can install the extension from the
[Chrome Web Store](https://chromewebstore.google.com/detail/smwc-web-extension/foalfafgmnglcgpgkhhmcfhjgmdcjide).

## Features

*    Patch or Play ROM's from the Popup
*    Patch or Play ROM's by Right-clicking Links

Please submit a [Feature Request](https://github.com/cssnr/smwc-web-extension/discussions/new?category=feature-requests) for new features.  
For any issues, bugs or concerns; please [Open an Issue](https://github.com/cssnr/smwc-web-extension/issues/new).  

## Configuration

You can pin the Addon by clicking the `Puzzle Piece`, find the SMWC Web Extension icon, then;  
**Chrome,** click the `Pin` icon.  
**Firefox,** click the `Settings Wheel` and `Pin to Toolbar`.

## Support

For help using the web extension, utilize any these resources:

- Q&A Discussion: https://github.com/cssnr/smwc-web-extension/discussions/categories/q-a
- Request a Feature: https://github.com/cssnr/smwc-web-extension/discussions/categories/feature-requests

If you are experiencing an issue/bug or getting unexpected results, use:

- Report an Issue: https://github.com/cssnr/smwc-web-extension/issues
- Chat with us on Discord: https://discord.gg/6pzXJE5
- Provide General Feedback: [https://cssnr.github.io/feedback](https://cssnr.github.io/feedback/?app=SMWC%20Web%20Extension)

Logs can be found inspecting the page (Ctrl+Shift+I), clicking on the Console, and;
Firefox: toggling Debug logs, Chrome: toggling Verbose from levels dropdown.

To support this project, see the [Contributing](#Contributing) section at the bottom.

# Development

**Quick Start**

First, clone (or download) this repository and change into the directory.

Second, install the dependencies:
```shell
npm install
```

Finally, to run Chrome or Firefox with web-ext, run one of the following:
```shell
npm run chrome
npm run firefox
```

Additionally, to Load Unpacked/Temporary Add-on make a `manifest.json` and run from the [src](src) folder, run one of the following:
```shell
npm run manifest:chrome
npm run manifest:firefox
```

Chrome: [https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked)  
Firefox: [https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)

For more information on web-ext, [read this documentation](https://extensionworkshop.com/documentation/develop/web-ext-command-reference/).  
To pass additional arguments to an `npm run` command, use `--`.  
Example: `npm run chrome -- --chromium-binary=...`

## Building

Install the requirements and copy libraries into the `src/dist` directory by running `npm install`.
See [gulpfile.js](gulpfile.js) for more information on `postinstall`.
```shell
npm install
```

To create a `.zip` archive of the [src](src) directory for the desired browser run one of the following:
```shell
npm run build
npm run build:chrome
npm run build:firefox
```

For more information on building, see the scripts section in the [package.json](package.json) file.

### Chrome Setup

1.  Build or Download a [Release](https://github.com/cssnr/smwc-web-extension/releases).
1.  Unzip the archive, place the folder where it must remain and note its location for later.
1.  Open Chrome, click the `3 dots` in the top right, click `Extensions`, click `Manage Extensions`.
1.  In the top right, click `Developer Mode` then on the top left click `Load unpacked`.
1.  Navigate to the folder you extracted in step #3 then click `Select Folder`.

### Firefox Setup

1.  Build or Download a [Release](https://github.com/cssnr/smwc-web-extension/releases).
1.  Unzip the archive, place the folder where it must remain and note its location for later.
1.  Go to `about:debugging#/runtime/this-firefox` and click `Load Temporary Add-on...`
1.  Navigate to the folder you extracted earlier, select `manifest.json` then click `Select File`.
1.  Open `about:config` search for `extensions.webextensions.keepStorageOnUninstall` and set to `true`.

If you need to test a restart, you must pack the addon. This only works in ESR, Development, or Nightly.
You may also use an Unbranded Build: [https://wiki.mozilla.org/Add-ons/Extension_Signing#Unbranded_Builds](https://wiki.mozilla.org/Add-ons/Extension_Signing#Unbranded_Builds)

1.  Run `npm run build:firefox` then use `web-ext-artifacts/{name}-firefox-{version}.zip`.
1.  Open `about:config` search for `xpinstall.signatures.required` and set to `false`.
1.  Open `about:addons` and drag the zip file to the page or choose Install from File from the Settings wheel.

# Contributing

Currently, the best way to contribute to this project is to give a 5-star rating on
[Google](https://chromewebstore.google.com/detail/smwc-web-extension/foalfafgmnglcgpgkhhmcfhjgmdcjide) or
[Mozilla](https://addons.mozilla.org/addon/smwc-web-extension) and to star this project on GitHub.

Other Web Extensions I have created and published:

- [Link Extractor](https://github.com/cssnr/link-extractor)
- [Open Links in New Tab](https://github.com/cssnr/open-links-in-new-tab)
- [HLS Video Downloader](https://github.com/cssnr/hls-video-downloader)
- [SMWC Web Extension](https://github.com/cssnr/smwc-web-extension)
- [PlayDrift Extension](https://github.com/cssnr/playdrift-extension)
- [ASN Plus](https://github.com/cssnr/asn-plus)
- [Aviation Tools](https://github.com/cssnr/aviation-tools)
- [Text Formatter](https://github.com/cssnr/text-formatter)

For a full list of current projects visit: [https://cssnr.github.io/](https://cssnr.github.io/)
