import {Component, OnInit} from '@angular/core';
import skillsData from '../../../assets/data/skills.json';

export interface Skill {
  title: string;
  content: string;
  icon: string;
  featured: boolean;
}

const shuffleBonusSkills = true;

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skills: Skill[] = [];

  constructor() {
  }

  ngOnInit(): void {
    let bonusSkills: Skill[] = [];
    skillsData.forEach(skill => {
      if (!skill.featured) {
        bonusSkills.push(skill);
      } else {
        this.skills.push(skill);
      }
    });

    if (shuffleBonusSkills) {
      bonusSkills = shuffle(bonusSkills);
    }
    this.skills = this.skills.concat(bonusSkills);
  }
}

function shuffle(array) {
  let i: number = array.length;

  while (i !== 0) {
    const rand = Math.floor(Math.random() * i);
    i--;

    const swap = Object.assign({}, array[i]);
    array[i] = Object.assign({}, array[rand]);
    array[rand] = swap;
  }
  return array;
}
