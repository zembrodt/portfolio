import {Component, OnDestroy, OnInit} from '@angular/core';
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
  title = 'Portfolio';

  @Select(SettingsState.theme) theme$: Observable<string>;

  constructor() {}

  ngOnInit(): void {
    this.theme$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((theme) => {
        const bodyEl = document.querySelector('body') as HTMLElement;
        const htmlEl = document.querySelector('html') as HTMLElement;
        if (theme === 'light-theme') {
          bodyEl.classList.remove('scrollbar-dark');
          htmlEl.classList.remove('scrollbar-dark');
          bodyEl.classList.add('scrollbar-light');
          htmlEl.classList.add('scrollbar-light');
        } else {
          bodyEl.classList.remove('scrollbar-light');
          htmlEl.classList.remove('scrollbar-light');
          bodyEl.classList.add('scrollbar-dark');
          htmlEl.classList.add('scrollbar-dark');
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
