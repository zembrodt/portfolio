import { Component, OnInit } from '@angular/core';
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {Select, Store} from '@ngxs/store';
import {SettingsState} from '../../core/settings/settings.state';
import {Observable} from 'rxjs';
import {ScreenState} from '../../core/screen/screen.state';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';

const RESUME_PATH = './assets/docs/ryan-zembrodt-resume.pdf';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  githubIcon = faGithub;
  linkedInIcon = faLinkedin;
  emailIcon = faEnvelope;

  isXs$: Observable<boolean>;
  theme$: Observable<string>;

  constructor(private store: Store) {
    this.isXs$ = this.store.select(ScreenState.isXs);
    this.theme$ = this.store.select(SettingsState.theme);
  }

  ngOnInit(): void {
  }

  onResumeClick(): void {
    window.open(RESUME_PATH, '_blank');
  }
}
