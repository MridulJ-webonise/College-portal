var express = require("express");
var router = express.Router();
const LoginController = require('../controllers/LoginController')

router.post("/", LoginController.userLogin);

module.exports = router;
