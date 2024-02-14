import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {defineNgxsSelector} from '../../core/testing/ngxs-selector-mock';
import {BehaviorSubject} from 'rxjs';
import {MockComponent, MockProvider} from 'ng-mocks';
import {Store} from '@ngxs/store';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule} from '@angular/router';
import {FooterComponent} from '../footer/footer.component';
import {NavbarComponent} from '../navbar/navbar.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store;

  let themeProducer: BehaviorSubject<string>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent(FooterComponent),
        MockComponent(NavbarComponent)
      ],
      imports: [
        MatSidenavModule,
        RouterModule
      ],
      providers: [ MockProvider(Store) ]
    }).compileComponents();
    store = TestBed.inject(Store);

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;

    themeProducer = defineNgxsSelector<AppComponent, string>(app, 'theme$');

    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});
