import { Component, OnInit } from '@angular/core';
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';

const RESUME_PATH = 'http://zembrodt.com/assets/docs/ryan-zembrodt-resume.pdf';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  githubIcon = faGithub;
  linkedInIcon = faLinkedin;

  constructor() { }

  ngOnInit(): void {
  }

  onResumeClick(): void {
    window.open(RESUME_PATH, '_blank');
  }
}
