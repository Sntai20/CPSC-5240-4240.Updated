require('dotenv').config();
const { MongoClient } = require('mongodb');

const {
  DB_USER: user = '',
  DB_PASSWORD: rawPass = '',
  DB_INFO: info = '',
} = process.env;

const pass = encodeURIComponent(rawPass);
const cred = user ? `${user}:${pass}@` : '';
const uri = `mongodb://${cred}${info}`;

async function seed() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('tutorialPlatform');

    // Ensure collections existance
    await db.createCollection('tutorials').catch(() => {});
    await db.createCollection('comments').catch(() => {});

    const tutorials = db.collection('tutorials');
    const comments  = db.collection('comments');

    // Clear data
    await tutorials.deleteMany({});
    await comments.deleteMany({});

    // Insert Tutorials 
    const tutorialList = [
      {
        title: 'Getting Started with MongoDB',
        description: 'Learn the basics of MongoDB database operations and queries.',
        tutorialId: 'tut001',
        createdDate: new Date('2025-01-10'),
        updatedDate: new Date('2025-01-15'),
        authorId: 'auth001',
        authorName: 'John Smith',
        category: 'Database',
        tags: ['MongoDB', 'NoSQL', 'Database'],
        views: 1240,
        likes: 89,
        dislikes: 3,
        steps: [
          {
            stepNumber: 1,
            description: 'Install MongoDB Community Edition on your machine',
            imageUrls: ['mongodb_install.jpg'],
            videoUrls: []
          },
          {
            stepNumber: 2,
            description: 'Start the MongoDB server using the mongod command',
            imageUrls: ['mongodb_start.jpg'],
            videoUrls: []
          },
          {
            stepNumber: 3,
            description: 'Connect to MongoDB using the MongoDB shell',
            imageUrls: ['mongodb_connect.jpg'],
            videoUrls: ['mongodb_connection_video.mp4']
          }
        ],
        published: true
      },
      {
        title: 'Building a RESTful API with Node.js and Express',
        description: 'Create a complete RESTful API using Node.js and Express framework.',
        tutorialId: 'tut002',
        createdDate: new Date('2025-02-05'),
        updatedDate: new Date('2025-02-12'),
        authorId: 'auth002',
        authorName: 'Sarah Johnson',
        category: 'Web Development',
        tags: ['Node.js', 'Express', 'API', 'JavaScript'],
        views: 985,
        likes: 127,
        dislikes: 5,
        steps: [
          {
            stepNumber: 1,
            description: 'Set up your Node.js project and install Express',
            imageUrls: ['node_setup.jpg'],
            videoUrls: []
          },
          {
            stepNumber: 2,
            description: 'Create your first Express server',
            imageUrls: ['express_server.jpg'],
            videoUrls: []
          },
          {
            stepNumber: 3,
            description: 'Implement CRUD operations for your API',
            imageUrls: ['crud_operations.jpg'],
            videoUrls: ['express_crud_video.mp4']
          },
          {
            stepNumber: 4,
            description: 'Add authentication to your API',
            imageUrls: ['api_auth.jpg'],
            videoUrls: []
          }
        ],
        published: true
      },
      {
        title: 'Introduction to React Hooks',
        description: 'Learn how to use React Hooks to build dynamic user interfaces.',
        tutorialId: 'tut003',
        createdDate: new Date('2025-03-01'),
        updatedDate: new Date('2025-03-10'),
        authorId: 'auth001',
        authorName: 'John Smith',
        category: 'Frontend',
        tags: ['React', 'JavaScript', 'Hooks', 'Frontend'],
        views: 1567,
        likes: 203,
        dislikes: 8,
        steps: [
          {
            stepNumber: 1,
            description: 'Understanding React Hooks and their benefits',
            imageUrls: ['hooks_intro.jpg'],
            videoUrls: []
          },
          {
            stepNumber: 2,
            description: 'Using the useState Hook',
            imageUrls: ['usestate_hook.jpg'],
            videoUrls: ['usestate_demo.mp4']
          },
          {
            stepNumber: 3,
            description: 'Using the useEffect Hook',
            imageUrls: ['useeffect_hook.jpg'],
            videoUrls: []
          },
          {
            stepNumber: 4,
            description: 'Creating custom Hooks',
            imageUrls: ['custom_hooks.jpg'],
            videoUrls: []
          }
        ],
        published: true
      }
    ];

    const tutResult = await tutorials.insertMany(tutorialList);
    console.log(`Inserted ${tutResult.insertedCount} tutorials`);

    // Insert Comments
    const commentList = [
      {
        commentId: 'comm001',
        noteId: 'tut001',
        userId: 'user001',
        text: 'Great tutorial! The step-by-step explanation made it easy to follow.',
        votesUp: 5,
        votesDown: 0,
        createdDate: new Date('2025-01-20')
      },
      {
        commentId: 'comm002',
        noteId: 'tut001',
        userId: 'user002',
        text: "I'm having trouble with step 3. Could you provide more details on the connection string format?",
        votesUp: 2,
        votesDown: 0,
        createdDate: new Date('2025-01-21')
      },
      {
        commentId: 'comm003',
        noteId: 'tut001',
        userId: 'auth001',
        text: 'Sure! The connection string format is: mongodb://localhost:27017/yourDatabaseName',
        votesUp: 8,
        votesDown: 0,
        createdDate: new Date('2025-01-21')
      },
      {
        commentId: 'comm004',
        noteId: 'tut001',
        userId: 'user003',
        text: "I think there's a mistake in step 2. The command should be 'mongod --dbpath /path/to/data' to specify the data directory.",
        votesUp: 15,
        votesDown: 0,
        createdDate: new Date('2025-01-22')
      },
      {
        commentId: 'comm005',
        noteId: 'tut002',
        userId: 'user004',
        text: 'Excellent tutorial on Express! I found the authentication section particularly helpful.',
        votesUp: 7,
        votesDown: 0,
        createdDate: new Date('2025-02-15')
      },
      {
        commentId: 'comm006',
        noteId: 'tut002',
        userId: 'user005',
        text: 'This tutorial really helped me understand RESTful APIs. Thanks!',
        votesUp: 4,
        votesDown: 0,
        createdDate: new Date('2025-02-18')
      },
      {
        commentId: 'comm007',
        noteId: 'tut003',
        userId: 'user006',
        text: 'The explanation of useEffect was very clear. I finally understand how to handle side effects properly!',
        votesUp: 9,
        votesDown: 0,
        createdDate: new Date('2025-03-12')
      },
      {
        commentId: 'comm008',
        noteId: 'tut003',
        userId: 'user007',
        text: "I'd recommend adding a section on the useContext hook as well. It's quite important for state management.",
        votesUp: 12,
        votesDown: 0,
        createdDate: new Date('2025-03-15')
      }
    ];
    

    const comResult = await comments.insertMany(commentList);
    console.log(`Inserted ${comResult.insertedCount} comments`);

    await tutorials.createIndex({ tutorialId: 1 }, { unique: true });
    await tutorials.createIndex({ authorId: 1 });
    await tutorials.createIndex({ category: 1 });
    await tutorials.createIndex({ tags: 1 });
    await tutorials.createIndex({ published: 1 });

    await comments.createIndex({ tutorialId: 1 });
    await comments.createIndex({ userId: 1 });
    await comments.createIndex({ parentCommentId: 1 });
    await comments.createIndex({ isAmendment: 1 });

    console.log('Indexes created');
    console.log('Seeding complete');
    await client.close();
  } catch (err) {
    console.error('Seeding failed:', err);
    await client.close();
    process.exit(1);
  }
}

seed();