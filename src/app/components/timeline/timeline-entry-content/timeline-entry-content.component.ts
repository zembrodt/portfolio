import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-timeline-entry-content',
  templateUrl: './timeline-entry-content.component.html',
  styleUrls: ['./timeline-entry-content.component.css']
})
export class TimelineEntryContentComponent implements OnInit {

  constructor(public elementRef: ElementRef) {}

  ngOnInit(): void {
  }
}
