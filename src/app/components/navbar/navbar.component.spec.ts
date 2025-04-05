import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {NavbarComponent} from './navbar.component';
import {NgxsModule, Store} from '@ngxs/store';
import {MockProvider} from 'ng-mocks';
import {Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {BehaviorSubject, of} from 'rxjs';
import {defineNgxsSelector} from '../../core/testing/ngxs-selector-mock';
import {Theme} from '../../core/settings/settings.model';
import {ToggleTheme} from '../../core/settings/settings.actions';
import {DOCUMENT} from '@angular/common';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;
  let store: Store;
  let document: Document;

  let isLtMdProducer: BehaviorSubject<boolean>;
  let themeProducer: BehaviorSubject<string>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        NgxsModule.forRoot([], { developmentMode: true })
      ],
      providers: [
        MockProvider(Router),
        MockProvider(Store)
      ]
    }).compileComponents();
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    document = TestBed.inject(DOCUMENT);

    isLtMdProducer = defineNgxsSelector<NavbarComponent, boolean>(component, 'isLtMd$');
    themeProducer =  defineNgxsSelector<NavbarComponent, string>(component, 'theme$');

    spyOn(console, 'error');
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the error theme icon when current theme is null', () => {
    expect(component.getThemeIcon()).toEqual('error_outline');
    expect(console.error).toHaveBeenCalled();
  });

  it('should get the dark mode theme icon when theme is dark', () => {
    themeProducer.next(Theme.Dark);
    expect(component.getThemeIcon()).toEqual('dark_mode');
  });

  it('should get the light mode theme icon when theme is light', () => {
    themeProducer.next(Theme.Light);
    expect(component.getThemeIcon()).toEqual('light_mode');
  });

  it('should toggle the theme on theme change', () => {
    component.onThemeChange();
    expect(store.dispatch).toHaveBeenCalledWith(new ToggleTheme());
  });

  it('should get the error theme icon when current theme is an invalid value', () => {
    themeProducer.next('invalid-theme');
    expect(component.getThemeIcon()).toEqual('error_outline');
    expect(console.error).toHaveBeenCalled();
  });
});
