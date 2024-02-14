import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Experience} from '../experience/experience.component';
import {ScreenState} from '../../core/screen/screen.state';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-experience-detail',
  templateUrl: './experience-detail.component.html',
  styleUrls: ['./experience-detail.component.css']
})
export class ExperienceDetailComponent {

  @Input() experience: Experience;
  @Output() markdownLoaded = new EventEmitter<string>();
  isXs$: Observable<boolean>;

  constructor(private store: Store) {
    this.isXs$ = this.store.select(ScreenState.isXs);
  }

  onMarkdownLoad(markdown: string): void {
    this.markdownLoaded.emit(markdown);
  }
}
