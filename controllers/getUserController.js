const UserModel = require("../models/userModel")
const PostModel = require("../models/postModel")

const getUserController = async (req, res) => {
    try {

        const { userName } = req.params
        const user = await UserModel.findById(req.user.id)
        
        const getUserProfile = await UserModel.findOne({userName}).select("-password")

        const friendShip = {
            friend: false,
            following: false,
            request: false,
            requestReceived: false
          };

        if(!getUserProfile){
            return res.json({
                ok : false
            })
        }

        if (user.friends.includes(getUserProfile._id) && getUserProfile.friends.includes(user._id)) {
            friendShip.friend = true;
        }
        if (user.following.includes(getUserProfile._id)) {
            friendShip.following = true;
        }
        if (getUserProfile.request.includes(user._id)) {
            friendShip.request = true;
        }
        if (user.request.includes(getUserProfile._id)) {
            friendShip.requestReceived = true;
        }


        const wonPost = await PostModel.find({user : getUserProfile._id}).populate('user').populate("comments.commentedBy", "profilePicture userName fName lName").sort({createdAt:-1})

        
        await getUserProfile.populate("friends", "fName lName userName profilePicture")
        
        res.json({...getUserProfile.toObject(), wonPost, friendShip})
        

    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

module.exports = getUserController