
const userModel = require('../models/userModel');




const unFollowController = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            let sender = await userModel.findById(req.user.id);
            let receiver = await userModel.findById(req.params.id);

            if (
                receiver.followers.includes(sender._id) &&
                sender.following.includes(receiver._id)
            ) {
                await receiver.updateOne({
                    $pull: { followers: sender._id }
                });

                await sender.updateOne({
                    $pull: { following: receiver._id }
                });

                res.json({ message: "Successfully unfollowed" });
            }else{
                return res.json({message: " already unfollowed"})
            }
        }else{
            return res.json({message: "You can Not unfollowed Yourself"})
        }


    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

module.exports = unFollowController