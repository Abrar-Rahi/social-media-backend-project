const express = require("express")
const router = express.Router()
const { uploadImageMiddlewire } = require("../../middlewire/uploadImageMiddlewire")
const { uploadImage,imageList } = require("../../controllers/uploadController")
const { authecticationUser } = require("../../middlewire/authentication")


router.post("/uploadImage", authecticationUser, uploadImageMiddlewire, uploadImage )
router.post("/imageList",authecticationUser,  imageList )


module.exports = router