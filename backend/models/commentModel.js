const mongoose = require("mongoose");
const Post = require("./postModel");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "Comment can not be empty"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
      required: [true, "Comment must belong to a post"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Comment must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });

  next();
});

commentSchema.statics.calcComments = async function (postId) {
  const stats = await this.aggregate([
    {
      $match: { post: postId },
    },
    {
      $group: {
        _id: "$post",
        nComments: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await Post.findByIdAndUpdate(postId, {
      numberComments: stats[0].nComments,
    });
  } else {
    await Post.findByIdAndUpdate(postId, {
      numberComments: 0,
    });
  }
};

commentSchema.post("save", function () {
  this.constructor.calcComments(this.post);
});

commentSchema.pre(/^findOneAnd/, async function (next) {
  this.doc = await this.clone().findOne();
  next();
});

commentSchema.post(/^findOneAnd/, async function () {
  await this.doc.constructor.calcComments(this.doc.post);
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
