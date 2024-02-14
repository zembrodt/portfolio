import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { AboutComponent } from './about.component';
import {BehaviorSubject, of} from 'rxjs';
import {NgxsModule, Store} from '@ngxs/store';
import {VisibleService} from '../../services/visible.service';
import {MockProvider} from 'ng-mocks';
import {defineNgxsSelector} from '../../core/testing/ngxs-selector-mock';
import {ElementRef, Renderer2} from '@angular/core';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let visibleService: VisibleService;
  let store: Store;

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
        MockProvider(Renderer2),
        MockProvider(Store)
      ]
    }).compileComponents();
    visibleService = TestBed.inject(VisibleService);
    visibleService.isVisible = jasmine.createSpy().and.returnValue(of(false));
    store = TestBed.inject(Store);

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;

    isXsProducer = defineNgxsSelector<AboutComponent, boolean>(component, 'isXs$');

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
