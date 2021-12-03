const query = require("../services/db");

const getAllDepts = async (req, res)=>{
	let DepartmentObj = await query(`SELECT * FROM Departments;`);
	// let DepartmentName = DepartmentObj
	res.send(DepartmentObj);
}

const addDept = async (req, res)=>{
	let {Dept_ID, Name, HOD} = req.body;

	await query( `INSERT INTO Departments VALUES('${Dept_ID}','${Name}','${HOD}');` );
	res.send({
		msg : 'Department added',
		newDepartment : req.body
	})
}

const editDept = async (req, res)=>{
	let { Dept_ID, Name, HOD} = req.body;

	await query( `Update Departments Set Name='${Name}', HOD='${HOD}' where Dept_ID='${Dept_ID}' ` );
	res.send({
		msg : 'Update successfull',
	})
}

module.exports = {
  getAllDepts,
  addDept,
  editDept
}
