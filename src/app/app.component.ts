import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {SettingsState} from './core/settings/settings.state';
import {Observable, Subject} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {filter, map, takeUntil} from 'rxjs/operators';
import {MediaObserver, ScreenTypes} from '@angular/flex-layout';
import {SetMobile} from './core/screen/screen.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  private prevMiddle: boolean = null;

  title = 'Portfolio';

  @Select(SettingsState.theme) theme$: Observable<string>;

  constructor(private store: Store, private mediaObserver: MediaObserver) {}

  ngOnInit(): void {
    this.theme$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((theme) => {
        const isLightTheme = theme === 'light-theme';
        const bodyEl = document.querySelector('body') as HTMLElement;
        const htmlEl = document.querySelector('html') as HTMLElement;
        bodyEl.classList.toggle('scrollbar-dark', !isLightTheme);
        htmlEl.classList.toggle('scrollbar-dark', !isLightTheme);
        bodyEl.classList.toggle('scrollbar-light', isLightTheme);
        htmlEl.classList.toggle('scrollbar-light', isLightTheme);
      });
    this.updateScrollbarStyle();

    // Angular flex-layout documentation is not up-to-date to reflect mediaObserver.media$ being deprecated
    // see https://github.com/angular/flex-layout/issues/1040#issuecomment-475069681 for updated solution
    this.mediaObserver.asObservable()
      .pipe(
        filter((changes) => changes.length > 0),
        map((changes) => changes[0]),
        takeUntil(this.ngUnsubscribe)
      ).subscribe((change) => {
        this.store.dispatch(new SetMobile(change.mqAlias === 'xs'));
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.updateScrollbarStyle();
  }

  private updateScrollbarStyle(): void {
    if (this.prevMiddle === null || this.prevMiddle) {
      if (window.scrollY === 0) {
        this.toggleScrollbarClasses(true, false);
        this.prevMiddle = false;
      }
      else if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        this.toggleScrollbarClasses(false, true);
        this.prevMiddle = false;
      }
    }
    else if (this.prevMiddle === null || !this.prevMiddle) {
      this.toggleScrollbarClasses(false, false);
      this.prevMiddle = true;
    }
  }

  private toggleScrollbarClasses(isTop, isBottom: boolean): void {
    const bodyEl = document.querySelector('body') as HTMLElement;
    bodyEl.classList.toggle('top-scroll', isTop);
    bodyEl.classList.toggle('bottom-scroll', isBottom);
  }
}
