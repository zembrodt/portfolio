import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {TimelineNodeComponent} from '../timeline-node/timeline-node.component';

@Component({
  selector: 'app-timeline-divider',
  templateUrl: './timeline-divider.component.html',
  styleUrls: ['./timeline-divider.component.css']
})
export class TimelineDividerComponent {

  @ViewChild(TimelineNodeComponent) node: TimelineNodeComponent;

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {}

  set enableAlternating(value: boolean) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'width', `calc(${value ? 50 : 100}% - 4px)`);
  }
}
