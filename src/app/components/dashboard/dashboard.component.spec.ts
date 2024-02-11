import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import {BehaviorSubject} from 'rxjs';
import {NgxsSelectorMock} from '../../core/testing/ngxs-selector-mock';
import {MockComponent} from 'ng-mocks';
import {VisibilityComponent} from '../visibility/visibility.component';
import {ExperienceComponent} from '../experience/experience.component';
import {ProjectsComponent} from '../projects/projects.component';
import {AboutComponent} from '../about/about.component';
import {ContactComponent} from '../contact/contact.component';

describe('DashboardComponent', () => {
  const mockSelectors = new NgxsSelectorMock<DashboardComponent>();
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let isLtMdProducer: BehaviorSubject<boolean>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        MockComponent(AboutComponent),
        MockComponent(ContactComponent),
        MockComponent(ExperienceComponent),
        MockComponent(ProjectsComponent),
        MockComponent(VisibilityComponent)
      ]
    }).compileComponents();


    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    isLtMdProducer = mockSelectors.defineNgxsSelector<boolean>(component, 'isLtMd$');

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
