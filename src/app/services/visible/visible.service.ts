import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

interface Page {
  isVisible: boolean;
  subject: Subject<boolean>;
}

@Injectable({providedIn: 'root'})
export class VisibleService {
  private pages = new Map<string, Page>();

  constructor() {}

  isVisible(name: string): Observable<boolean> {
    if (!this.pages.has(name)) {
      this.createPage(name);
    }
    return this.pages.get(name).subject;
  }

  toggleVisible(name: string): void {
    if (!this.pages.has(name)) {
      console.log('Adding ' + name + ' as visible');
      this.createPage(name);
    }
    console.log('Updating ' + name + ' to visible=' + !this.pages.get(name).isVisible);
    const isVisible = !this.pages.get(name).isVisible;
    this.pages.get(name).isVisible = isVisible;
    this.pages.get(name).subject.next(isVisible);
  }

  private createPage(name: string): void {
    const page = {
      isVisible: false,
      subject: new Subject<boolean>()
    };
    this.pages.set(name, page);
  }
}
