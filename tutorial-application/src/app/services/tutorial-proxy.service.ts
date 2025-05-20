import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorialProxyService {
  hostUrl: string = 'http://localhost:8080/app/';

  constructor(private httpClient: HttpClient) { }

  getTutorials(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.hostUrl + 'tutorials');
  }

  getTutorialById(id: string): Observable<any> {
    return this.httpClient.get<any>(this.hostUrl + 'tutorials/' + id);
  }
}
