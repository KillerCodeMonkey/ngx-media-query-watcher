# ngx-media-query-watcher [![Build Status](https://github.com/KillerCodeMonkey/ngx-media-query-watcher/workflows/CI/badge.svg)](https://github.com/KillerCodeMonkey/ngx-media-query-watcher/actions?query=branch%3Amaster)

An angular directive to easy listen and handle on media query changes.

## Donate/Support

If you like my work, feel free to support it. Donations to the project are always welcomed :)

<a href="https://www.buymeacoffee.com/bengtler" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

PayPal: [PayPal.Me/bengtler](http://paypal.me/bengtler)

BTC Wallet Address:
`3QVyr2tpRLBCw1kBQ59sTDraV6DTswq8Li`

ETH Wallet Address:
`0x394d44f3b6e3a4f7b4d44991e7654b0cab4af68f`

LTC Wallet Address:
`MFif769WSZ1g7ReAzzDE7TJVqtkFpmoTyT`

XRP Wallet Address:
`rXieaAC3nevTKgVu2SYoShjTCS2Tfczqx?dt=159046833`

## Installation

- `npm install ngx-media-query-watcher`
- install `@angular/core`, `@angular/platform-browser` and `rxjs` - they are peer dependencies

### For standard webpack, angular-cli and tsc builds

- import `MediaQueryWatcherModule` from `ngx-media-query-watcher`:

```TS
import { MediaQueryWatcherModule } from 'ngx-media-query-watcher'
```

- add `MediaQueryWatcherModule` to the imports of your NgModule:

```
@NgModule({
  imports: [
    ...,

    MediaQueryWatcherModule
  ],
  ...
})
class YourModule { ... }
```
- use `<div media-query-watcher query="(min-width: 992px)" (mediaMatchChanged)="handleChange($event)"></div>` in your templates to listen on a media query and handle a media query change.

### For SystemJS builds (Config)

- add ngx-media-query-watcher to your `paths`:
```
paths: {
  ...
  'ngx-media-query-watcher': 'node_modules/ngx-media-query-watcher/bundles/ngx-media-query-watcher.umd.js'
}
```
- set format and dependencies in `packages`:
```
packages: {
  'ngx-media-query-watcher': {
    format: 'cjs'
  }
}
```
- follow the steps of **For standard webpack and tsc builds**

## MediaQueryWatcher Directive

### Usage

- selector: `media-query-watcher` - add it as attribute to a html-tag
- property/input: `query` - pass a css media query here
- output: `mediaMatchChanged` - get notified when a media query is matching or not

### Example

```HTML
<div
  media-query-watcher
  query="(min-width: 992px)"
  (mediaMatchChanged)="handleChange($event)"
>
  <p>hello</p>
</div>
```

```TS
class MyComponent {
  handleChange(match: boolean) {
    // handle match
  }
}
```
