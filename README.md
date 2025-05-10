HowTo Website - Backend API and DB test instructions:

* Step 0: Navigate into the HowTo directory and create db directory if it does not exist
    > cd HowTo
    > mkdir db

* Step 1: Run MongoDB database:
    - For Windows (bash)
    > mongod --port 3000 --dbpath=".\db" 

    - For Mac (zsh)
    > mongod --port 3000 --dbpath= ./db

* Step 2: Install Node
    > npm install

* Step 3: Seed the database with population data
    > node createDb/createSampleData.js

* Step 4: Compile and generate node/express server
    > npx tsc AppServer.ts

* Step 5: Run node server on port 8080
    > node AppServer.js

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