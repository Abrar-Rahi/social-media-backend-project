
const userModel = require('../models/userModel');




const unFriendController = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            let sender = await userModel.findById(req.user.id);
            let receiver = await userModel.findById(req.params.id);
        
            if (
                receiver.friends.includes(sender._id) &&
                sender.friends.includes(receiver._id)
            ) {
                await receiver.updateOne({
                    $pull: { friends: sender._id, following: sender._id, followers: sender._id }
                });
        
                await sender.updateOne({
                    $pull: { friends: receiver._id, following: receiver._id, followers: receiver._id }
                });
        
                res.json({ message: "Unfriend" });
            } else {
                return res.json({ message: "Already unfriend" });
            }
        } else {
            return res.json({
                message: "You can't unfriend yourself"
            });
        }
        


    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

module.exports = unFriendController