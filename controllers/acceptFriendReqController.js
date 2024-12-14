
const userModel = require('../models/userModel');




const acceptFriendReqController = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            let receiver = await userModel.findById(req.user.id);
            let sender = await userModel.findById(req.params.id);
        
            if (receiver.request.includes(sender._id)) {
                await receiver.updateOne({
                    $push: { friends: sender._id, following: sender._id }
                });
        
                await sender.updateOne({
                    $push: { friends: receiver._id, followers: receiver._id }
                });
        
                await receiver.updateOne({
                    $pull: { request: sender._id }
                });
        
                res.json({ message: "accept friend request" });
            } else {
                return res.json({ message: "Already friends" });
            }
        } else {
            return res.json({
                message: "You can't accept request to yourself"
            });
        }
        


    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

module.exports = acceptFriendReqController