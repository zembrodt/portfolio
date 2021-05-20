import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  @Input() projectId: number;

  constructor() { }

  ngOnInit(): void {
  }

  onProjectClick(): void {
    console.log('Clicked on card ' + this.projectId + '!');
  }

}
