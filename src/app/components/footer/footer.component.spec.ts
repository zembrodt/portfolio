import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {defineNgxsSelector} from '../../core/testing/ngxs-selector-mock';
import {BehaviorSubject} from 'rxjs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MockProvider} from 'ng-mocks';
import {Store} from '@ngxs/store';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let store: Store;

  let isXsProducer: BehaviorSubject<boolean>;
  let themeProducer: BehaviorSubject<string>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      imports: [
        FontAwesomeModule,
        MatIconModule,
        MatToolbarModule
      ],
      providers: [ MockProvider(Store) ]
    }).compileComponents();
    store = TestBed.inject(Store);

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;

    isXsProducer = defineNgxsSelector<FooterComponent, boolean>(component, 'isXs$');
    themeProducer = defineNgxsSelector<FooterComponent, string>(component, 'theme$');

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
