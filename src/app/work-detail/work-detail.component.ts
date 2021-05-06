import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.css']
})
export class WorkDetailComponent implements OnInit {

  @Input() workId: number;

  constructor() { }

  ngOnInit(): void {
  }

}
