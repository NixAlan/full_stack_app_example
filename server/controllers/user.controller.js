const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: (req, res) => {
    //use the req data and the user model constructor to create a user objet

    const user = new User(req.body);

    //info is already in the instance of THIS object. no need to pass anything in
    //save is instance method. doesn't require anything passed in
    //create is static and takes the object as the parameter

    user
      .save()
      .then((newUser) => {
        console.log(newUser);
        console.log("Successfully Registered");
        res.json({
          SuccessMessage: "Thank you for registering",
          user: newUser,
        });
      })
      .catch((err) => {
        console.log("register not successful");
        res.status(400).json(err);
      });
  },

  login: (req, res) => {
    User.findOne({ email: req.body.email })
      .then((userRecord) => {
        //check if this returned obj is null
        if (userRecord === null) {
          //email not found
          req.status(400).json({ message: "Invalid Login Attempt1" });
        } else {
          // email is found
          console.log("email is found");
          bcrypt
            .compare(req.body.password, userRecord.password) //salt both 10x ...return promise boolean t/f
            .then((isPasswordValid) => {
              if (isPasswordValid) {
                console.log("password is valid");
                res
                  .cookie(
                    "userToken",
                    jwt.sign(
                      {
                        //payload is data we want to save
                        id: userRecord._id,
                        email: userRecord.email,
                        username: userRecord.username,
                      },
                      //we need a key to sign and hash cookies data
                      //out payload needs a secret key, we will use a .env file to store such things privately,
                      //they will not be added to your public code. this privae key is one example.
                      //Another can be our db name, these can be used through our app using process.env.keyname
                      process.env.JWT_SECRET
                    ),
                    {
                      //configuration settings for this cookie (options)
                      //we will make sure these cookies are HTTPOnly, this means that the cookies are essentially
                      //invisible to client side JavaScript and can only be read by the server
                      httpOnly: true,
                      expires: new Date(Date.now() + 9000000),
                    }
                  )
                  .json({
                    message: "Succesfully loged in",
                    userLoggedIn: userRecord.username,
                    userID: userRecord._id,
                  });
              } else {
                res.status(400).json({
                  message: "Login and/or Email Invalid",
                });
              }
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({ message: "Invalid Attempt2" });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "Invalid Attempt3" });
      });
  },
  logout: (req, res) => {
    console.log("logging out");
    res.clearCookie("userToken");
    res.json({
      message: "You have successfully logged out",
    });
  },

  getOneUser: (req, res) => {
    User.findOne({ _id: req.params.id })
      .then((oneUser) => {
        console.log(oneUser);
        res.json(oneUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};
