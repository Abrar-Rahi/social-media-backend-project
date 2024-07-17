const express = require("express")
const router = express.Router()
const userController = require("../../controllers/userController")
const varificationController = require("../../controllers/varificationController")
const reVarificationController = require("../../controllers/reVarificationController")
const loginController = require("../../controllers/loginController")
const {authecticationUser} = require("../../middlewire/authentication")
const resetPassController = require("../../controllers/resetPassController")
const resetCodeSendController = require("../../controllers/resetCodeSendController")
const resetCodeVerify = require("../../controllers/resetCodeVerify")
const changePasswordController = require("../../controllers/changePasswordController")


router.post("/", userController )
router.post("/varification", authecticationUser , varificationController )
router.post("/reVarification", authecticationUser , reVarificationController )
router.post("/login", loginController )
router.post("/resetPassword", resetPassController )
router.post("/resetCode", resetCodeSendController )
router.post("/resetCodeVerify", resetCodeVerify )
router.post("/changePassword", changePasswordController )


module.exports = router