const { title } = require("process");

db = db.getSiblingDB('tutorialPlatform')

db.createCollection('tutorials');
db.createCollection('comments');
db.createCollection('communityNotes');


tutorials = db.getCollection('tutorials');
comments = db.getCollection('comments');
communityNotes = db.getCollection('communityNotes')

// Clear data
tutorials.remove({})
comments.remove({});
communityNotes.remove({})

// Insert Tutorials 
tutorialList = [
  {
    title: 'Getting Started with MongoDB',
    text: 'Learn the basics of MongoDB database operations and queries.',
    tutorialId: 'tut001',
    createdDate: new Date('2025-01-10'),
    updatedDate: new Date('2025-01-15'),
    authorId: 'auth001',
    authorName: 'diy_life98',
    category: 'Database',
    tags: ['MongoDB', 'NoSQL', 'Database'],
    views: 1240,
    likes: 89,
    dislikes: 3,
    steps: [
      {
        stepNumber: 1,
        title: 'Install MongoDB Community Edition on your machine',
        text: 'Placeholder text',
        imageUrls: [],
        videoUrls: []
      },
      {
        stepNumber: 2,
        title: 'Start the MongoDB server using the mongod command',
        text: 'Placeholder text',
        imageUrls: [],
        videoUrls: []
      },
      {
        stepNumber: 3,
        title: 'Connect to MongoDB using the MongoDB shell',
        imageUrls: [],
        videoUrls: []
      }
    ],
    published: true
  },
  {
    title: 'Building a RESTful API with Node.js and Express',
    text: 'Create a complete RESTful API using Node.js and Express framework.',
    tutorialId: 'tut002',
    createdDate: new Date('2025-02-05'),
    updatedDate: new Date('2025-02-12'),
    authorId: 'auth002',
    authorName: 'quickFix01',
    category: 'Web Development',
    tags: ['Node.js', 'Express', 'API', 'JavaScript'],
    views: 985,
    likes: 127,
    dislikes: 5,
    steps: [
      {
        stepNumber: 1,
        title: 'Set up your Node.js project and install Express',
        text: 'Placeholder text',
        imageUrls: [],
        videoUrls: []
      },
      {
        stepNumber: 2,
        title: 'Create your first Express server',
        text: 'Placeholder text',
        imageUrls: [],
        videoUrls: []
      },
      {
        stepNumber: 3,
        title: 'Implement CRUD operations for your API',
        text: 'Placeholder text',
        imageUrls: ['crud_operations.jpg'],
        videoUrls: []
      },
      {
        stepNumber: 4,
        title: 'Add authentication to your API',
        text: 'Placeholder text',
        imageUrls: [],
        videoUrls: []
      }
    ],
    published: true
  },
  {
    title: 'Introduction to React Hooks',
    text: 'Learn how to use React Hooks to build dynamic user interfaces.',
    tutorialId: 'tut003',
    createdDate: new Date('2025-03-01'),
    updatedDate: new Date('2025-03-10'),
    authorId: 'auth001',
    authorName: 'diy_life98',
    category: 'Frontend',
    tags: ['React', 'JavaScript', 'Hooks', 'Frontend'],
    views: 1567,
    likes: 203,
    dislikes: 8,
    steps: [
      {
        stepNumber: 1,
        title: 'Understanding React Hooks and their benefits',
        text: 'Placeholder text',
        imageUrls: ['hooks_intro.jpg'],
        videoUrls: []
      },
      {
        stepNumber: 2,
        title: 'Using the useState Hook',
        text: 'Placeholder text',
        imageUrls: [],
        videoUrls: []
      },
      {
        stepNumber: 3,
        title: 'Using the useEffect Hook',
        text: 'Placeholder text',
        imageUrls: [],
        videoUrls: []
      },
      {
        stepNumber: 4,
        title: 'Creating custom Hooks',
        text: 'Placeholder text',
        imageUrls: [],
        videoUrls: []
      }
    ],
    published: true
  }
];

tutResult = tutorials.insertMany(tutorialList);

// Insert Comments
commentList = [
  {
    commentId: 'comm001',
    noteId: 'note001',
    userId: 'user001',
    text: 'Great tutorial! The step-by-step explanation made it easy to follow.',
    votesUp: 5,
    votesDown: 0,
    createdDate: new Date('2025-01-20')
  },
  {
    commentId: 'comm002',
    noteId: 'note001',
    userId: 'user002',
    text: "I'm having trouble with step 3. Could you provide more details on the connection string format?",
    votesUp: 2,
    votesDown: 0,
    createdDate: new Date('2025-01-21')
  },
  {
    commentId: 'comm003',
    noteId: 'note002',
    userId: 'auth001',
    text: 'Sure! The connection string format is: mongodb://localhost:27017/yourDatabaseName',
    votesUp: 8,
    votesDown: 0,
    createdDate: new Date('2025-01-21')
  },
  {
    commentId: 'comm004',
    noteId: 'note002',
    userId: 'user003',
    text: "I think there's a mistake in step 2. The command should be 'mongod --dbpath /path/to/data' to specify the data directory.",
    votesUp: 15,
    votesDown: 0,
    createdDate: new Date('2025-01-22')
  },
  {
    commentId: 'comm005',
    noteId: 'note003',
    userId: 'user004',
    text: 'Excellent tutorial on Express! I found the authentication section particularly helpful.',
    votesUp: 7,
    votesDown: 0,
    createdDate: new Date('2025-02-15')
  },
  {
    commentId: 'comm006',
    noteId: 'note002',
    userId: 'user005',
    text: 'This tutorial really helped me understand RESTful APIs. Thanks!',
    votesUp: 4,
    votesDown: 0,
    createdDate: new Date('2025-02-18')
  },
  {
    commentId: 'comm007',
    noteId: 'note002',
    userId: 'user006',
    text: 'The explanation of useEffect was very clear. I finally understand how to handle side effects properly!',
    votesUp: 9,
    votesDown: 0,
    createdDate: new Date('2025-03-12')
  },
  {
    commentId: 'comm008',
    noteId: 'note001',
    userId: 'user007',
    text: "I'd recommend adding a section on the useContext hook as well. It's quite important for state management.",
    votesUp: 12,
    votesDown: 0,
    createdDate: new Date('2025-03-15')
  }
];

comResult = comments.insertMany(commentList);

// Insert Community Notes
communityNoteList = [
  {
    noteId: 'note001',
    tutorialId: 'tut001',
    userId: 'user008',
    title: 'For MacOS users',
    text: 'Heads up: on macOS you may need to brew-services start mongodb before step 2.',
    votesUp: 14,
    votesDown: 1,
    createdDate: new Date('2025-01-18'),
    updatedDate: new Date('2025-01-19')
  },
  {
    noteId: 'note002',
    tutorialId: 'tut001',
    userId: 'user009',
    title: 'Suggesting JWT',
    text: 'In step 4, consider using JWT expiry of 1h instead of default 24h for better security.',
    votesUp: 9,
    votesDown: 0,
    createdDate:new Date('2025-02-13')
  },
  {
    noteId: 'note003',
    tutorialId: 'tut002',
    userId: 'user010',
    title: 'Request for a example/sandbox',
    text: 'It would be nice to show a code sandbox link for live editing of your custom Hooks example.',
    votesUp: 22,
    votesDown: 2,
    createdDate: new Date('2025-03-08'),
    updatedDate: new Date('2025-03-09')
  }
]

cnResult = communityNotes.insertMany(communityNoteList);

tutorials.createIndex({ tutorialId: 1 }, { unique: true });
tutorials.createIndex({ authorId: 1 });
tutorials.createIndex({ category: 1 });
tutorials.createIndex({ tags: 1 });
tutorials.createIndex({ published: 1 });

comments.createIndex({ tutorialId: 1 });
comments.createIndex({ userId: 1 });

communityNotes.createIndex({ noteId: 1 }, { unique: true })
communityNotes.createIndex({ tutorialId: 1 })
communityNotes.createIndex({ userId: 1 })