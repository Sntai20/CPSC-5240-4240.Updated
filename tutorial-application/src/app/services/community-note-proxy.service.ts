import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICommunityNoteModel } from '../../../../expressServer/src/interfaces/ICommunityNoteModel';
import { ICommentModel } from '../../../../expressServer/src/interfaces/ICommentModel';

@Injectable({
  providedIn: 'root'
})
export class CommunityNoteProxyService {
  // hostUrl = 'http://localhost:8080/app/communityNotes/';
  hostUrl = 'https://tutorialplatformmac-f0e4a3faemd4b4e5.westus-01.azurewebsites.net/app/communityNotes/';

  constructor(private http: HttpClient) { }

  getByTutorialId(tutorialId: string): Observable<ICommunityNoteModel[]> {
    return this.http.get<ICommunityNoteModel[]>(this.hostUrl + 'tutorial/' + tutorialId);
  }

  getComments(noteId: string): Observable<ICommentModel[]> {
    return this.http.get<ICommentModel[]>(this.hostUrl + noteId + '/comments');
  }

  addComment(noteId: string, text: string): Observable<ICommentModel> {
    return this.http.post<ICommentModel>(this.hostUrl + noteId + '/comments', { text });
  }

  addNote(payload: Partial<ICommunityNoteModel>): Observable<ICommunityNoteModel> {
    return this.http.post<ICommunityNoteModel>(`${this.hostUrl}`, payload);
  }
}