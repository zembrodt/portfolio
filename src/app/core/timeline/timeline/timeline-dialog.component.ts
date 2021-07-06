import {Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-timeline-dialog',
  templateUrl: 'timeline-dialog.component.html',
})
export class TimelineDialogComponent {

  constructor(public elementRef: ElementRef) {}
}
