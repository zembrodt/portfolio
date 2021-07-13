import {AfterViewInit, Component, ElementRef, Input} from '@angular/core';
import {Project} from '../projects/projects.component';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {Select} from '@ngxs/store';
import {ScreenState} from '../../core/screen/screen.state';
import {Observable} from 'rxjs';
import remark from 'remark';
import html from 'remark-html';
import {MarkdownService} from '../../services/markdown.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements AfterViewInit {

  @Select(ScreenState.isLtMd) isLtMd$: Observable<boolean>;
  @Input() project: Project;

  githubIcon = faGithub;

  constructor(private elementRef: ElementRef, private markdownService: MarkdownService) {}

  ngAfterViewInit(): void {
    const contentEl = this.elementRef.nativeElement.querySelector('.project-content') as HTMLElement;
    if (contentEl && this.project) {
      this.markdownService.fetchProject(this.project.id)
        .subscribe(data => {
          remark().use(html).process(data).then(content => {
            contentEl.innerHTML = content.toString();
          });
        }, (err: HttpErrorResponse) => {
          contentEl.innerHTML = `<p>Error loading content for ${this.project.id}</p><p>${err.message}</p>`;
        });
    } else {
      console.error('Could not load project detail content: ' + this.project.id);
    }
  }
}
