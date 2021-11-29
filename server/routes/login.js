var express = require("express");
var router = express.Router();
const query = require("../services/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/", async function (req, res) {
  const { email, password } = req.body;

  const userObj = await query(`Select * from Users where Email=?`, [email]);

  if (userObj.length == 0) {
    res.Status(404).json({ msg: "User not found" });
  } else {
    if (!bcrypt.compareSync(password, userObj[0].Password)) {
      res.Status(401).json({
        msg: "Wrong Password",
      });
    }

    jwt.sign(
      {
        email: userObj[0].Email,
        Student_ID: userObj[0].Student_ID,
        userType: userObj[0].userType,
      },
      config.get("jwtSecretKey"),
      (err, token) => {
        if (err) throw err;

        res.json({
          token,
          user: {
            Student_ID: userObj[0].Student_ID,
            userType: userObj[0].UserType,
            email: userObj[0].Email,
          },
        });
      }
    );

    // res.redirect("../users");
  }
});

module.exports = router;
