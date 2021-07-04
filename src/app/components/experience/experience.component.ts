import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import experiencesData from '../../../assets/data/experiences.json';
import {SkillsComponent} from '../skills/skills.component';
import {VisibleService} from '../../services/visible/visible.service';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject, Subscription} from 'rxjs';
import {TimelineComponent} from '../../core/timeline/timeline/timeline.component';
import {Select} from '@ngxs/store';
import {SettingsState} from '../../core/settings/settings.state';
import {ScreenState} from '../../core/screen/screen.state';

export interface Experience {
  title: string;
  company: string;
  dates: string;
  year: number;
  details: string[];
  technologies: string[];
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit, OnDestroy {
  static PAGE = 'experience';

  private ngUnsubscribe = new Subject();
  private visibleSubscription = new Subscription();

  @Select(ScreenState.isMobile) isMobile$: Observable<boolean>;
  @ViewChild(TimelineComponent) timeline: TimelineComponent;

  skillsPage = SkillsComponent.PAGE;
  experiences: Experience[] = [];
  timelineDividers = new Set<number>();

  constructor(private visibleService: VisibleService) {}

  ngOnInit(): void {
    this.visibleSubscription = this.visibleService.isVisible(ExperienceComponent.PAGE)
      .subscribe((isVisible) => {
        console.log('EXPERIENCE :: isVisible=' + isVisible);
        if (isVisible && this.timeline) {
          this.timeline.startAnimation();
          this.visibleSubscription.unsubscribe();
        }
      });

    this.isMobile$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isMobile) => {
        console.log('Change timeline to mobile mode? ' + isMobile);
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
}
