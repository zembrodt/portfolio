import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  year = new Date().getFullYear();
  version = environment.version;

  constructor() { }

  ngOnInit(): void {
  }

}
