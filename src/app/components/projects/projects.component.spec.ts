import { ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import {VisibilityComponent} from '../visibility/visibility.component';
import {MockComponent} from 'ng-mocks';
import {ProjectDetailComponent} from '../project-detail/project-detail.component';
import {NgxsSelectorMock} from '../../core/testing/ngxs-selector-mock';
import {BehaviorSubject} from 'rxjs';

describe('ProjectsComponent', () => {
  const mockSelectors = new NgxsSelectorMock<ProjectsComponent>();
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let isLtMdProducer: BehaviorSubject<boolean>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProjectsComponent,
        MockComponent(ProjectDetailComponent),
        MockComponent(VisibilityComponent)
      ],
      imports: [
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;

    isLtMdProducer = mockSelectors.defineNgxsSelector<boolean>(component, 'isLtMd$')

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
