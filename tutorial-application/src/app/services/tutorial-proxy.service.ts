import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorialProxyService {
  // hostUrl: string = 'http://localhost:8080/app/';
  hostUrl: string = 'https://tutorialplatformmac-f0e4a3faemd4b4e5.westus-01.azurewebsites.net/app/';

  constructor(private httpClient: HttpClient) { }

  getTutorials(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.hostUrl + 'tutorials');
  }

  getTutorialById(id: string): Observable<any> {
    return this.httpClient.get<any>(this.hostUrl + 'tutorials/' + id);
  }
}