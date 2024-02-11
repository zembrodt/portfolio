import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {SettingsState} from '../../core/settings/settings.state';
import {Observable, Subject} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {takeUntil} from 'rxjs/operators';
import {SetAlias} from '../../core/screen/screen.actions';
import {
  ALIAS_LG,
  ALIAS_MD,
  ALIAS_SM,
  ALIAS_XL,
  ALIAS_XS,
  SCREEN_SIZE_LG,
  SCREEN_SIZE_MD,
  SCREEN_SIZE_SM,
  SCREEN_SIZE_XS
} from '../../core/screen/screen.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  private prevMiddle: boolean = null;
  private currentScreenSize: string = null;

  @Select(SettingsState.theme) theme$!: Observable<string>;

  constructor(private store: Store) {}

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
    this.updateScreenSize(window.innerWidth);
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

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateScreenSize(window.innerWidth);
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

  private updateScreenSize(width: number): void {
    const alias = this.calculateScreenSizeAlias(width);
    if (this.currentScreenSize !== alias) {
      this.currentScreenSize = alias;
      this.store.dispatch(new SetAlias(alias));
    }
  }

  private calculateScreenSizeAlias(width: number): string {
    if (width < SCREEN_SIZE_XS) {
      return ALIAS_XS;
    } else if (width < SCREEN_SIZE_SM) {
      return ALIAS_SM;
    } else if (width < SCREEN_SIZE_MD) {
      return ALIAS_MD;
    } else if (width < SCREEN_SIZE_LG) {
      return ALIAS_LG;
    } else {
      return ALIAS_XL;
    }
  }
}
