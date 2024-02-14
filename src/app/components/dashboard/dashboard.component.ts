import {AfterViewInit, Component} from '@angular/core';
import {AboutComponent} from '../about/about.component';
import {ExperienceComponent} from '../experience/experience.component';
import {ScreenState} from '../../core/screen/screen.state';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';

const INTRO_DURATION = 1500;
const INTRO_EASTING = 'ease-out';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  aboutPage = AboutComponent.PAGE;
  experiencePage = ExperienceComponent.PAGE;

  isLtMd$: Observable<boolean>;

  constructor(private store: Store) {
    this.isLtMd$ = this.store.select(ScreenState.isLtMd);
  }

  ngAfterViewInit(): void {
    const helloEl = document.querySelector('#hello-there') as HTMLElement;
    const nameEl = document.querySelector('.name-display') as HTMLElement;
    const jobTitleEl = document.querySelector('.job-title-display') as HTMLElement;
    const blurbEl = document.querySelector('.blurb') as HTMLElement;
    const picOfMeEl = document.querySelector('.pic-of-me') as HTMLElement;

    const textKeyframes = [{
      opacity: 0,
      transform: 'translateY(-50px)'
    }, {
      opacity: 1,
      transform: 'translateY(0%)'
    }];

    blurbEl.animate(textKeyframes, {
      duration: INTRO_DURATION,
      fill: 'forwards',
      easing: INTRO_EASTING
    });

    jobTitleEl.animate(textKeyframes, {
      duration: INTRO_DURATION,
      fill: 'forwards',
      easing: INTRO_EASTING,
      delay: 250
    });

    nameEl.animate(textKeyframes, {
      duration: INTRO_DURATION,
      fill: 'forwards',
      easing: INTRO_EASTING,
      delay: 500
    });

    helloEl.animate(textKeyframes, {
      duration: INTRO_DURATION,
      fill: 'forwards',
      easing: INTRO_EASTING,
      delay: 750
    });

    picOfMeEl.animate([{
      opacity: 0,
      transform: 'translateX(5%)'
    }, {
      opacity: 1,
      transform: 'translateX(0%)'
    }], {
      duration: INTRO_DURATION,
      delay: 1000,
      fill: 'forwards',
      easing: 'cubic-bezier(0.39, 0.575, 0.565, 1)'
    });
  }
}
