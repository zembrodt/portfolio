import {AfterViewInit, Component, HostListener, Input, OnInit} from '@angular/core';
import {VisibleService} from '../../services/visible/visible.service';

const VISIBILITY_OFFSET = 300;
const FADE_IN_DURATION = 1000;

@Component({
  selector: 'app-visibility',
  templateUrl: './visibility.component.html',
  styleUrls: ['./visibility.component.css']
})
export class VisibilityComponent implements OnInit, AfterViewInit {
  visible = false;

  @Input()
  name: string;
  @Input()
  offset = VISIBILITY_OFFSET;

  constructor(private visibleService: VisibleService) {}

  ngOnInit(): void {
    if (this.name === null || this.name === undefined || this.name.length === 0) {
      throw new Error('Attribute \'name\' is required');
    }
  }

  ngAfterViewInit(): void {
    this.checkVisibility();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.checkVisibility();
  }

  private checkVisibility(): void {
    if (!this.visible) {
      const element = document.querySelector('#visibility-' + this.name) as HTMLElement;
      // Check if element is on screen
      if (element.offsetTop + this.offset < window.innerHeight + window.pageYOffset) {
        this.visible = true;
        this.visibleService.toggleVisible(this.name);
        element.animate({
          opacity: 1
        }, {
          duration: FADE_IN_DURATION,
          fill: 'forwards',
          easing: 'ease-in'
        });
      }
    }
  }
}
