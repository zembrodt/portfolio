import { Component } from '@angular/core';
import {SettingsState} from './core/settings/settings.state';
import {Observable} from 'rxjs';
import {Select} from '@ngxs/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Portfolio';

  @Select(SettingsState.theme) theme$: Observable<string>;
}
