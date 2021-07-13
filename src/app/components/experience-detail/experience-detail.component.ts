import {AfterViewInit, Component, ElementRef, Input} from '@angular/core';
import {Experience} from '../experience/experience.component';
import {ScreenState} from '../../core/screen/screen.state';
import {Observable} from 'rxjs';
import {Select} from '@ngxs/store';
import remark from 'remark';
import html from 'remark-html';
import {HttpErrorResponse} from '@angular/common/http';
import {MarkdownService} from '../../services/markdown.service';

@Component({
  selector: 'app-experience-detail',
  templateUrl: './experience-detail.component.html',
  styleUrls: ['./experience-detail.component.css']
})
export class ExperienceDetailComponent implements AfterViewInit {

  @Select(ScreenState.isXs) isXs$: Observable<boolean>;
  @Input() experience: Experience;

  constructor(private elementRef: ElementRef, private markdownService: MarkdownService) {}

  ngAfterViewInit(): void {
    const contentEl = this.elementRef.nativeElement.querySelector('.experience-content') as HTMLElement;
    if (contentEl && this.experience) {
      this.markdownService.fetchExperience(this.experience.id)
        .subscribe(data => {
          remark().use(html).process(data).then(content => {
            contentEl.innerHTML = content.toString();
          });
        }, (err: HttpErrorResponse) => {
          contentEl.innerHTML = `<p>Error loading content for ${this.experience.id}</p><p>${err.message}</p>`;
        });
    } else {
      console.error('Could not load experience detail content: ' + this.experience.id);
    }
  }
}
