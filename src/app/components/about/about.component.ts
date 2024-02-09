import {Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {VisibleService} from '../../services/visible.service';
import {Select} from '@ngxs/store';
import {ScreenState} from '../../core/screen/screen.state';

const ABOUT_IMG_DURATION = 1000;
const ABOUT_IMG_EASING = 'ease-out';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  static PAGE = 'about';

  private ngUnsubscribe = new Subject<void>();
  private hasAnimated = false;
  private isXs = false;
  private isXsSub: Subscription;

  @Select(ScreenState.isXs) isXs$!: Observable<boolean>;

  constructor(private visibleService: VisibleService, private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.visibleService.isVisible(AboutComponent.PAGE)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isVisible) => {
        console.log('ABOUT :: isVisible: ' + isVisible);
        if (isVisible) {
          this.animateImages();
          this.hasAnimated = true;
          this.unsubscribe();
        }
    });

    this.isXsSub = this.isXs$.subscribe((isXs) => {
      this.isXs = isXs;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe();
    this.isXsSub.unsubscribe();
  }

  private animateImages(): void {
    const backpackingEl = document.querySelector('#backpacking') as HTMLElement;
    const bikingEl = document.querySelector('#biking') as HTMLElement;
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

    bikingEl.animate(keyframes, {
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

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    // If we've already animated set image opacity to 1
    if (this.hasAnimated && !this.isXs) {
      const images = this.elementRef.nativeElement.querySelectorAll('.about-img');
      if (images && images.length > 0) {
        images.forEach(image => {
          this.renderer.setStyle(image, 'opacity', 1);
        });
      }
    }
  }

  private unsubscribe(): void {
    if (this.ngUnsubscribe) {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }
  }
}
