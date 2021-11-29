var express = require("express");
var router = express.Router();
const query = require("../services/db");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const auth = require('../middleware/auth')

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const userList = await query("SELECT * FROM Students;");
  res.json(userList);
});

router.post("/addUser", async function (req, res) {
  const { Name, Phone_Number, Department, UserType } = req.body;
  const newUser = req.body;

  let queryResult = await query(
    `INSERT INTO Students(Name,Phone_Number) VALUES('${Name}','${Phone_Number}');`
  );
  
  // let StudentIDobj = await query(
  //   `SELECT Student_ID FROM Students WHERE Email='${Email}';`
  // );

  let StudentID = queryResult.insertId;
  const createdEmail = Name.toLowerCase() +"."+StudentID+ "@gmail.com";
  const createdPassword = Name.toLowerCase() + StudentID+ ".123";
  const hash = bcrypt.hashSync(createdPassword, saltRounds);

  await query(
    `INSERT INTO Users VALUES('${Name}','${createdEmail}','${hash}','${UserType}','${StudentID}');`
  );

  for( let dept of Department ){
    let DeptID = await query(
      `SELECT Dept_ID FROM Departments WHERE Name='${dept}';`
    );
    await query(`INSERT INTO Student_Dept VALUES('${DeptID[0].Dept_ID}','${StudentID}');`);
  }
  
  res.send({
    msg: 'User added Succesfully !',
    newUser,
  });
});

router.delete("/", async function(req, res){

  let {Student_ID} = req.body;

  await query(`DELETE FROM Student_Dept where Student_ID = ${Student_ID}`)
  await query(`DELETE FROM Users where Student_ID = ${Student_ID}`)
  await query(`DELETE FROM Students where Student_ID = ${Student_ID}`)

  req.send({
    msg : 'User Deleted'
  })
})



module.exports = router;
