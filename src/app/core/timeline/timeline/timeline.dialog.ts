import {Component, ElementRef} from '@angular/core';
import {MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-timeline-dialog',
  templateUrl: 'timeline.dialog.html',
})
export class TimelineDialog {

  constructor(public elementRef: ElementRef, public dialogRef: MatDialogRef<TimelineDialog>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
