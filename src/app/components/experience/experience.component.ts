import {Component, OnInit} from '@angular/core';
import experiencesData from '../../../assets/data/experiences.json';
import {SkillsComponent} from '../skills/skills.component';

export interface Experience {
  title: string;
  company: string;
  dates: string;
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

  constructor() {}

  ngOnInit(): void {
    experiencesData.forEach(experience => {
      this.experiences.push(experience);
    });
  }
}
