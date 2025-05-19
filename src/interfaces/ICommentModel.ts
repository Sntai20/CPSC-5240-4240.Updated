export interface ICommentModel {
  commentId: string;
  noteId: string;
  userId: string;
  text: string;
  votesUp?: number;
  votesDown?: number;
  createdDate?: Date;
}