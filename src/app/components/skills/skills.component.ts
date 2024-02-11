import {Component, OnDestroy, OnInit} from '@angular/core';
import skillsData from '../../../assets/data/skills.json';
import {VisibleService} from '../../services/visible.service';
import {Subject} from 'rxjs';
import {shuffle} from '../../core/utils';
import {takeUntil} from 'rxjs/operators';

export interface Skill {
  title: string;
  content: string;
  icon: string;
  featured: boolean;
}

const SKILL_DURATION = 500;
const SKILL_EASING = 'ease-out';
const shuffleBonusSkills = true;

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, OnDestroy {
  static PAGE = 'skills';

  private ngUnsubscribe = new Subject<void>();

  skills: Skill[] = [];

  constructor(private visibleService: VisibleService) {}

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

    this.visibleService.isVisible(SkillsComponent.PAGE)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isVisible) => {
        if (isVisible) {
          this.animateSkills();
          this.unsubscribe();
        }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  private animateSkills(): void {
    const keyframes = [{
      opacity: 0,
      transform: 'translateY(-15px)'
    }, {
      opacity: 1,
      transform: 'translateY(0%)'
    }];

    for (let i = 0; i < this.skills.length; i++) {
      const skillEl = document.querySelector('#skill-' + i);
      skillEl.animate(keyframes, {
        duration: SKILL_DURATION,
        fill: 'forwards',
        easing: SKILL_EASING,
        delay: i * 100
      });
    }
  }

  private unsubscribe(): void {
    if (this.ngUnsubscribe) {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }
  }
}
