[![@dafcoe/storage-monitor sample](https://github.com/dafcoe/storage-monitor/blob/main/demo/src/sample.gif?raw=true)](https://dafcoe.github.io/storage-monitor)

![npm bundle size](https://img.shields.io/bundlephobia/minzip/@dafcoe/storage-monitor?style=flat-square)
![npm](https://img.shields.io/npm/dt/@dafcoe/storage-monitor?style=flat-square)
![GitHub package.json version](https://img.shields.io/github/package-json/v/dafcoe/storage-monitor?style=flat-square)

# @dafcoe/storage-monitor
@dafcoe/storage-monitor is a simple monitor for local and session storage usage.
<br>
It adds a small widget to the bottom right corner of your page showing the overall usage of your local/session storage. When hovered, it expands up showing an item list sorted by size.
<br>
See it action on [demo](https://dafcoe.github.io/storage-monitor) page.


## Installation
Install the package as a project dependency using `yarn` or `npm`:
```
$ yarn add @dafcoe/storage-monitor
// or
$ npm install --save @dafcoe/storage-monitor
```

## Usage
Import `StorageMonitor` class and create an object:
```js
import StorageMonitor from '@dafcoe/storage-monitor';

new StorageMonitor();
```

## Options
`StorageMonitor` class accepts the following arguments:
#### Storage Adapter
Stands for the type of storage to monitor. It can either be `localStorage` (default) or `sessionStorage`.
```js
new StorageMonitor(localStorage);   // same as new StorageMonitor();
```
```js
new StorageMonitor(sessionStorage);
```
#### Options
An object of options where you can customize the widget visibility and the reload rate.
```js
new StorageMonitor(localStorage, {
  showWidget: true,
  autoReloadRateMs: 10000,  // in milisseconds | default: 5000 | minimum: 5000
});
```

<br>&nbsp;
Please check the [demo](https://dafcoe.github.io/storage-monitor) page to easily see it in action.

## License
[MIT License](https://opensource.org/licenses/MIT) © [Daf Coe](mailto:dafcoe@gmail.com)
