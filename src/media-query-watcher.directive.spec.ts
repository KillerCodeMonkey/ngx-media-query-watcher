import { Component, ViewChild } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MediaQueryWatcherDirective } from './media-query-watcher.directive'

@Component({
  template: '<div media-query-watcher query="(min-width: 992px)" (mediaMatchChanged)="handleChange($event)"></div>'
})
class TestComponent {
  @ViewChild(MediaQueryWatcherDirective, {
    static: true
  }) mediaQueryWatcher: MediaQueryWatcherDirective | null = null
  handleChange(_match: boolean) { return true }
}

describe('MediaQueryWatcherDirective', () => {
  let component: TestComponent
  let fixture: ComponentFixture<TestComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, MediaQueryWatcherDirective]
    })
    fixture = TestBed.createComponent(TestComponent)
    component = fixture.componentInstance
  })

  describe('#ngOnDestoy', () => {
    it('removes listener', () => {
      fixture.detectChanges()
      spyOn(component.mediaQueryWatcher!.mq!, 'removeListener')

      component.mediaQueryWatcher!.ngOnDestroy()
      fixture.detectChanges()

      expect(component.mediaQueryWatcher!.mq!.removeListener).toHaveBeenCalled()
    })

    it('does nothing when no mq', () => {
      fixture.detectChanges()
      component.mediaQueryWatcher!.mq = null

      component.mediaQueryWatcher!.ngOnDestroy()
      fixture.detectChanges()
    })
  })

  describe('#ngAfterViewInit', () => {
    it('calls checkMediaQuery', () => {
      spyOn(component.mediaQueryWatcher!, 'checkMediaQuery')

      component.mediaQueryWatcher!.ngAfterViewInit()
      fixture.detectChanges()

      expect(component.mediaQueryWatcher!.checkMediaQuery).toHaveBeenCalled()
    })

    it('does nothing when no mq', () => {
      component.mediaQueryWatcher!.mq = null
      spyOn(component.mediaQueryWatcher!, 'checkMediaQuery')

      component.mediaQueryWatcher!.ngAfterViewInit()
      fixture.detectChanges()

      expect(component.mediaQueryWatcher!.checkMediaQuery).toHaveBeenCalled()
    })
  })

  describe('#ngOnInit', () => {
    it('set correct media query for check', () => {
      spyOn(component, 'handleChange')
      fixture.detectChanges()

      expect(component.mediaQueryWatcher!.mq).toBeDefined()
      expect(component.mediaQueryWatcher!.mq!.media).toEqual('(min-width: 992px)')
      expect(component.handleChange).toHaveBeenCalled()
    })

    it('does nothing if mediaMatch not supported', () => {
      component.mediaQueryWatcher!.canMatchMedia = false
      spyOn(window, 'matchMedia')

      component.mediaQueryWatcher!.ngOnInit()

      expect(window.matchMedia).not.toHaveBeenCalled()
    })
  })

  describe('#ngOnChanges', () => {
    it('update media query when query changes', () => {
      fixture.detectChanges()
      spyOn(component.mediaQueryWatcher!, 'checkMediaQuery')

      component.mediaQueryWatcher!.ngOnChanges({
        query: {
          currentValue: '(max-width: 772px)',
          firstChange: false,
          isFirstChange: () => false,
          previousValue: ''
        }
      })

      expect(component.mediaQueryWatcher!.mq).toBeDefined()
      expect(component.mediaQueryWatcher!.mq!.media).toEqual('(max-width: 772px)')
      expect(component.mediaQueryWatcher!.checkMediaQuery).toHaveBeenCalled()
    })

    it('does nothing if first change', () => {
      component.mediaQueryWatcher!.ngOnChanges({
        query: {
          currentValue: '(max-width: 772px)',
          firstChange: true,
          isFirstChange: () => true,
          previousValue: ''
        }
      })

      expect(component.mediaQueryWatcher!.mq).toBe(null)
    })

    it('does nothing if not first change, but old mq not set', () => {
      fixture.detectChanges()
      component.mediaQueryWatcher!.mq = null

      component.mediaQueryWatcher!.ngOnChanges({
        query: {
          currentValue: '(max-width: 772px)',
          firstChange: false,
          isFirstChange: () => false,
          previousValue: ''
        }
      })

      expect(component.mediaQueryWatcher!.mq).toBe(null)
    })
  })

  describe('#checkMediaQuery', () => {
    it('emits output if matched or not', () => {
      spyOn(component.mediaQueryWatcher!.mediaMatchChanged, 'emit')

      component.mediaQueryWatcher!.checkMediaQuery({
        matches: true
      } as MediaQueryList)

      expect(component.mediaQueryWatcher!.mediaMatchChanged.emit).toHaveBeenCalledWith(true)
    })
  })
})
