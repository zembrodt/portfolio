import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Experience} from '../experience/experience.component';
import {ScreenState} from '../../core/screen/screen.state';
import {Observable} from 'rxjs';
import {Select} from '@ngxs/store';
import remark from 'remark';
import html from 'remark-html';

@Component({
  selector: 'app-experience-detail',
  templateUrl: './experience-detail.component.html',
  styleUrls: ['./experience-detail.component.css']
})
export class ExperienceDetailComponent implements OnInit {

  @Select(ScreenState.isXs) isXs$: Observable<boolean>;
  @Input() experience: Experience;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (this.experience && this.experience.content && this.experience.content.length > 0) {
      // Parse the project content as markdown and convert to HTML
      remark().use(html).process(this.experience.content.join('\n'))
        .then(content => {
          const contentEl = this.elementRef.nativeElement.querySelector('.experience-content') as HTMLElement;
          if (contentEl) {
            contentEl.innerHTML = content.toString();
          }
        });
    }
  }
}
