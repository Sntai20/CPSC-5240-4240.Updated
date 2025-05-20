import * as sinon from 'sinon';

// Mock TutorialModel and CommentModel
class TutorialModelMock {
    createModel = sinon.stub().resolves();
    retrieveAllTutorials = sinon.stub().callsFake((res) => res.json([{ tutorialId: '1', title: 'Test' }]));
    retrieveTutorial = sinon.stub().callsFake((res, id) => {
        if (id === '999') {
            return res.status(404).end();
        }
        return res.json({ tutorialId: id, title: 'Test' });
    });
    createTutorial = sinon.stub().callsFake((res, obj) => res.status(201).json(obj));
}

class CommentModelMock {
    createModel = sinon.stub().resolves();
    retrieveAll = sinon.stub().callsFake((res) => res.json([{ id: '1', text: 'Comment' }]));
    retrieveByID = sinon.stub().callsFake((res, id) => {
        if (id === '999') {
            return res.status(404).end();
        }
        return res.json({ id, text: 'Comment' });
    });
    createComment = sinon.stub().callsFake((res, obj) => res.status(201).json(obj));
}

export { TutorialModelMock, CommentModelMock };