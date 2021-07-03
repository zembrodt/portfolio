import {Component, OnInit} from '@angular/core';
import experiencesData from '../../../assets/data/experiences.json';
import {SkillsComponent} from '../skills/skills.component';

export interface Experience {
  title: string;
  company: string;
  dates: string;
  year: number;
  details: string[];
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  skillsPage = SkillsComponent.PAGE;

  experiences: Experience[] = [];
  timelineDividers = new Set<number>();

  constructor() {}

  ngOnInit(): void {
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
}
