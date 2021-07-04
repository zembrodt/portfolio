import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {DEFAULT_SCREEN, ScreenModel} from './screen.model';
import {SetMobile} from './screen.actions';

@State<ScreenModel>({
  name: 'ZEMBRODT_PORTFOLIO_SCREEN',
  defaults: DEFAULT_SCREEN
})
@Injectable()
export class ScreenState {

  @Selector()
  static isMobile(state: ScreenModel): boolean {
    return state.isMobile;
  }

  @Action(SetMobile)
  setMobile(ctx: StateContext<ScreenModel>, action: SetMobile): void {
    ctx.patchState({isMobile: action.isMobile});
  }
}
