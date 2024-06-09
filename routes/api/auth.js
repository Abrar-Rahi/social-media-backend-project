const express = require("express")
const router = express.Router()
const userController = require("../../controllers/userController")
const varificationController = require("../../controllers/varificationController")
const loginController = require("../../controllers/loginController")


router.post("/", userController )
router.post("/varification", varificationController )
router.post("/login", loginController )

module.exports = router