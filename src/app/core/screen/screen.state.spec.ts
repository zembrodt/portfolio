import {TestBed, waitForAsync} from '@angular/core/testing';
import {NgxsModule, Store} from '@ngxs/store';
import {ScreenState} from './screen.state';
import {SetAlias} from './screen.actions';
import {ALIAS_LG, ALIAS_MD, ALIAS_SM, ALIAS_XL, ALIAS_XS} from './screen.model';

describe('ScreenState', () => {
  let store: Store;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([ScreenState], {developmentMode: true})
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    store.reset({
      ...store.snapshot(),
      ZEMBRODT_PORTFOLIO_SCREEN: {
        isXs: false,
        isSm: false,
        isMd: false,
        isLg: false,
        isXl: false
      }
    });
  }));

  it('should select isXs', () => {
    setState(store, {
      isXs: true
    });
    expect(selectIsXs(store)).toBeTrue();
  });

  it('should select isSm', () => {
    setState(store, {
      isSm: true
    });
    expect(selectIsSm(store)).toBeTrue();
  });

  it('should select isLtMd', () => {
    setState(store, {
      isXs: true,
      isSm: false
    });
    expect(selectIsLtMd(store)).toBeTrue();
    setState(store, {
      isXs: false,
      isSm: true
    });
    expect(selectIsLtMd(store)).toBeTrue();
  });

  it('should select isMd', () => {
    setState(store, {
      isMd: true
    });
    expect(selectIsMd(store)).toBeTrue();
  });

  it('should select isLtLg', () => {
    setState(store, {
      isXs: true,
      isSm: false,
      isMd: false
    });
    expect(selectIsLtLg(store)).toBeTrue();
    setState(store, {
      isXs: false,
      isSm: true,
      isMd: false
    });
    expect(selectIsLtLg(store)).toBeTrue();
    setState(store, {
      isXs: false,
      isSm: false,
      isMd: true
    });
    expect(selectIsLtLg(store)).toBeTrue();
  });

  it('should select isLg', () => {
    setState(store, {
      isLg: true
    });
    expect(selectIsLg(store)).toBeTrue();
  });

  it('should select isLtXl', () => {
    setState(store, {
      isXs: true,
      isSm: false,
      isMd: false,
      isLg: false
    });
    expect(selectIsLtXl(store)).toBeTrue();
    setState(store, {
      isXs: false,
      isSm: true,
      isMd: false,
      isLg: false
    });
    expect(selectIsLtXl(store)).toBeTrue();
    setState(store, {
      isXs: false,
      isSm: false,
      isMd: true,
      isLg: false
    });
    expect(selectIsLtXl(store)).toBeTrue();
    setState(store, {
      isXs: false,
      isSm: false,
      isMd: false,
      isLg: true
    });
    expect(selectIsLtXl(store)).toBeTrue();
  });

  it('should select isXl', () => {
    setState(store, {
      isXl: true
    });
    expect(selectIsXl(store)).toBeTrue();
  });

  it(`should select the correct value when alias is 'xs'`, () => {
    store.dispatch(new SetAlias(ALIAS_XS));
    expect(selectIsXs(store)).toBeTrue();
    expect(selectIsSm(store)).toBeFalse();
    expect(selectIsLtMd(store)).toBeTrue();
    expect(selectIsMd(store)).toBeFalse();
    expect(selectIsLtLg(store)).toBeTrue();
    expect(selectIsLg(store)).toBeFalse();
    expect(selectIsLtXl(store)).toBeTrue();
    expect(selectIsXl(store)).toBeFalse();
  });

  it(`should select the correct value when alias is 'sm'`, () => {
    store.dispatch(new SetAlias(ALIAS_SM));
    expect(selectIsXs(store)).toBeFalse();
    expect(selectIsSm(store)).toBeTrue();
    expect(selectIsLtMd(store)).toBeTrue();
    expect(selectIsMd(store)).toBeFalse();
    expect(selectIsLtLg(store)).toBeTrue();
    expect(selectIsLg(store)).toBeFalse();
    expect(selectIsLtXl(store)).toBeTrue();
    expect(selectIsXl(store)).toBeFalse();
  });

  it(`should select the correct value when alias is 'md'`, () => {
    store.dispatch(new SetAlias(ALIAS_MD));
    expect(selectIsXs(store)).toBeFalse();
    expect(selectIsSm(store)).toBeFalse();
    expect(selectIsLtMd(store)).toBeFalse();
    expect(selectIsMd(store)).toBeTrue();
    expect(selectIsLtLg(store)).toBeTrue();
    expect(selectIsLg(store)).toBeFalse();
    expect(selectIsLtXl(store)).toBeTrue();
    expect(selectIsXl(store)).toBeFalse();
  });

  it(`should select the correct value when alias is 'lg'`, () => {
    store.dispatch(new SetAlias(ALIAS_LG));
    expect(selectIsXs(store)).toBeFalse();
    expect(selectIsSm(store)).toBeFalse();
    expect(selectIsLtMd(store)).toBeFalse();
    expect(selectIsMd(store)).toBeFalse();
    expect(selectIsLtLg(store)).toBeFalse();
    expect(selectIsLg(store)).toBeTrue();
    expect(selectIsLtXl(store)).toBeTrue();
    expect(selectIsXl(store)).toBeFalse();
  });

  it(`should select the correct value when alias is 'xl'`, () => {
    store.dispatch(new SetAlias(ALIAS_XL));
    expect(selectIsXs(store)).toBeFalse();
    expect(selectIsSm(store)).toBeFalse();
    expect(selectIsLtMd(store)).toBeFalse();
    expect(selectIsMd(store)).toBeFalse();
    expect(selectIsLtLg(store)).toBeFalse();
    expect(selectIsLg(store)).toBeFalse();
    expect(selectIsLtXl(store)).toBeFalse();
    expect(selectIsXl(store)).toBeTrue();
  });
});

function selectIsXs(store: Store): boolean {
  return store.selectSnapshot(state => ScreenState.isXs(state.ZEMBRODT_PORTFOLIO_SCREEN));
}

function selectIsSm(store: Store): boolean {
  return store.selectSnapshot(state => ScreenState.isSm(state.ZEMBRODT_PORTFOLIO_SCREEN));
}

function selectIsLtMd(store: Store): boolean {
  return store.selectSnapshot(state => ScreenState.isLtMd(state.ZEMBRODT_PORTFOLIO_SCREEN));
}

function selectIsMd(store: Store): boolean {
  return store.selectSnapshot(state => ScreenState.isMd(state.ZEMBRODT_PORTFOLIO_SCREEN));
}

function selectIsLtLg(store: Store): boolean {
  return store.selectSnapshot(state => ScreenState.isLtLG(state.ZEMBRODT_PORTFOLIO_SCREEN));
}

function selectIsLg(store: Store): boolean {
  return store.selectSnapshot(state => ScreenState.isLg(state.ZEMBRODT_PORTFOLIO_SCREEN));
}

function selectIsLtXl(store: Store): boolean {
  return store.selectSnapshot(state => ScreenState.isLtXl(state.ZEMBRODT_PORTFOLIO_SCREEN));
}

function selectIsXl(store: Store): boolean {
  return store.selectSnapshot(state => ScreenState.isXl(state.ZEMBRODT_PORTFOLIO_SCREEN));
}

function setState(store: Store, state: any): void {
  store.reset({
    ...store.snapshot(),
    ZEMBRODT_PORTFOLIO_SCREEN: state
  });
}
