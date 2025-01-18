const userModel = require('../models/userModel');


const getSearchHistoryController = async (req,res) => {
  try {
    const getSearch = await userModel.findById(req.user.id).select("search").populate("search.user", "fName lName userName profilePicture");

    res.json(getSearch.search);
    
  } catch (err) {
    res.status(400).json({
        message : err.message
    })
  }
}

module.exports = getSearchHistoryController