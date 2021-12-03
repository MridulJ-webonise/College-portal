const query = require("../services/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const userLogin = async(req, res)=> {
  const { email, password } = req.body;

  const userObj = await query(`Select * from Users where Email=?`, [email]);

  if (userObj.length == 0) {
    res.json({ msg: "User not found" });
  } else {
    if (!bcrypt.compareSync(password, userObj[0].Password)) {
      res.json({
        msg: "Wrong Password",
      });
    }

    jwt.sign(
      {
        email: userObj[0].Email,
        Student_ID: userObj[0].Student_ID,
        userType: userObj[0].UserType,
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
  }
}

module.exports = {
  userLogin
}
