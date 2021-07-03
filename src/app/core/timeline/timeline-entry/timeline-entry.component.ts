import {Component, ContentChild, ElementRef, Input, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {TimelineEntryHeaderComponent} from '../timeline-entry-header/timeline-entry-header.component';
import {TimelineEntryContentComponent} from '../timeline-entry-content/timeline-entry-content.component';
import {TimelineNodeComponent} from '../timeline-node/timeline-node.component';

@Component({
  selector: 'app-timeline-entry',
  templateUrl: './timeline-entry.component.html',
  styleUrls: ['./timeline-entry.component.scss']
})
export class TimelineEntryComponent {

  @ContentChild(TimelineEntryHeaderComponent) header: TimelineEntryHeaderComponent;
  @ContentChild(TimelineEntryContentComponent) content: TimelineEntryContentComponent;
  @ViewChild(TimelineNodeComponent) node: TimelineNodeComponent;

  @Output() toggled = new EventEmitter<MouseEvent>();

  constructor(public elementRef: ElementRef) {}

  toggle(event: MouseEvent): void {
    this.node.selected = true;
    this.toggled.emit(event);
  }

  set alternate(value: boolean) {
    this.elementRef.nativeElement.classList.toggle('alternate', value);
    if (this.node) {
      this.node.alternate = value;
    }
  }
}
