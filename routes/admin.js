var express = require("express");
var Admin = require("../models/admin");
var router = express.Router();
const jwt = require("jsonwebtoken");
var router = express.Router();


//admin login
router.post("/login", function (req, res) {
  Admin.find({ email: req.body.email, password: req.body.password }).exec(
    function (err, user) {
      if (err) {
        res.status(500).json({ message: "error has occured", succes: false });
      } else {
        if (user.length) {
          const accessToken = jwt.sign(
            { name: user[0].name, id: user[0].id },
            "secret_key"
          );

          res.json({
            succes: true,
            message: "loggedin successfully",
            token: accessToken,
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


//admin registration
router.post("/register", function (req, res) {
  Admin.find({ email: req.body.email }).exec(function (err, user) {
    if (err) {
      res.status(500).json({ message: "error has occured", succes: false });
    } else {
      if (user.length && user[0].email) {
        res.status(200).json({ message: "user already exists", succes: false });
      } else {
        var newUser = new Admin();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        
   
     newUser.save(function (err, admin) {
          if (err) {
            res.status(500).send("error saving user");
          } else {
            console.log(admin);
            res
              .status(500)
              .json({ message: "successfully registered", succes: true });
          }
        });
      }
    }
  });
});
module.exports = router;

   