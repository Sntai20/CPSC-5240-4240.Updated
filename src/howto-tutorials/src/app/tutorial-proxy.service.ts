import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorialProxyService {
  // Use the base route from your Express app
  hostUrl: string = 'http://localhost:8080/app/';

  constructor(private httpClient: HttpClient) { }

  // Get all tutorials
  getAllTutorials() {
    return this.httpClient.get<any[]>(this.hostUrl + 'tutorials');
  }

  // Get a specific tutorial by ID
  getTutorialById(tutorialId: string) {
    return this.httpClient.get(this.hostUrl + 'tutorials/' + tutorialId);
  }

  // Get all comments (general)
  getAllComments() {
    return this.httpClient.get<any[]>(this.hostUrl + 'comments');
  }

  // Get a specific comment by ID
  getCommentById(commentId: string) {
    return this.httpClient.get(this.hostUrl + 'comments/' + commentId);
  }

  // Create a new tutorial
  createTutorial(tutorial: any) {
    return this.httpClient.post(this.hostUrl + 'tutorials', tutorial);
  }

  // Create a new comment
  createComment(comment: any) {
    return this.httpClient.post(this.hostUrl + 'comments', comment);
  }
}