const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const reactsModel = mongoose.Schema({
    react: {
        type: String,
        enum: ['like', 'love','wow', 'haha', 'sad', 'angry' ],
        required: true
    },
    postId: {
        type: ObjectId,
        ref: 'postmodel'
    },
    reactBy: {
        type: ObjectId,
        ref: 'usermodel'
    }
});

module.exports = mongoose.model('reactmodel', reactsModel);