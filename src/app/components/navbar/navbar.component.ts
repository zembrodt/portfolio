import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {SettingsState} from '../../core/settings/settings.state';
import {Select, Store} from '@ngxs/store';
import {takeUntil} from 'rxjs/operators';
import {DARK_THEME, LIGHT_THEME} from '../../core/settings/settings.model';
import {ToggleTheme} from '../../core/settings/settings.actions';

const NAVBAR_ANIMATE_DURATION = 1000;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  private currentTheme: string;
  private previousOffsetY = 0;

  @Select(SettingsState.theme) theme$: Observable<string>;
  page: string;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.theme$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((theme) => this.currentTheme = theme);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onThemeChange(): void {
    this.store.dispatch(new ToggleTheme());
  }

  getThemeIcon(): string {
    switch (this.currentTheme) {
      case DARK_THEME:
        return 'dark_mode';
      case LIGHT_THEME:
        return 'light_mode';
      default:
        console.error('Invalid theme value: ' + this.currentTheme);
        return 'error_outline';
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const element = document.querySelector('#navbar') as HTMLElement;
    if (this.previousOffsetY > window.pageYOffset) {
      // Scrolling up
      element.animate({
        top: '0px'
      }, {
        duration: NAVBAR_ANIMATE_DURATION,
        fill: 'forwards'
      });
    } else {
      // Scrolling down
      element.animate({
        top: String(-element.clientHeight) + 'px'
      }, {
        duration: NAVBAR_ANIMATE_DURATION,
        fill: 'forwards'
      });
    }
    this.previousOffsetY = window.pageYOffset;
  }
}
