import {Component, Input, OnDestroy, TemplateRef} from '@angular/core';
import {Project} from '../projects/projects.component';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {Select} from '@ngxs/store';
import {ScreenState} from '../../core/screen/screen.state';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnDestroy {

  screenshotDialogRef: MatDialogRef<any>;

  @Select(ScreenState.isLtMd) isLtMd$!: Observable<boolean>;
  @Input() project: Project;

  githubIcon = faGithub;

  constructor(private dialog: MatDialog) {}

  openScreenshotDialog(template: TemplateRef<unknown>): void {
    this.screenshotDialogRef = this.dialog.open(template, {
      maxHeight: '90vh',
      maxWidth: '90vw'
    });
  }

  ngOnDestroy(): void {
    if (this.screenshotDialogRef) {
      this.screenshotDialogRef.close();
    }
  }
}
