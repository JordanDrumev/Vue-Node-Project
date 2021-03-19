module.exports = app => {
    const users = require("../controllers/user.controller");

    let router = require("express").Router();

    // Retrieve a single user with user_email
    router.post("/", users.findOne);
    
    app.use('/api/users', router);
}