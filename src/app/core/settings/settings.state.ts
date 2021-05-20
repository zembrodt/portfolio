import {Action, NgxsOnInit, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ToggleTheme} from './settings.actions';
import {DARK_THEME, DEFAULT_SETTINGS, LIGHT_THEME, SettingsModel} from './settings.model';
import {OverlayContainer} from '@angular/cdk/overlay';

@State<SettingsModel>({
  name: 'ZEMBRODT_PORTFOLIO_SETTINGS',
  defaults: DEFAULT_SETTINGS
})
@Injectable()
export class SettingsState implements NgxsOnInit {
  constructor(private overlayContainer: OverlayContainer) { }

  @Selector()
  static theme(state: SettingsModel): string {
    return state.theme;
  }

  ngxsOnInit(ctx: StateContext<SettingsModel>): void {
    this.updateOverlayContainer(ctx.getState().theme);
  }

  @Action(ToggleTheme)
  toggleTheme(ctx: StateContext<SettingsModel>, action: ToggleTheme): void {
    const nextTheme = ctx.getState().theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    this.updateOverlayContainer(nextTheme);
    ctx.patchState({theme: nextTheme});
  }

  private updateOverlayContainer(theme: string): void {
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    if (toRemove.length > 0) {
      classList.remove(...toRemove);
    }
    classList.add(theme);
  }
}
