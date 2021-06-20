import {AfterViewInit, Component} from '@angular/core';

const INTRO_DURATION = 1500;
const INTRO_EASTING = 'ease-out';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  constructor() { }

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
      transform: 'translateY(-25%)'
    }, {
      opacity: 1,
      transform: 'translateY(0%)'
    }], {
      duration: INTRO_DURATION,
      delay: 1000,
      fill: 'forwards',
      easing: 'cubic-bezier(0.39, 0.575, 0.565, 1)'
    });
  }
}
