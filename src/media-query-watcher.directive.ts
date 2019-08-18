import {
  AfterViewInit,
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core'

@Directive({
  selector: '[media-query-watcher]'
})
export class MediaQueryWatcherDirective implements AfterViewInit, OnInit, OnDestroy {
  @Input() query: string | null = null
  @Output() mediaMatchChanged = new EventEmitter<boolean>()
  mq: MediaQueryList | null = null
  canMatchMedia = !!window.matchMedia

  ngOnDestroy() {
    if (this.mq) {
      // Remove event listener on destroy
      this.mq.removeListener(this.checkMediaQuery.bind(this))
    }
  }

  // Init onInit
  ngOnInit() {
    if (this.canMatchMedia && this.query) {
      this.mq = window.matchMedia(this.query)
      // Listen on changes
      this.mq.addListener(this.checkMediaQuery.bind(this))
    }
  }

  // Initial media query check after child components are init
  ngAfterViewInit() {
    if (this.mq) {
      // Inital check if mediaQuery is matching
      this.checkMediaQuery(this.mq)
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.query.isFirstChange() && this.mq) {
      this.mq.removeListener(this.checkMediaQuery.bind(this))
      this.mq = window.matchMedia(changes.query.currentValue)
      this.mq.addListener(this.checkMediaQuery.bind(this))
      this.checkMediaQuery(this.mq)
    }
  }

  checkMediaQuery(media: MediaQueryListEvent | MediaQueryList): any {
    this.mediaMatchChanged.emit(media.matches)
  }
}
