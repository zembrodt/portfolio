import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  duplicate = Array(25);

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < this.duplicate.length; i++) {
      this.duplicate[i] = i + 1;
    }
  }

}
