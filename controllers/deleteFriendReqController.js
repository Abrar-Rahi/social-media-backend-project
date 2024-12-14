
const userModel = require('../models/userModel');




const deleteFriendReqController = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            let receiver = await userModel.findById(req.user.id);
            let sender = await userModel.findById(req.params.id);
          
            if (receiver.request.includes(sender._id)) {
              await receiver.updateOne({
                $pull: { request: sender._id, followers: sender._id },
              });
          
              await sender.updateOne({
                $pull: { following: receiver._id },
              });
          
              res.json({ message: "Request deleted" });
            } else {
              return res.json({ message: "Already deleted" });
            }
          } else {
            return res.json({
              message: "You can't delete the request yourself",
            });
          }
          

    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

module.exports = deleteFriendReqController