const userModel = require('../models/userModel');


const searchHistoryController = async (req,res) => {
  try {
    const { searchUser } = req.body;

    const search = {
      user: searchUser,
      createdAt: new Date(),
    };
    const user = await userModel.findById(req.user.id);
    const check = user.search.find((x) => x.user.toString() === searchUser);
    
    if (check) {
        await userModel.updateOne(
            {
              _id: req.user.id,
              "search._id": check._id,
            },
            {
              $set: {
                "search.$.createdAt": new Date(),
              },
            }
          );
    } else {
      await userModel.findByIdAndUpdate(req.user.id, {
        $push: {
          search,
        },
      });
    }
    
  } catch (err) {
    res.status(400).json({
        message : err.message
    })
  }
}

module.exports = searchHistoryController