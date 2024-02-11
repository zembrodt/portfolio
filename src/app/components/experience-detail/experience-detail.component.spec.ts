import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { ExperienceDetailComponent } from './experience-detail.component';
import {NgxsSelectorMock} from '../../core/testing/ngxs-selector-mock';
import {BehaviorSubject} from 'rxjs';
import {MatCardModule} from '@angular/material/card';
import {Experience} from '../experience/experience.component';
import {MarkdownModule} from 'ngx-markdown';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('ExperienceDetailComponent', () => {
  const mockSelectors = new NgxsSelectorMock<ExperienceDetailComponent>();
  let component: ExperienceDetailComponent;
  let fixture: ComponentFixture<ExperienceDetailComponent>;
  let isXsProducer: BehaviorSubject<boolean>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceDetailComponent ],
      imports: [
        HttpClientModule,
        MarkdownModule.forRoot({ loader: HttpClient }),
        MatCardModule
      ]
    }).compileComponents();
    const testExperience: Experience = {
      title: 'test-title',
      id: 'test-id',
      company: 'test-company',
      dates: 'test-dates',
      year: 2024,
      technologies: ['test-tech-1', 'test-tech-2', 'test-tech-3']
    };

    fixture = TestBed.createComponent(ExperienceDetailComponent);
    component = fixture.componentInstance;

    component.experience = testExperience;
    isXsProducer = mockSelectors.defineNgxsSelector<boolean>(component, 'isXs$');

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
