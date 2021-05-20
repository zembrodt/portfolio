import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-experience-detail',
  templateUrl: './experience-detail.component.html',
  styleUrls: ['./experience-detail.component.css']
})
export class ExperienceDetailComponent implements OnInit {

  @Input() workId: number;

  constructor() { }

  ngOnInit(): void {
  }

}
