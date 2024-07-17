const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema

const postModel = new Schema({
    type: {
        type: String,
        enum: ["profilePicture", "coverPicture", null],
        default: null
    },
    image: {
        type: Array
    },
    text: {
        type: String
    },
    background: {
        type: String
    },
    user: {
        type: ObjectId,
        ref: "usermodel"
    },
    comments: [
        {
            comment: {
                type: String
            },
            image: {
                type: String
            },
            commentedBy: {
                type: ObjectId,
                ref: "usermodel"
            },
            commentedAt: {
                type: Date,
                require: true
            },
        }
    ]

},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("postmodel", postModel)