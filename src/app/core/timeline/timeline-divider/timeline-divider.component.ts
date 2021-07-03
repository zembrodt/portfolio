import {Component, ContentChild, ElementRef, Input, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {TimelineEntryHeaderComponent} from '../timeline-entry-header/timeline-entry-header.component';
import {TimelineEntryContentComponent} from '../timeline-entry-content/timeline-entry-content.component';
import {TimelineNodeComponent} from '../timeline-node/timeline-node.component';

@Component({
  selector: 'app-timeline-divider',
  templateUrl: './timeline-divider.component.html',
  styleUrls: ['./timeline-divider.component.css']
})
export class TimelineDividerComponent {

  @ViewChild(TimelineNodeComponent) node: TimelineNodeComponent;

  constructor(public elementRef: ElementRef) {}
}
