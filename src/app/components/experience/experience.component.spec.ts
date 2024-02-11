import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { ExperienceComponent } from './experience.component';
import {MockComponent, MockProvider} from 'ng-mocks';
import {VisibleService} from '../../services/visible.service';
import {BehaviorSubject, of} from 'rxjs';
import {NgxsSelectorMock} from '../../core/testing/ngxs-selector-mock';
import {TimelineComponent} from '../timeline/timeline.component';
import {TimelineEntryComponent} from '../timeline/timeline-entry/timeline-entry.component';
import {TimelineEntryHeaderComponent} from '../timeline/timeline-entry-header/timeline-entry-header.component';
import {TimelineEntryContentComponent} from '../timeline/timeline-entry-content/timeline-entry-content.component';
import {TimelineDividerComponent} from '../timeline/timeline-divider/timeline-divider.component';
import {ExperienceDetailComponent} from '../experience-detail/experience-detail.component';
import {VisibilityComponent} from '../visibility/visibility.component';
import {SkillsComponent} from '../skills/skills.component';

describe('ExperienceComponent', () => {
  const mockSelectors = new NgxsSelectorMock<ExperienceComponent>();
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;
  let visibleService: VisibleService;
  let isXsProducer: BehaviorSubject<boolean>;
  let isSmProducer: BehaviorSubject<boolean>;
  let isLtMdProducer: BehaviorSubject<boolean>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExperienceComponent,
        MockComponent(ExperienceDetailComponent),
        MockComponent(SkillsComponent),
        MockComponent(TimelineComponent),
        MockComponent(TimelineDividerComponent),
        MockComponent(TimelineEntryComponent),
        MockComponent(TimelineEntryContentComponent),
        MockComponent(TimelineEntryHeaderComponent),
        MockComponent(VisibilityComponent)
      ],
      providers: [ MockProvider(VisibleService) ]
    }).compileComponents();
    visibleService = TestBed.inject(VisibleService);
    visibleService.isVisible = jasmine.createSpy().and.returnValue(of(false));

    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;

    isXsProducer = mockSelectors.defineNgxsSelector<boolean>(component, 'isXs$');
    isSmProducer = mockSelectors.defineNgxsSelector<boolean>(component, 'isSm$');
    isLtMdProducer = mockSelectors.defineNgxsSelector<boolean>(component, 'isLtMd$');

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
