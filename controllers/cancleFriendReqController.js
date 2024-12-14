
const userModel = require('../models/userModel');




const cancleFriendReqController = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            let sender = await userModel.findById(req.user.id);
            let receiver = await userModel.findById(req.params.id);

            if (
                !receiver.friends.includes(sender._id) &&
                receiver.request.includes(sender._id)
            ) {
                await receiver.updateOne({
                    $pull: { request: sender._id }
                });

                await receiver.updateOne({
                    $pull: { followers: sender._id }
                });

                await sender.updateOne({
                    $pull: { following: receiver._id }
                });

                res.json({ message: "Friend request cancel" });
            }else{
                return res.json({message: "Friend request already canceled"})
            }
        }else{
            return res.json({message: "You can Not cencel friend Request Yourself"})
        }


    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

module.exports = cancleFriendReqController