const UserModel = require("../models/userModel")
const PostModel = require("../models/postModel")

const getUserController = async (req, res) => {
    try {

        const { userName } = req.params
        const getUserProfile = await UserModel.findOne({userName}).select("-password")
        if(!getUserProfile){
            return res.json({
                ok : false
            })
        }
        const wonPost = await PostModel.find({user : getUserProfile._id}).populate('user').sort({createdAt:-1})
        res.json({...getUserProfile.toObject(), wonPost})

    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

module.exports = getUserController