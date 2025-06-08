// This script is used to create sample data for the MongoDB database.

db = db.getSiblingDB('tutorialPlatform')

db.createCollection('tutorials');
db.createCollection('comments');
db.createCollection('communityNotes');
db.createCollection('users');

tutorials = db.getCollection('tutorials');
comments = db.getCollection('comments');
communityNotes = db.getCollection('communityNotes')
users = db.getCollection('users')

// Clear data
tutorials.remove({})
comments.remove({});
communityNotes.remove({})
users.remove({})

user1Id = "ef4aadb592c248e49cd549990c46beb1"
user2Id = "885482f197274eacaffa125930df2c9e"
user3Id = "cdabe76a955e4843b81bbd1dad633bdc"
user4Id = "292dbe086cf34e449c5c38026f35f210"
user5Id = "d600ddfd3ac3425c994c999a9721d04d"

// users insert
userList = [
  {
    userId: user1Id,
    username: 'diy_life98',
    email: 'diy_life98@example.com',
    hashed_pwd: 'bmWd6qhYQs2rtcYwX8xAAzukN3LsANRcKjySF0Gl43c=', // 'mypassword123'
    createdDate: new Date('2025-02-07'),
    updatedDate: new Date('2025-02-12')
  },
  {
    userId: user2Id,
    username: 'quickFix01',
    email: 'quickfix@example.com',
    hashed_pwd: '++gWkkl9tUjlVQTNWFCvEJhb5Aa9iEzkFpie1cbag3I=', // 'fixitfast456'
    createdDate: new Date('2025-02-01'),
    updatedDate: new Date('2025-02-02')
  },
  { 
    userId: user3Id,
    username: 'techie_guru',
    email: 'guru@example.com',
    hashed_pwd: 'qPEc0+HsctOJa9B5y+nR1rHhAO5bMGq4mHkG6jZBYeI=', // 'gurupass789',
    createdDate: new Date('2024-12-29'),
    updatedDate: new Date('2025-01-23')
  },
  {
    userId: user4Id,
    username: 'code_master',
    email: 'codemaster@example.com',
    hashed_pwd: 'UpQVmiAESe39xvmzzfyuuTs2LEDqDDBD5KqBoPpMJ5c=', // 'mastercode007',
    createdDate: new Date('2024-11-05'),
    updatedDate: new Date('2025-04-07')
  },
  {
    userId: user5Id,
    username: 'frontend_queen',
    email: 'queen@example.com',
    hashed_pwd: 'oXcBK0C0xObzuh7ORdHKm6XELtZcUCRMHGXjqL35zAQ=', // 'frontend_queen',
    createdDate: new Date('2025-01-03'),
    updatedDate: new Date('2025-01-14')
  }
];

userResult = users.insertMany(userList);

// Insert Tutorials 
tutorialList = [
  {
    title: 'Getting Started with MongoDB',
    text: 'Learn the basics of MongoDB database operations and queries.',
    tutorialId: 'tut001',
    createdDate: new Date('2025-01-10'),
    updatedDate: new Date('2025-01-15'),
    authorId: user1Id,
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
    authorId: user2Id,
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
    authorId: user1Id,
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
    userId: user1Id,
    text: 'Great tutorial! The step-by-step explanation made it easy to follow.',
    votesUp: 5,
    votesDown: 0,
    createdDate: new Date('2025-01-20')
  },
  {
    commentId: 'comm002',
    noteId: 'note001',
    userId: user2Id,
    text: "I'm having trouble with step 3. Could you provide more details on the connection string format?",
    votesUp: 2,
    votesDown: 0,
    createdDate: new Date('2025-01-21')
  },
  {
    commentId: 'comm003',
    noteId: 'note002',
    userId: user3Id,
    text: 'Sure! The connection string format is: mongodb://localhost:27017/yourDatabaseName',
    votesUp: 8,
    votesDown: 0,
    createdDate: new Date('2025-01-21')
  },
  {
    commentId: 'comm004',
    noteId: 'note002',
    userId: user4Id,
    text: "I think there's a mistake in step 2. The command should be 'mongod --dbpath /path/to/data' to specify the data directory.",
    votesUp: 15,
    votesDown: 0,
    createdDate: new Date('2025-01-22')
  },
  {
    commentId: 'comm005',
    noteId: 'note003',
    userId: user5Id,
    text: 'Excellent tutorial on Express! I found the authentication section particularly helpful.',
    votesUp: 7,
    votesDown: 0,
    createdDate: new Date('2025-02-15')
  },
  {
    commentId: 'comm006',
    noteId: 'note002',
    userId: user1Id,
    text: 'This tutorial really helped me understand RESTful APIs. Thanks!',
    votesUp: 4,
    votesDown: 0,
    createdDate: new Date('2025-02-18')
  },
  {
    commentId: 'comm007',
    noteId: 'note002',
    userId: user3Id,
    text: 'The explanation of useEffect was very clear. I finally understand how to handle side effects properly!',
    votesUp: 9,
    votesDown: 0,
    createdDate: new Date('2025-03-12')
  },
  {
    commentId: 'comm008',
    noteId: 'note001',
    userId: user2Id,
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
    userId: user1Id,
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
    userId: user5Id,
    title: 'Suggesting JWT',
    text: 'In step 4, consider using JWT expiry of 1h instead of default 24h for better security.',
    votesUp: 9,
    votesDown: 0,
    createdDate: new Date('2025-02-13')
  },
  {
    noteId: 'note003',
    tutorialId: 'tut002',
    userId: user4Id,
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

users.createIndex({ userId: 1 }, { unique: true });
users.createIndex({ username: 1 }, { unique: true });