import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  duplicate = Array(25);

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < this.duplicate.length; i++) {
      this.duplicate[i] = i + 1;
    }
  }

}
