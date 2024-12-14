
const userModel = require('../models/userModel');




const followController = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            let sender = await userModel.findById(req.user.id);
            let receiver = await userModel.findById(req.params.id);

            if (
                !receiver.followers.includes(sender._id) &&
                !sender.following.includes(receiver._id)
            ) {
                await receiver.updateOne({
                    $push: { followers: sender._id }
                });

                await sender.updateOne({
                    $push: { following: receiver._id }
                });

                res.json({ message: "Successfully followed" });
            }else{
                return res.json({message: " already followed"})
            }
        }else{
            return res.json({message: "You can Not followed Yourself"})
        }


    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

module.exports = followController