const userModel = require('../models/userModel');


const searchController = async (req,res) => {
  try {
    const searchTerm = req.params.searchTerm;
    const search = await userModel.find({ $text: { $search: searchTerm } }).select("fName lName userName profilePicture");
    res.json(search);
    
  } catch (err) {
    res.status(400).json({
        message : err.message
    })
  }
}

module.exports = searchController