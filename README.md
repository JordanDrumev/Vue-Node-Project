# Vue-Node-Project
A project with a front-end build with Vue.js, back-end with Node.js and a mySQL database

How to run:

1. Import the two tables that are in the form of sql files from the database-business folder into a mySQL database;

2. Create a .env file in the node-business folder with the contents:
HOST=localhost
USER=your_database_user_name
PASSWORD=your_database_password
DB=your_database

3. Run "npm install" in the directory of node-business to install the required dependencies;
4. Run "node server" to start the back-end;
5. Run "npm install" in the directory of vue-business to install the required dependencies;
6. Run "npm run serve" to start the front-end;
