import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Experience} from '../experience/experience.component';
import {ScreenState} from '../../core/screen/screen.state';
import {Observable} from 'rxjs';
import {Select} from '@ngxs/store';

@Component({
  selector: 'app-experience-detail',
  templateUrl: './experience-detail.component.html',
  styleUrls: ['./experience-detail.component.css']
})
export class ExperienceDetailComponent {

  @Select(ScreenState.isXs) isXs$: Observable<boolean>;
  @Input() experience: Experience;
  @Output() markdownLoaded = new EventEmitter<string>();

  constructor() {}

  onMarkdownLoad(markdown: string): void {
    this.markdownLoaded.emit(markdown);
  }
}
