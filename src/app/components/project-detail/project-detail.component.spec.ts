import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { ProjectDetailComponent } from './project-detail.component';
import {NgxsSelectorMock} from '../../core/testing/ngxs-selector-mock';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MarkdownModule} from 'ngx-markdown';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {Project} from '../projects/projects.component';

describe('ProjectDetailComponent', () => {
  const mockSelectors = new NgxsSelectorMock<ProjectDetailComponent>();
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;
  let isLtMdProducer: BehaviorSubject<boolean>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDetailComponent ],
      imports: [
        FontAwesomeModule,
        HttpClientModule,
        MarkdownModule.forRoot({ loader: HttpClient }),
        MatCardModule,
        MatIconModule
      ]
    }).compileComponents();
    const testProject: Project = {
      title: 'test-title',
      id: 'test-id',
      projectUrl: 'test-project-url',
      githubUrl: 'test-github-url',
      docsUrl: 'test-docs-url',
      screenshotUrl: 'test-screenshot-url',
      technologies: ['test-tech-1', 'test-tech-2', 'test-tech-3']
    };

    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
    component.project = testProject;

    isLtMdProducer = mockSelectors.defineNgxsSelector<boolean>(component, 'isLtMd$');

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
