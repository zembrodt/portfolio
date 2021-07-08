import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {DEFAULT_SCREEN, ScreenModel} from './screen.model';
import {SetLg, SetMd, SetSm, SetXl, SetXs} from './screen.actions';

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

  @Action(SetXs)
  setXs(ctx: StateContext<ScreenModel>, action: SetXs): void {
    ctx.patchState({isXs: action.isXs});
  }

  @Action(SetSm)
  setSm(ctx: StateContext<ScreenModel>, action: SetSm): void {
    ctx.patchState({isSm: action.isSm});
  }

  @Action(SetMd)
  setMd(ctx: StateContext<ScreenModel>, action: SetMd): void {
    ctx.patchState({isMd: action.isMd});
  }

  @Action(SetLg)
  setLg(ctx: StateContext<ScreenModel>, action: SetLg): void {
    ctx.patchState({isLg: action.isLg});
  }

  @Action(SetXl)
  setXl(ctx: StateContext<ScreenModel>, action: SetXl): void {
    ctx.patchState({isXl: action.isXl});
  }
}
