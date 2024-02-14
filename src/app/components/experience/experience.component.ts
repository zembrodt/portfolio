import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import experiencesData from '../../../assets/data/experiences.json';
import {SkillsComponent} from '../skills/skills.component';
import {VisibleService} from '../../services/visible.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {TimelineComponent} from '../timeline/timeline.component';
import {Store} from '@ngxs/store';
import {ScreenState} from '../../core/screen/screen.state';

export interface Experience {
  title: string;
  id: string;
  company: string;
  dates: string;
  year: number;
  technologies: string[];
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit, OnDestroy {
  static PAGE = 'experience';

  private ngUnsubscribe = new Subject<void>();
  private visibleSubscription = new Subscription();

  isXs$: Observable<boolean>;
  isSm$: Observable<boolean>;
  isLtMd$: Observable<boolean>;

  @ViewChild(TimelineComponent) timeline: TimelineComponent;

  skillsPage = SkillsComponent.PAGE;
  experiences: Experience[] = [];
  timelineDividers = new Set<number>();

  constructor(private visibleService: VisibleService, private store: Store) {
    this.isXs$ = this.store.select(ScreenState.isXs);
    this.isSm$ = this.store.select(ScreenState.isSm);
    this.isLtMd$ = this.store.select(ScreenState.isLtMd);
  }

  ngOnInit(): void {
    this.visibleSubscription = this.visibleService.isVisible(ExperienceComponent.PAGE)
      .subscribe((isVisible) => {
        if (isVisible && this.timeline) {
          this.timeline.startAnimation();
          this.visibleSubscription.unsubscribe();
        }
      });

    const years = new Set<number>();
    experiencesData.forEach(experience => {
      years.add(experience.year);
      this.experiences.push(experience);
    });
    this.experiences.sort((a, b) => {
      return b.year - a.year;
    });
    // Add the last year in list to dividers if multiple years exist
    if (years.size > 1) {
      this.timelineDividers.add(this.experiences.length - 1);
    }
    let prevYear: number = null;
    this.experiences.forEach((experience, index) => {
      if (prevYear === null || experience.year < prevYear) {
        this.timelineDividers.add(index - 1);
        prevYear = experience.year;
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.visibleSubscription.unsubscribe();
  }

  onMarkdownLoaded(markdown: string, index: number): void {
    // Force update the selected timeline entry content
    if (index === this.timeline.getSelectedEntryIndex()) {
      this.timeline.forceUpdateContent();
    }
  }
}
