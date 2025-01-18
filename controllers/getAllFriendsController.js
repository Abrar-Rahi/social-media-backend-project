const userModel = require('../models/userModel');


const getAllFriendsController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("friends request").populate("friends", "fName lName userName profilePicture").populate("request", "fName lName userName profilePicture");

        // if user sent request part
        const userSentRequest = await userModel.find({
            request: req.user.id
        }).select("fName lName profilePicture userName");

        res.json({
            friends: user.friends,
            request: user.request,
            sentRequest : userSentRequest
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

module.exports = getAllFriendsController