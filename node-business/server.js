const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const app = express();

//sets up cors
let corsOptions = {
    origin: "http://localhost:8081"
  };
  
  //uses the cors middleware
  app.use(cors(corsOptions));
  
  app.use(bodyParser.json());
  
  app.use(bodyParser.urlencoded({ extended: true }));

  //Synchronizes the models with the tables or creates one if they don't exist
  const db = require('./models');
  db.sequelize.sync();


  //Gets the routes for employee and user HTTP methods
  require('./routes/employees.routes')(app);

  require('./routes/users.routes')(app);

  const PORT = process.env.PORT || 8080;
  
  //Listens on the specified Port
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });