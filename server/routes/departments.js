var express = require("express");
var router = express.Router();
const query = require("../services/db");

router.get("/", async function(req, res){
	let DepartmentObj = await query(`SELECT * FROM Departments;`);
	// let DepartmentName = DepartmentObj
	res.send(DepartmentObj);
})

router.post("/addDepartment", async function(req, res){
	let {Dept_ID, Name, HOD} = req.body;

	await query( `INSERT INTO Departments VALUES('${Dept_ID}','${Name}','${HOD}');` );
	res.send({
		message : 'Department added',
		newDepartment : req.body
	})
})

module.exports = router;
