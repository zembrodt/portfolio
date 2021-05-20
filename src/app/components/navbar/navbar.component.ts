import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {SettingsState} from '../../core/settings/settings.state';
import {Select, Store} from '@ngxs/store';
import {takeUntil} from 'rxjs/operators';
import {DARK_THEME, LIGHT_THEME} from '../../core/settings/settings.model';
import {ToggleTheme} from '../../core/settings/settings.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  private currentTheme: string;

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

  onPageChange(): void {
    const bodyRect = document.body.getBoundingClientRect();
    const pageRect = document.getElementById(this.page).getBoundingClientRect();
    const offset = pageRect.top - bodyRect.top;
    console.log('Offset is: ' + offset);

    window.scrollTo(0, offset);
    // document.getElementById(this.page).scrollIntoView();
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
}
