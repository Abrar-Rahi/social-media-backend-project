const userModel = require('../models/userModel');


const removeSearchHistoryController = async (req, res) => {
    try {
        const { searchUser } = req.body;

      const result =  await userModel.updateOne(
            { _id: req.user.id },
            {
                $pull: {
                    search: {
                        user: searchUser,
                    },
                },
            }
        );
        
        if (result.modifiedCount > 0) {
            res.json({ message: "ok" });
          } else {
            res.status(404).json({ message: "Not found" });
          }

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

module.exports = removeSearchHistoryController