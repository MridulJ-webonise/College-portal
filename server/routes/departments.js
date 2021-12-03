var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth")
const DeptController = require("../controllers/DeptController")

router.get("/", auth, DeptController.getAllDepts)

router.post("/addDepartment", auth, DeptController.addDept)

router.put("/editDepartment/:id", auth, DeptController.editDept)

module.exports = router;
