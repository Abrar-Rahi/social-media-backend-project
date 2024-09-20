const express = require("express")
const router = express.Router()
const { uploadImageMiddlewire } = require("../../middlewire/uploadImageMiddlewire")
const { uploadImage } = require("../../controllers/uploadController")


router.post("/uploadImage", uploadImageMiddlewire, uploadImage )


module.exports = router