var express = require("express");
var User = require("../models/user");
const jwt = require("jsonwebtoken");
var router = express.Router();


//user login
router.post("/login", function (req, res) {
  User.find({ email: req.body.email, password: req.body.password }).exec(
    function (err, user) {
      if (err) {
        res.status(500).json({ message: "error has occured", succes: false });
      } else {
        if (user.length && user[0].email) {
          const accessToken = jwt.sign(
            { id: user[0].id, email: user[0].email },
            "secret_key"
          );

          res.json({
            success: true,
            message: "loggedin successfully",
            order:user[0].order,
            name:user[0].name
          });
        } else {
          res
            .status(200)
            .json({ message: "user does not exists", success: false });
        }
      }
    }
  );
});

//User registration

router.post("/register", function (req, res) {
  User.find({ email: req.body.email }).exec(function (err, user) {
    if (err) {
      res.status(500).json({ message: "error has occured", succes: false });
    } else {
      if (user.length && user[0].email) {
        res.status(200).json({ message: "user already exists", succes: false });
      } else {
        var newUser = new User();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.save(function (err, user) {
              if (err) {
                res.status(500).send("error saving user");
              } 
                res
                  .status(200)
                  .json({ message: "successfully registered", success: true });
              
            });
          }
    }
  });
});
module.exports = router;

   

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2RkZjA4MzU4OWVjMTdmOWZiYjI2NCIsImVtYWlsIjoibWFuYXN2aUBnbWFpbC5jb20iLCJpYXQiOjE1OTc4OTA4ODN9.1BotCa5GY8zJO8ksY8i1mLgynYnf2qi5UL-fLs08M7w