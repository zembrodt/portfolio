import {Component, OnInit} from '@angular/core';
import projectsData from '../../../assets/data/projects.json';
import {Store} from '@ngxs/store';
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

  isLtMd$: Observable<boolean>;

  projects: Project[];

  constructor(private store: Store) {
    this.isLtMd$ = this.store.select(ScreenState.isLtMd);
  }

  ngOnInit(): void {
    this.projects = projectsData;
  }
}
