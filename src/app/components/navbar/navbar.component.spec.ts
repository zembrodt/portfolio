import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {NgxsModule, Store} from '@ngxs/store';
import {MockProvider} from 'ng-mocks';
import {Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {BehaviorSubject} from 'rxjs';
import {NgxsSelectorMock} from '../../core/testing/ngxs-selector-mock';

describe('NavbarComponent', () => {
  const mockSelectors = new NgxsSelectorMock<NavbarComponent>();
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;
  let store: Store;

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

    isLtMdProducer = mockSelectors.defineNgxsSelector<boolean>(component, 'isLtMd$');
    themeProducer = mockSelectors.defineNgxsSelector<string>(component, 'theme$');

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
