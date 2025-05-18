# HowTo Website

1. Run and seed the Mongo database with sample data.
1. Build and run the Backend API.
1. Test the API calls to the database.

## Database setup guide

Starting from the `HowTo` directory, setup and run the Mongo database.

### Start the MongoDB Database

Select your operating system to start the MongoDB database:

<details>
<summary>Windows</summary>

```powershell
cd HowTo
# Run MongoDB database on Windows
. ./startDbServer.cmd
```

</details>

<details>
<summary>Linux/Mac</summary>

```bash
cd HowTo
# Make the script executable and run MongoDB database on Linux/Mac
chmod +x start.DbServer.sh
./start.DbServer.sh
```

</details>

### Connect and Populate the database

Open a new terminal and connect to the database using the database client.

Select your operating system to start the MongoDB client:

<details>
<summary>Windows</summary>

```powershell
cd HowTo
# Run database client on Windows
. ./startDbClient.admin.cmd
```

</details>

<details>
<summary>Linux/Mac</summary>

```bash
cd HowTo
# Run database client on Linux/Mac
mongo --port 3000 --authenticationDatabase admin
```

</details>

Once connected to the database, run the following commands to populate the demo data.

```bash
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

# Compile the node server and copy the pages to out/pages
npm run build

# Run node server on port 8080
npm run start
```

## Test API Guide

Test the API calls to the database.

Hifi Screen - [Home Page](http://localhost:8080/)

### Routes (To test in POSTMAN)

Tutorial - [GET all / POST](http://localhost:8080/app/tutorials) `/app/tutorial`

Tutorial - [GET by Id](http://localhost:8080/app/tutorials/{tutorialId}) `/app/tutorials/{tutorialId}`

Comments - [GET all / POST](http://localhost:8080/app/comments) `/app/comments`

Comments - [GET by Id](http://localhost:8080/app/comments/{commentId}) `/app/comments/{commentId}`

## Clean

```bash
rm -rf out
rm -rf node_modules
```
