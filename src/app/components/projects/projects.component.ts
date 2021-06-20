import {Component, OnInit} from '@angular/core';
import projectsData from '../../../assets/data/projects.json';

export interface Project {
  title: string;
  description: string;
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

  projects: Project[];

  constructor() {}

  ngOnInit(): void {
    this.projects = projectsData;
  }
}
