# HowTo Website

1. Setup and run the Mongo database.
    1. Seed the database with the population data.
1. Build and run the Backend API on port 8080.
1. Test the API calls to the database.

## Database setup guide

Starting from the `HowTo` directory, setup and run the Mongo database.

```bash
# Navigate into the HowTo directory and create db directory if it does not exist.
cd HowTo
mkdir out//db

# Run MongoDB database
. ./startDbServer.cmd
```

### Populate the database

Open a new terminal and connect to the database using the database client. Once connected to the database, run the following commands to populate the demo data.

```bash
. ./startDbClient.admin.cmd
load ('createDB/createSampleData.js');

show dbs
use tutorialPlatform
show collections
db.tutorials.find()
db.comments.find()

load ('createDB/createAdminUser.js');
show users
exit
```

## Backend API build and run

Starting from the `HowTo` directory, install npm packages, compile the node server, and run the node server.

```bash
cd HowTo

# Install the npm packages
npm install

# Compile the node server
npx tsc

# Run node server on port 8080
node AppServer.js
```

## Test API Guide

Test the API calls to the database.

Hifi Screen - Home Page
> http://localhost:8080/

Routes (To test in POSTMAN):
Tutorial - GET all / POST
> http://localhost:8080/app/tutorials

Tutorial - GET by ID
> http://localhost:8080/app/tutorials/{tutorialId}

Comments - GET all / POST
> http://localhost:8080/app/comments

Comments - GET by ID
> http://localhost:8080/app/comments/{commentID}
