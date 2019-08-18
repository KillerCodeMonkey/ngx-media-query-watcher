import { NgModule } from '@angular/core'
import { MediaQueryWatcherDirective } from './media-query-watcher.directive'

@NgModule({
  declarations: [
    MediaQueryWatcherDirective
  ],
  exports: [
    MediaQueryWatcherDirective
  ]
})
export class MediaQueryWatcherModule {}
