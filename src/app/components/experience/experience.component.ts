import {Component, OnInit} from '@angular/core';
import experiencesData from '../../../assets/data/experiences.json';

export interface Experience {
  title: string;
  company: string;
  dates: string;
  details: string[];
  featured: boolean;
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  experiences: Experience[] = [];
  otherExperiences: Experience[] = [];

  constructor() {}

  ngOnInit(): void {
    experiencesData.forEach(experience => {
      if (experience.featured) {
        this.experiences.push(experience);
      } else {
        this.otherExperiences.push(experience);
      }
    });
  }
}
