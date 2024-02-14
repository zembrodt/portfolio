import {Action, NgxsOnInit, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ToggleTheme} from './settings.actions';
import {DEFAULT_SETTINGS, SETTINGS_STATE_NAME, SettingsModel, Theme} from './settings.model';
import {OverlayContainer} from '@angular/cdk/overlay';

@State<SettingsModel>({
  name: SETTINGS_STATE_NAME,
  defaults: DEFAULT_SETTINGS
})
@Injectable()
export class SettingsState implements NgxsOnInit {
  constructor(private overlayContainer: OverlayContainer) { }

  @Selector()
  static theme(state: SettingsModel): Theme {
    return state.theme;
  }

  ngxsOnInit(ctx: StateContext<SettingsModel>): void {
    this.updateOverlayContainer(ctx.getState().theme);
  }

  @Action(ToggleTheme)
  toggleTheme(ctx: StateContext<SettingsModel>, action: ToggleTheme): void {
    const nextTheme = ctx.getState().theme === Theme.Dark ? Theme.Light : Theme.Dark;
    this.updateOverlayContainer(nextTheme);
    ctx.patchState({theme: nextTheme});
  }

  /**
   * Updates the theme class on the overlayContainer
   * @param theme the standard theme (light/dark)
   * @private
   */
  private updateOverlayContainer(theme: string): void {
    const containerElement = this.overlayContainer.getContainerElement();
    if (containerElement) {
      const toRemove = Array.from(containerElement.classList).filter((item: string) =>
        item.includes('-theme')
      );
      if (toRemove.length > 0) {
        containerElement.classList.remove(...toRemove);
      }
      containerElement.classList.add(theme);
    }
  }
}
