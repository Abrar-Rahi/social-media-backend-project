const express = require("express")
const router = express.Router()
const {authecticationUser} = require("../../middlewire/authentication")
const { createPost, allPost, comment, savePost } = require("../../controllers/postController")


router.post("/createPost", authecticationUser ,createPost )
router.get("/allPostData" ,authecticationUser,  allPost)
router.put("/comment" ,authecticationUser,  comment)
router.put("/savePost/:id" ,authecticationUser,  savePost)


module.exports = router