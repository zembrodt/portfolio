import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { ExperienceComponent } from './experience.component';
import {MockComponent, MockProvider} from 'ng-mocks';
import {VisibleService} from '../../services/visible.service';
import {BehaviorSubject, of} from 'rxjs';
import {defineNgxsSelector} from '../../core/testing/ngxs-selector-mock';
import {TimelineComponent} from '../timeline/timeline.component';
import {TimelineEntryComponent} from '../timeline/timeline-entry/timeline-entry.component';
import {TimelineEntryHeaderComponent} from '../timeline/timeline-entry-header/timeline-entry-header.component';
import {TimelineEntryContentComponent} from '../timeline/timeline-entry-content/timeline-entry-content.component';
import {TimelineDividerComponent} from '../timeline/timeline-divider/timeline-divider.component';
import {ExperienceDetailComponent} from '../experience-detail/experience-detail.component';
import {VisibilityComponent} from '../visibility/visibility.component';
import {SkillsComponent} from '../skills/skills.component';
import {Store} from '@ngxs/store';

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;
  let visibleService: VisibleService;
  let store: Store;

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
      providers: [
        MockProvider(VisibleService),
        MockProvider(Store)
      ]
    }).compileComponents();
    visibleService = TestBed.inject(VisibleService);
    visibleService.isVisible = jasmine.createSpy().and.returnValue(of(false));
    store = TestBed.inject(Store);

    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;

    isXsProducer = defineNgxsSelector<ExperienceComponent, boolean>(component, 'isXs$');
    isSmProducer = defineNgxsSelector<ExperienceComponent, boolean>(component, 'isSm$');
    isLtMdProducer = defineNgxsSelector<ExperienceComponent, boolean>(component, 'isLtMd$');

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
