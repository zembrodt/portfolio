import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgxsSelectorMock} from '../../core/testing/ngxs-selector-mock';
import {BehaviorSubject} from 'rxjs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

describe('FooterComponent', () => {
  const mockSelectors = new NgxsSelectorMock<FooterComponent>();
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let isXsProducer: BehaviorSubject<boolean>;
  let themeProducer: BehaviorSubject<string>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      imports: [
        FontAwesomeModule,
        MatIconModule,
        MatToolbarModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;

    isXsProducer = mockSelectors.defineNgxsSelector<boolean>(component, 'isXs$');
    themeProducer = mockSelectors.defineNgxsSelector<string>(component, 'theme$');

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
