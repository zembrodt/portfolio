import {Component, Input} from '@angular/core';
import {Project} from '../projects/projects.component';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {Select} from '@ngxs/store';
import {ScreenState} from '../../core/screen/screen.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent {

  @Select(ScreenState.isLtMd) isLtMd$!: Observable<boolean>;
  @Input() project: Project;

  githubIcon = faGithub;

  constructor() {}
}
