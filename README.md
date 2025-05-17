# HowTo Website

1. Run and seed the Mongo database with sample data.
1. Build and run the Backend API.
1. Test the API calls to the database.

## Database setup guide

Starting from the `repository root` directory, setup and run the Mongo database.

### Start the MongoDB Database

Select your operating system to start the MongoDB database:

<details>
<summary>Windows</summary>

Run MongoDB database on Windows.

```powershell
. ./startDbServer.cmd
```

</details>

<details>
<summary>Linux/Mac</summary>

Make the script executable and run MongoDB database on Linux/Mac.

```bash
chmod +x start.DbServer.sh
./start.DbServer.sh
```

</details>

### Connect and Populate the database

Open a new terminal and connect to the database using the database client.

Select your operating system to start the MongoDB client:

<details>
<summary>Windows</summary>

Run the database client on Windows.

```powershell
. ./startDbClient.admin.cmd
```

</details>

<details>
<summary>Linux/Mac</summary>

Run the database client on Linux/Mac.

```bash
mongo --port 3000 --authenticationDatabase admin
```

</details>

Once connected to the database, run the following commands to populate the demo data.

```bash
load ('src/createDB/createSampleData.js');

show dbs
use tutorialPlatform
show collections
db.tutorials.find()
db.comments.find()

load ('src/createDB/createAdminUser.js');
show users
exit
```

## Backend API

Starting from the `repository root` directory, install npm packages, compile the node server, run the unit tests, and run the node server.

### Build

The following commands installs the npm packages, then compiles the node server and copy the pages to out/src/pages.

```bash
npm install

npm run build
```

### Run Unit Test

To run the unit tests, this step assumes the npm packages were installed using `npm install` in the previous step.

```bash
npm test
```

### Run the Server

The following command runs the node server on port 8080.

```bash
npm run start
```

## Test API Guide

Test the API calls to the database.

Hifi Screen - [Home Page](http://localhost:8080/)

### Routes (To test in POSTMAN)

Tutorial - [GET all / POST](http://localhost:8080/app/tutorials) - `/app/tutorials`

Tutorial - [GET by Id](http://localhost:8080/app/tutorials/{tutorialId}) - `/app/tutorials/{tutorialId}`

Comments - [GET all / POST](http://localhost:8080/app/comments) - `/app/comments`

Comments - [GET by Id](http://localhost:8080/app/comments/{commentId}) - `/app/comments/{commentId}`

## Clean

The following command removes the database files, the node_modules directory, and the compiled node server.

```bash
npm run clean
```

## Project Structure

The HowTo project uses a standard Node.js project structure for a REST API. Since there is only one project, the project root is also the repository root.

```text
project-root/
├── node_modules/
├── out/ (The compiled server runs from the out directory.)
│   ├── src/
│       ├── pages/
│       ├── App.js
│       ├── AppServer.js
├── src/
│   ├── controllers/
│       ├── example.controller.ts
│   ├── models/
│       ├── example.model.ts
│   ├── routes/
│       ├── example.route.ts
│   ├── services/
│       ├── example.service.ts
│   ├── app.ts
│   └── server.ts
├── test/
│   ├── unit/
│   └── integration/
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```
