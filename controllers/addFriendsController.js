
const userModel = require('../models/userModel');




const addFriendsController = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            let sender = await userModel.findById(req.user.id);
            let receiver = await userModel.findById(req.params.id);

            if (
                !receiver.friends.includes(sender._id) &&
                !receiver.request.includes(sender._id)
            ) {
                await receiver.updateOne({
                    $push: { request: sender._id }
                });

                await receiver.updateOne({
                    $push: { followers: sender._id }
                });

                await sender.updateOne({
                    $push: { following: receiver._id }
                });

                res.json({ message: "Friend request has been sent" });
            }else{
                return res.json({message: "Friend already Exist"})
            }
        }else{
            return res.json({message: "You can Not Send Request Yourself"})
        }


    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

module.exports = addFriendsController