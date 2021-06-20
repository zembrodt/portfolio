import {Component, Inject, Input} from '@angular/core';
import {Project} from '../projects/projects.component';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Skill} from '../skills/skills.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent {

  githubIcon = faGithub;

  @Input() project: Project;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(ProjectDialogComponent, {
      data: this.project
    });
  }
}

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-detail.dialog.html',
})
export class ProjectDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Project) {}
}
