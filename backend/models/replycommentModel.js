const mongoose = require("mongoose");

const replycommentSchema = new mongoose.Schema(
  {
    replycomment: {
      type: String,
      required: [true, "Reply comment can not be empty"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    comment: {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
      required: [true, "Reply comment must belong to a comment"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Reply comment must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

replycommentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });

  next();
});

const Replycomment = mongoose.model("Replycomment", replycommentSchema);

module.exports = Replycomment;
