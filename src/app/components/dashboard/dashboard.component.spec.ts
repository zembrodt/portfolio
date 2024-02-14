import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import {BehaviorSubject} from 'rxjs';
import {defineNgxsSelector} from '../../core/testing/ngxs-selector-mock';
import {MockComponent, MockProvider} from 'ng-mocks';
import {VisibilityComponent} from '../visibility/visibility.component';
import {ExperienceComponent} from '../experience/experience.component';
import {ProjectsComponent} from '../projects/projects.component';
import {AboutComponent} from '../about/about.component';
import {ContactComponent} from '../contact/contact.component';
import {Store} from '@ngxs/store';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: Store;

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
      ],
      providers: [ MockProvider(Store) ]
    }).compileComponents();
    store = TestBed.inject(Store);

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    isLtMdProducer = defineNgxsSelector<DashboardComponent, boolean>(component, 'isLtMd$');

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
