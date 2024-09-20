const express = require("express")
const router = express.Router()
const {authecticationUser} = require("../../middlewire/authentication")
const { createPost, allPost } = require("../../controllers/postController")


router.post("/createPost", authecticationUser ,createPost )
router.get("/allPostData" ,authecticationUser,  allPost)


module.exports = router