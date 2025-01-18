const express = require("express")
const router = express.Router()
const {authecticationUser} = require("../../middlewire/authentication")
const { createPost, allPost, comment, savePost, removePost } = require("../../controllers/postController")


router.post("/createPost", authecticationUser ,createPost )
router.get("/allPostData" ,authecticationUser,  allPost)
router.put("/comment" ,authecticationUser,  comment)
router.put("/savePost/:id" ,authecticationUser,  savePost)
router.delete("/removePost/:id" ,authecticationUser,  removePost)


module.exports = router