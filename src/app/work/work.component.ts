import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {

  duplicate = Array(25);

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < this.duplicate.length; i++) {
      this.duplicate[i] = i + 1;
    }
  }

}
