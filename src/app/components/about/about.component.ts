import {AfterViewInit, Component} from '@angular/core';

const ABOUT_IMG_DURATION = 1000;
const ABOUT_IMG_EASING = 'ease-out';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    const backpackingEl = document.querySelector('#backpacking') as HTMLElement;
    const golfingEl = document.querySelector('#golfing') as HTMLElement;
    const campingEl = document.querySelector('#camping') as HTMLElement;

    const keyframes = [{
      opacity: 0,
      transform: 'translateX(25%)'
    }, {
      opacity: 1,
      transform: 'translateX(0%)'
    }];

    backpackingEl.animate(keyframes, {
      duration: ABOUT_IMG_DURATION,
      fill: 'forwards',
      easing: ABOUT_IMG_EASING
    });

    golfingEl.animate(keyframes, {
      duration: ABOUT_IMG_DURATION,
      fill: 'forwards',
      easing: ABOUT_IMG_EASING,
      delay: 500
    });

    campingEl.animate(keyframes, {
      duration: ABOUT_IMG_DURATION,
      fill: 'forwards',
      easing: ABOUT_IMG_EASING,
      delay: 1000
    });
  }

}
