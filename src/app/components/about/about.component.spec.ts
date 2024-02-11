import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { AboutComponent } from './about.component';
import {BehaviorSubject, of} from 'rxjs';
import {NgxsModule} from '@ngxs/store';
import {VisibleService} from '../../services/visible.service';
import {MockProvider} from 'ng-mocks';
import {NgxsSelectorMock} from '../../core/testing/ngxs-selector-mock';
import {ElementRef, Renderer2} from '@angular/core';

describe('AboutComponent', () => {
  const mockSelectors = new NgxsSelectorMock<AboutComponent>();
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  let visibleService: VisibleService;
  let isXsProducer: BehaviorSubject<boolean>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutComponent ],
      imports: [
        NgxsModule.forRoot([], { developmentMode: true })
      ],
      providers: [
        MockProvider(VisibleService),
        MockProvider(ElementRef),
        MockProvider(Renderer2)
      ]
    }).compileComponents();
    visibleService = TestBed.inject(VisibleService);
    visibleService.isVisible = jasmine.createSpy().and.returnValue(of(false));

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;

    isXsProducer = mockSelectors.defineNgxsSelector<boolean>(component, 'isXs$');

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
