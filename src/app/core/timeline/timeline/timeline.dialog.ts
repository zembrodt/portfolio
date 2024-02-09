import {Component, ElementRef} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-timeline-dialog',
  templateUrl: 'timeline.dialog.html',
  styleUrls: ['./timeline.dialog.css']
})
export class TimelineDialog {

  constructor(public elementRef: ElementRef, public dialogRef: MatDialogRef<TimelineDialog>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
