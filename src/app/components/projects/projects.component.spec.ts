import { ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import {VisibilityComponent} from '../visibility/visibility.component';
import {MockComponent, MockProvider} from 'ng-mocks';
import {ProjectDetailComponent} from '../project-detail/project-detail.component';
import {defineNgxsSelector} from '../../core/testing/ngxs-selector-mock';
import {BehaviorSubject} from 'rxjs';
import {Store} from '@ngxs/store';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let store: Store;

  let isLtMdProducer: BehaviorSubject<boolean>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProjectsComponent,
        MockComponent(ProjectDetailComponent),
        MockComponent(VisibilityComponent)
      ],
      providers: [ MockProvider(Store) ]
    }).compileComponents();
    store = TestBed.inject(Store);

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;

    isLtMdProducer = defineNgxsSelector<ProjectsComponent, boolean>(component, 'isLtMd$')

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
