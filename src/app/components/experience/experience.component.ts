import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import experiencesData from '../../../assets/data/experiences.json';
import {SkillsComponent} from '../skills/skills.component';
import {VisibleService} from '../../services/visible/visible.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {TimelineComponent} from '../../core/timeline/timeline/timeline.component';

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

  @ViewChild(TimelineComponent) timeline: TimelineComponent;

  skillsPage = SkillsComponent.PAGE;
  experiences: Experience[] = [];
  timelineDividers = new Set<number>();

  constructor(private visibleService: VisibleService) {}

  ngOnInit(): void {
    this.visibleService.isVisible(ExperienceComponent.PAGE)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isVisible) => {
        console.log('EXPERIENCE :: isVisible=' + isVisible);
        if (isVisible && this.timeline) {
          this.timeline.startAnimation();
          this.unsubscribe();
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
    this.unsubscribe();
  }

  private unsubscribe(): void {
    if (this.ngUnsubscribe) {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }
  }
}
