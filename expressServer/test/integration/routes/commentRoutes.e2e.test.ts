import * as chai from 'chai';
import { request, default as chaiHttp } from 'chai-http';
import { expect } from 'chai';

chai.use(chaiHttp);

// const baseUrl = 'http://localhost:8080';
const baseUrl = 'http://tutorialplatformmac-f0e4a3faemd4b4e5.westus-01.azurewebsites.net';

interface Comment {
  commentId: string;
  noteId: string;
  userId: string;
  text: string;
  votesUp: number;
  votesDown: number;
}

function generateUniqueIds() {
  const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  return {
    commentId: uniqueId,
    noteId: `note-${uniqueId}`,
    userId: `user-${uniqueId}`,
  };
}

async function createComment(comment: Comment) {
  return request.execute(baseUrl)
    .post(`/app/communityNotes/${comment.noteId}/comments`)
    .send(comment)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
}

describe('CommentModel API endpoints (E2E)', () => {

  it('should create a comment and return it', async () => {
    const ids = generateUniqueIds();
    const newComment: Comment = {
      ...ids,
      text: 'This is a test comment.',
      votesUp: 0,
      votesDown: 0,
    };
    const res = await createComment(newComment);
    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    expect(res.body.commentId).to.equal(newComment.commentId);
    expect(res.body.text).to.equal(newComment.text);
  });

  it('should return status 200 for GET /app/comments/:commentId', async () => {
    const ids = generateUniqueIds();
    const newComment: Comment = {
      ...ids,
      text: 'This is a test comment.',
      votesUp: 0,
      votesDown: 0,
    };
    await createComment(newComment);

    const res = await request.execute(baseUrl)
      .get(`/app/comments/${newComment.commentId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.commentId).to.equal(newComment.commentId);
  });

  it('should return status 200 for GET /app/communityNotes/:noteId/comments', async () => {
    const ids = generateUniqueIds();
    const newComment: Comment = {
      ...ids,
      text: 'This is a test comment.',
      votesUp: 0,
      votesDown: 0,
    };
    await createComment(newComment);

    const res = await request.execute(baseUrl)
      .get(`/app/communityNotes/${newComment.noteId}/comments`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0].commentId).to.equal(newComment.commentId);
  });

});