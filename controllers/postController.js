const PostModel = require("../models/postModel")



exports.createPost = async (req,res)=>{
 try {
    const post = await new PostModel(req.body).save()
    res.json(post)
    
 } catch (error) {
    res.status(401).json({
        message: error.message 
    })
 }
}


exports.allPost = async (req,res)=>{
 try {
    const allPost = await PostModel.find().populate("user", "profilePicture coverPicture fName lName userName").sort({createdAt : -1})
    res.json(allPost)
    
 } catch (error) {
    res.status(401).json({
        message: error.message 
    })
 }
}