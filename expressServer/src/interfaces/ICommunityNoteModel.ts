export interface ICommunityNoteModel {
  noteId: string;
  tutorialId: string;
  userId: string;
  title: string;
  text: string;
  votesUp?: number;
  votesDown?: number;
  createdDate: Date;
  updatedDate?: Date;
}