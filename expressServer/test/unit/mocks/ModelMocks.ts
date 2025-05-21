import * as sinon from 'sinon';

class TutorialModelMock {
    createModel = sinon.stub().resolves();
    retrieveAllTutorials = sinon.stub().callsFake((res) =>
      res.json([
        {
          tutorialId: 'tut001',
          title: 'Tutorial One',
          description: 'First tutorial description',
          steps: []
        },
        {
          tutorialId: 'tut002',
          title: 'Tutorial Two',
          description: 'Second tutorial description',
          steps: []
        },
        {
          tutorialId: 'tut003',
          title: 'Tutorial Three',
          description: 'Third tutorial description',
          steps: []
        }
      ])
    );    
    retrieveTutorial = sinon.stub().callsFake((res, id) => {
        if (id === '999') {
            return res.status(404).end();
        }
        return res.json({
            tutorialId: id, title: 'Test', description: 'Test description', steps: [
                { stepNumber: 1, description: 'Step one', imageUrls: [], videoUrls: [] }
            ]
        });
    });
    createTutorial = sinon.stub().callsFake((res, obj) => res.status(201).json(obj));
}

class CommentModelMock {
    createModel = sinon.stub().resolves();
    retrieveAll = sinon.stub().callsFake((res) => res.json([
        { id: '1', text: 'Comment 1' },
        { id: '2', text: 'Comment 2' },
        { id: '3', text: 'Comment 3' }
    ]));
    retrieveByID = sinon.stub().callsFake((res, id) => {
        if (id === '999') {
            return res.status(404).end();
        }
        return res.json({ id, text: 'Comment' });
    });
    createComment = sinon.stub().callsFake((res, obj) => res.status(201).json(obj));
    retrieveByNoteID = sinon.stub().callsFake((res, noteId) =>
      res.json([
        { id: '1', noteId, text: 'Comment 1' },
        { id: '2', noteId, text: 'Comment 2' },
        { id: '3', noteId, text: 'Comment 3' }
      ])
    );
}


class CommunityNoteModelMock {
    createModel = sinon.stub().resolves();
    retrieveAll = sinon.stub().callsFake((res) => res.json([{ noteId: '1', title: 'Note' }]));
    retrieveByID = sinon.stub().callsFake((res, id) => {
        if (id === '999') {
            return res.status(404).end();
        }
        return res.json({ noteId: id, title: 'Note' });
    }
    );
    retrieveByTutorialID = sinon.stub().callsFake((res, id) => {
        if (id === '999') {
            return res.status(404).end();
        }
        return res.json([{ noteId: id, title: 'Note' }]);
    }
    );
    createCommunityNote = sinon.stub().callsFake((res, obj) => res.status(201).json(obj));
}

export { TutorialModelMock, CommentModelMock, CommunityNoteModelMock };