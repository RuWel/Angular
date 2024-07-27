import { HttpClient } from '@angular/common/http';
import { ITutorial } from './tutorial.model';
import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environment/environment';

const PROTOCOL = environment.protocol;
const PORT = environment.port;

/**
 * HTTP Client for accessing REST API
 *
 * All methods are in the same order as the REST API methods (except test methods)
 */
@Injectable()
export class RestService {
  private baseURL: string;
  private httpClient = inject(HttpClient);

  constructor() {
    this.baseURL = `${PROTOCOL}://${location.hostname}:${PORT}/api/`;
  }

  createTutorial(tutorial: ITutorial, file: File): Observable<ITutorial> {
    let restParams: FormData = new FormData();

    restParams.append('title', tutorial.title);
    restParams.append('description', tutorial.description);
    restParams.append('published', tutorial.published ? 'true' : 'false');
    restParams.append('tutorial', file);

    return this.httpClient.post<ITutorial>(
      this.baseURL + 'tutorial/create',
      restParams
    );
  }

  getAllTutorials(): Observable<ITutorial[]> {
    return this.httpClient.get<ITutorial[]>(this.baseURL + 'tutorials/load');
  }

  updateTutorial(tutorial: ITutorial): Observable<ITutorial> {
    return this.httpClient.put<ITutorial>(
      this.baseURL + 'tutorial/update/' + tutorial.id,
      tutorial
    );
  }

  updateTutorialWithFile(
    tutorial: ITutorial,
    file: File
  ): Observable<ITutorial> {
    let restParams: FormData = new FormData();

    restParams.append('title', tutorial.title);
    restParams.append('description', tutorial.description);
    restParams.append('published', tutorial.published ? 'true' : 'false');
    restParams.append('tutorial', file);

    return this.httpClient.put<ITutorial>(
      this.baseURL + 'tutorial/update/file/' + tutorial.id,
      restParams
    );
  }

  deleteTutorial(id: number) {
    return this.httpClient.delete(this.baseURL + 'tutorial/delete/' + id);
  }

  deleteAllTutorials() {
    return this.httpClient.delete(this.baseURL + 'tutorials/delete');
  }

  findTutorialById(id: number) {
    return this.httpClient.get<ITutorial>(this.baseURL + 'tutorial/find/' + id);
  }

  // REST API = findAllTutorials(boolean)
  findAllPublishedTutorials() {
    return this.httpClient.get<ITutorial[]>(
      this.baseURL + 'tutorials/find?published=' + true
    );
  }

  findAllUnpublishedTutorials() {
    return this.httpClient.get<ITutorial[]>(
      this.baseURL + 'tutorials/find?published=' + false
    );
  }

  findTutorialsByKeywords(keywords: string[]) {
    let args: string = this.buildArgs(keywords);

    return this.httpClient.get<ITutorial[]>(
      this.baseURL + 'tutorials/find/keywords?' + args
    );
  }

  private buildArgs(keywords: string[]): string {
    let result: string = '';
    let i = 0;
    for (let keyword of keywords) {
      result += 'keyword' + i + '=' + keyword + '&';
      i++;
    }

    return result.slice(0, result.lastIndexOf('&'));
  }

  publishTutorial(id: number) {
    return this.httpClient.put(this.baseURL + 'tutorial/publish/' + id, null);
  }

  publishAllTutorials() {
    return this.httpClient.put(this.baseURL + 'tutorials/publish', null);
  }
}
