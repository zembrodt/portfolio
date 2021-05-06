import {Component, EventEmitter, OnInit} from '@angular/core';
import {MatButtonToggleChange} from '@angular/material/button-toggle';
import {of} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  page: string;

  constructor() { }

  ngOnInit(): void {
  }

  onPageChange(): void {
    const bodyRect = document.body.getBoundingClientRect();
    const pageRect = document.getElementById(this.page).getBoundingClientRect();
    const offset = pageRect.top - bodyRect.top;
    console.log('Offset is: ' + offset);

    window.scrollTo(0, offset);
    // document.getElementById(this.page).scrollIntoView();
  }
}
