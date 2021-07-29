import {Component, OnInit} from '@angular/core';
import projectsData from '../../../assets/data/projects.json';
import {Select} from '@ngxs/store';
import {ScreenState} from '../../core/screen/screen.state';
import {Observable} from 'rxjs';

export interface Project {
  title: string;
  id: string;
  projectUrl: string;
  githubUrl: string;
  docsUrl: string;
  screenshotUrl: string;
  technologies: string[];
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  @Select(ScreenState.isLtMd) isLtMd$: Observable<boolean>;

  projects: Project[];

  constructor() {}

  ngOnInit(): void {
    this.projects = projectsData;
  }
}
