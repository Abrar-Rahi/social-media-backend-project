const PostModel = require("../models/postModel")
const UserModel = require("../models/userModel")



exports.createPost = async (req, res) => {
   try {
      const post = await new PostModel(req.body).save()
      await post.populate("user", "profilePicture coverPicture fName lName userName")
      res.json(post)

   } catch (error) {
      res.status(401).json({
         message: error.message
      })
   }
}




exports.allPost = async (req, res) => {
   try {
      
      const followingTemp = await UserModel.findById(req.user.id).select("following");
      const following = followingTemp.following;

      const promises = following.map((user) => {
         return PostModel.find({ user: user })
            .populate("user", "profilePicture coverPicture fName lName userName gender")
            .populate("comments.commentedBy", "profilePicture userName fName lName")
            .sort({ createdAt: -1 });
      });

      const followingPosts = await Promise.all(promises).then((results) => results.flat())
      const userPosts = await PostModel.find({ user: req.user.id })
         .populate("user", "profilePicture coverPicture fName lName userName gender");

      followingPosts.push(...[...userPosts]);

      followingPosts.sort((a, b) => b.createdAt - a.createdAt);

      res.json(followingPosts);

   } catch (error) {
      res.status(401).json({
         message: error.message
      })
   }
}


exports.comment = async (req, res) => {
   try {
      const { comment, image, postId } = req.body;

      const newComment = await PostModel.findByIdAndUpdate(postId, {
         $push: {
            comments: {
               comment: comment,
               image: image,
               commentedBy: req.user.id,
               commentedAt: new Date(),
            },
         },
      }, { new: true }).populate("comments.commentedBy", "profilePicture userName fName lName");

      res.json(newComment.comments);

   } catch (error) {
      res.status(401).json({
         message: error.message
      })
   }
}
exports.savePost = async (req, res) => {
   try {
      const postId = req.params.id;
      const user = await UserModel.findById(req.user.id);
      const check = user?.savePost.find((a) => a.post.toString() === postId);

      if (check) {
         await UserModel.findByIdAndUpdate(req.user.id, {
            $pull: {
               savePost: { _id: check._id },
            },
         });
      } else {
         await UserModel.findByIdAndUpdate(req.user.id, {
            $push: {
               savePost: { post: postId, savedAt: new Date() },
            },
         });
      }

   } catch (error) {
      res.status(401).json({
         message: error.message
      })
   }
}