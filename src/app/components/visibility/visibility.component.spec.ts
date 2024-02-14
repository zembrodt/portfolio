import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MockProvider} from 'ng-mocks';
import {VisibilityComponent} from './visibility.component';
import {VisibleService} from '../../services/visible.service';

describe('VisibilityComponent', () => {
  let component: VisibilityComponent;
  let fixture: ComponentFixture<VisibilityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VisibilityComponent ],
      providers: [MockProvider(VisibleService)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VisibilityComponent);
    component = fixture.componentInstance;
    component.name = 'TEST-NAME';

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
