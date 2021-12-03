const query = require('../services/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getAllUsers = async (req, res) => {
  const userList = await query('SELECT * FROM Students;');
  res.json(userList);
};

const getStudentByDepartment = async (req, res) => {
  let deptName = req.params.deptName;

  const deptId = await query(`SELECT Dept_ID from Departments where Name='${deptName}' `);

  const userList = await query(
    `SELECT S.Name, S.Phone_Number from Students as S INNER JOIN Student_Dept as SD on S.Student_ID = SD.Student_ID where SD.Dept_ID = ${deptId[0].Dept_ID};`
  );

  res.json(userList);
};

const addUser = async (req, res) => {
  const { Name, Phone_Number, Department, UserType } = req.body;
  const newUser = req.body;
  let queryResult = await query(`INSERT INTO Students(Name,Phone_Number) VALUES('${Name}','${Phone_Number}');`);

  // let StudentIDobj = await query(
  //   `SELECT Student_ID FROM Students WHERE Email='${Email}';`
  // );

  let StudentID = queryResult.insertId;
  const createdEmail = Name.toLowerCase() + '.' + StudentID + '@gmail.com';
  const createdPassword = Name.toLowerCase() + StudentID + '.123';
  const hash = bcrypt.hashSync(createdPassword, saltRounds);

  await query(`INSERT INTO Users VALUES('${Name}','${createdEmail}','${hash}','${UserType}','${StudentID}');`);

  for (let dept of Department) {
    let DeptID = await query(`SELECT Dept_ID FROM Departments WHERE Name='${dept}';`);
    await query(`INSERT INTO Student_Dept VALUES('${DeptID[0].Dept_ID}','${StudentID}');`);
  }

  res.send({
    msg: 'User added Succesfully !',
    newUser,
  });
};

const deleteUser = async (req, res) => {
  let Student_ID = req.params.id;

  await query(`DELETE FROM Student_Dept where Student_ID = ${Student_ID}`);
  await query(`DELETE FROM Users where Student_ID = ${Student_ID}`);
  await query(`DELETE FROM Students where Student_ID = ${Student_ID}`);

  res.send({
    msg: 'User Deleted',
  });
};

module.exports = {
  getAllUsers,
  addUser,
  deleteUser,
  getStudentByDepartment
};
