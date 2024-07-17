const express = require("express")
const router = express.Router()
const {authecticationUser} = require("../../middlewire/authentication")
const { createPost } = require("../../controllers/postController")


router.post("/createPost", createPost )


module.exports = router