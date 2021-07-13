import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

const DATA_PATH = '/assets/data';

@Injectable({providedIn: 'root'})
export class MarkdownService {

  constructor(private http: HttpClient) {}

  fetchExperience(id: string): Observable<string> {
    return this.fetchMarkdownFile(id, `${DATA_PATH}/experiences`);
  }

  fetchProject(id: string): Observable<string> {
    return this.fetchMarkdownFile(id, `${DATA_PATH}/projects`);
  }

  private fetchMarkdownFile(id, path: string): Observable<string> {
    return this.http.get(`${path}/${id}.md`, { responseType: 'text' });
  }
}
