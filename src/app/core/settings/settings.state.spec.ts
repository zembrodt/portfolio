import {TestBed} from '@angular/core/testing';
import {NgxsModule, Store} from '@ngxs/store';
import {Theme} from './settings.model';
import {SettingsState} from './settings.state';
import {ToggleTheme} from './settings.actions';
import {MockProvider} from 'ng-mocks';
import {OverlayContainer} from '@angular/cdk/overlay';

describe('SettingsState', () => {
  let store: Store;
  let overlay: OverlayContainer;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([SettingsState], {developmentMode: true})
      ],
      providers: [ MockProvider(OverlayContainer) ]
    }).compileComponents();
    store = TestBed.inject(Store);
    store.reset({
      ...store.snapshot(),
      ZEMBRODT_PORTFOLIO_SETTINGS: {
        theme: Theme.Dark
      }
    });
    overlay = TestBed.inject(OverlayContainer);
    element = document.createElement('test');
    overlay.getContainerElement = jasmine.createSpy().and.returnValue(element);
  });

  it('should select theme', () => {
    expect(selectTheme(store)).toEqual(Theme.Dark);
  });

  it('should toggle the theme', () => {
    expect(selectTheme(store)).toEqual(Theme.Dark);
    store.dispatch(new ToggleTheme());
    expect(selectTheme(store)).toEqual(Theme.Light);
  });

  it('should add the new theme to the overlayContainer', () => {
    store.dispatch(new ToggleTheme());
    expect(element.classList.length).toEqual(1);
    expect(element.classList.contains(Theme.Light)).toBeTrue();
  });

  it('should remove existing theme and add new theme to overlayContainer', () => {
    element.classList.add(Theme.Dark);
    store.dispatch(new ToggleTheme());
    expect(element.classList.length).toEqual(1);
    expect(element.classList.contains(Theme.Light)).toBeTrue();

    store.dispatch(new ToggleTheme());
    expect(element.classList.length).toEqual(1);
    expect(element.classList.contains(Theme.Dark)).toBeTrue();
  });
});

function selectTheme(store: Store): Theme {
  return store.selectSnapshot(state => SettingsState.theme(state.ZEMBRODT_PORTFOLIO_SETTINGS));
}

function setState(store: Store, state: any): void {
  store.reset({
    ...store.snapshot(),
    ZEMBRODT_PORTFOLIO_SETTINGS: state
  });
}
