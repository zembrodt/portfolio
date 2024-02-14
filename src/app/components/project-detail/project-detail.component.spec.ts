import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { ProjectDetailComponent } from './project-detail.component';
import {defineNgxsSelector} from '../../core/testing/ngxs-selector-mock';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MarkdownModule} from 'ngx-markdown';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {Project} from '../projects/projects.component';
import {MockProvider} from 'ng-mocks';
import {Store} from '@ngxs/store';

describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;
  let store: Store;

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
      ],
      providers: [ MockProvider(Store) ]
    }).compileComponents();
    store = TestBed.inject(Store);
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

    isLtMdProducer = defineNgxsSelector<ProjectDetailComponent, boolean>(component, 'isLtMd$');

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
