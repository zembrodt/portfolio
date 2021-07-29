import {Component, ContentChild, ElementRef, Output, EventEmitter, ViewChild, Renderer2, Input} from '@angular/core';
import {TimelineEntryHeaderComponent} from '../timeline-entry-header/timeline-entry-header.component';
import {TimelineEntryContentComponent} from '../timeline-entry-content/timeline-entry-content.component';
import {TimelineNodeComponent} from '../timeline-node/timeline-node.component';

@Component({
  selector: 'app-timeline-entry',
  templateUrl: './timeline-entry.component.html',
  styleUrls: ['./timeline-entry.component.scss']
})
export class TimelineEntryComponent {

  private _width = 50;

  @ContentChild(TimelineEntryHeaderComponent) header: TimelineEntryHeaderComponent;
  @ContentChild(TimelineEntryContentComponent) content: TimelineEntryContentComponent;
  @ViewChild(TimelineNodeComponent) node: TimelineNodeComponent;

  @Input() indexId = -1;
  @Output() toggled = new EventEmitter<MouseEvent>();

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {}

  animate(delay: number): void {
    (this.elementRef.nativeElement as HTMLElement).animate({
      opacity: 1
    }, {
      fill: 'forwards',
      duration: delay
    });
    const entryEl = (this.elementRef.nativeElement as HTMLElement).querySelector('.timeline-entry-header');
    entryEl.animate([{
      transform: this.elementRef.nativeElement.classList.contains('alternate') ? 'rotateY(-60deg)' : 'rotateY(60deg)'
    }, {
      transform: 'rotateY(0)'
    }], {
      fill: 'forwards',
      duration: delay
    });
  }

  toggle(event: MouseEvent): void {
    this.node.selected = true;
    this.toggled.emit(event);
  }

  set alternate(value: boolean) {
    // Toggle alternate class
    this.elementRef.nativeElement.classList.toggle('alternate', value);
    if (this.node) {
      this.node.alternate = value;
    }
    // Check the width for the node
    this.renderer.setStyle(this.elementRef.nativeElement, 'width', `calc(${this._width}% - 4px)`);
  }

  set enableAlternating(value: boolean) {
    // Adjust width
    this._width = value ? 50 : 100;
  }

  set enableAnimations(value: boolean) {
    if (value) {
      // Set Opacity to 0 if animating timeline
      console.log('Setting opacity to 0');
      this.renderer.setStyle(this.elementRef.nativeElement, 'opacity', 0);
    }
  }
}
