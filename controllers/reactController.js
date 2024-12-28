
const UserModel = require("../models/userModel")
const ReactModel = require("../models/reactsModel")



exports.reactPost = async (req, res) => {
    try {
        const { postId, react } = req.body;

        const check = await ReactModel.findOne({
            postId: postId,
            reactBy: req.user.id
        });

        if (check === null) {
            const newReact = new ReactModel({
                react: react,
                postId: postId,
                reactBy: req.user.id
            });
            await newReact.save();
        } else {
            if (check.react === react) {
                await ReactModel.findByIdAndDelete(check._id);
            } else {
                await ReactModel.findByIdAndUpdate(check._id, {
                    react: react
                });
            }
        }

    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}

exports.getAllReacts = async (req, res) => {
    try {
        const reactArray = await ReactModel.find({ postId: req.params.id })

        const check = await ReactModel.findOne({
            postId: req.params.id,
            reactBy: req.user.id
        });

        const newReacts = reactArray.reduce((group, react) => {
            const key = react['react'];
            group[key] = group[key] || [];
            group[key].push(react);
            return group;
        }, {});

        const allReacts = [
            {
                react: "like",
                count: newReacts.like ? newReacts.like.length : 0
            },
            {
                react: "love",
                count: newReacts.love ? newReacts.love.length : 0
            },
            {
                react: "wow",
                count: newReacts.wow ? newReacts.wow.length : 0
            },
            {
                react: "haha",
                count: newReacts.haha ? newReacts.haha.length : 0
            },

            {
                react: "sad",
                count: newReacts.sad ? newReacts.sad.length : 0
            },
            {
                react: "angry",
                count: newReacts.angry ? newReacts.angry.length : 0
            },


        ];

        // check if post is already saved or not
        const user = await UserModel.findById(req.user.id);
        const isPostSave = user?.savePost.find((x) => x.post.toString() === req.params.id);
        
        res.json({ allReacts, check: check?.react, total: reactArray.length, isPostSave: isPostSave ? true : false });



    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}




