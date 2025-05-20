#!/bin/bash
# This script starts a MongoDB server on port 3000 with the database files stored in the "out/db" directory.
# Usage:
# Make the script executable and run it:
# chmod +x startDbServer startDbServer.sh
# ./startDbServer.sh

DB_PATH="out/db"

if [ ! -d "$DB_PATH" ]; then
    mkdir -p "$DB_PATH"
fi

mongod --port 3000 --dbpath "$DB_PATH"