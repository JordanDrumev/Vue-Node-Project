const db = require("../models");
const Users = db.users;

//Tests if email and password are valid inputs and returns a user if they are
exports.findOne = (req, res) => {
      const user_email = req.body.user_email;
      const user_password = req.body.user_password;
      const passRegEx = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d).{8,64}$/;
      const emailRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

      if (!emailRegEx.test(user_email)){
        res.send('Invalid Email');
        return;
      }

      if (!passRegEx.test(user_password)) {
        res.send('Invalid Password');
        return;
      }

      //If the 'Correct password' message is send the user is logged in
      Users.findOne({where: { user_email: user_email}})
      .then(data => {
          if (data ===  null) {
            res.send('Wrong User Email');
          } else if (user_password === data.user_password){
            res.send('Correct password');
          } else {
            res.send('Wrong password');
          }
      })
      .catch(err => {
        res.status(500).send({ 
          message: "Error retrieving user with email = " + user_email
        });
      });
};