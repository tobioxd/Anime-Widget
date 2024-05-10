const mongoose = require("mongoose");
const Post = require("../models/postModel");

const reactionSchema = new mongoose.Schema(
  {
    reaction: {
      type: String,
      enum: ["like", "dislike", "none"],
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
      required: [true, "Reaction must belong to a post"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Reaction must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reactionSchema.statics.calcLikesAndDislikes = async function (
  postId
) {
  console.log(postId);
  const stats = await this.aggregate([
    {
      $match: { post: postId },
    },
    {
      $group: {
        _id: "$post",
        like: {
          $sum: { $cond: [{ $eq: ["$reaction", "like"] }, 1, 0] },
        },
        dislike: {
          $sum: { $cond: [{ $eq: ["$reaction", "dislike"] }, 1, 0] },
        }, 
      },
    },
  ]);

  console.log(stats);

  if (stats.length > 0) {
    await Post.findByIdAndUpdate(postId, {
      likes: stats[0].like,
      dislikes: stats[0].dislike,
    });
  } else {
    await Post.findByIdAndUpdate(postId, {
      likes: 0,
      dislikes: 0,
    });
  }
};

reactionSchema.post("save", function () {
  this.constructor.calcLikesAndDislikes(this.post);
});

reactionSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.clone().findOne();
  next();
});

reactionSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcLikesAndDislikes(this.r.post);
});

const Reaction = mongoose.model("Reaction", reactionSchema);

module.exports = Reaction;
