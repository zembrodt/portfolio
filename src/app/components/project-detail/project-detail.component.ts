import {Component, Input} from '@angular/core';
import {Project} from '../projects/projects.component';
import {faGithub} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent {

  githubIcon = faGithub;

  @Input() project: Project;

  constructor() {}
}
