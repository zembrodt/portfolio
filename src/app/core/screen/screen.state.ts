import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ALIAS_LG, ALIAS_MD, ALIAS_SM, ALIAS_XL, ALIAS_XS, DEFAULT_SCREEN, ScreenModel} from './screen.model';
import {SetAlias} from './screen.actions';

@State<ScreenModel>({
  name: 'ZEMBRODT_PORTFOLIO_SCREEN',
  defaults: DEFAULT_SCREEN
})
@Injectable()
export class ScreenState {

  @Selector()
  static isXs(state: ScreenModel): boolean {
    return state.isXs;
  }

  @Selector()
  static isSm(state: ScreenModel): boolean {
    return state.isSm;
  }

  @Selector()
  static isLtMd(state: ScreenModel): boolean {
    return state.isXs || state.isSm;
  }

  @Selector()
  static isMd(state: ScreenModel): boolean {
    return state.isMd;
  }

  @Selector()
  static isLtLG(state: ScreenModel): boolean {
    return state.isXs || state.isSm || state.isMd;
  }

  @Selector()
  static isLg(state: ScreenModel): boolean {
    return state.isLg;
  }

  @Selector()
  static isLtXl(state: ScreenModel): boolean {
    return state.isXs || state.isSm || state.isMd || state.isLg;
  }

  @Selector()
  static isXl(state: ScreenModel): boolean {
    return state.isXl;
  }

  @Action(SetAlias)
  setAlias(ctx: StateContext<ScreenModel>, action: SetAlias): void {
    ctx.patchState({
      isXs: action.alias === ALIAS_XS,
      isSm: action.alias === ALIAS_SM,
      isMd: action.alias === ALIAS_MD,
      isLg: action.alias === ALIAS_LG,
      isXl: action.alias === ALIAS_XL
    });
  }
}
