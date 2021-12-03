var express = require("express");
var router = express.Router();
const auth = require('../middleware/auth')
// const {getAllUsers, addUser, deleteUser} = require('../controllers/UserController')
const UserController = require('../controllers/UserController')


/* GET users listing. */
router.get("/", auth, UserController.getAllUsers);

router.get('/byDept/:deptName', auth, UserController.getStudentByDepartment)

router.post("/addUser", auth, UserController.addUser);

router.delete("/:id", auth, UserController.deleteUser);

module.exports = router;
