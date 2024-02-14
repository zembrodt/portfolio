import {Component, Input, OnDestroy, TemplateRef} from '@angular/core';
import {Project} from '../projects/projects.component';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {Select, Store} from '@ngxs/store';
import {ScreenState} from '../../core/screen/screen.state';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnDestroy {

  @Input() project: Project;

  isLtMd$: Observable<boolean>;
  screenshotDialogRef: MatDialogRef<any>;

  githubIcon = faGithub;

  constructor(private dialog: MatDialog, private store: Store) {
    this.isLtMd$ = this.store.select(ScreenState.isLtMd);
  }

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
