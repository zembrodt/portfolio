import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {SettingsState} from './core/settings/settings.state';
import {Observable, Subject} from 'rxjs';
import {Select} from '@ngxs/store';
import {takeUntil} from 'rxjs/operators';

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

  constructor() {}

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
