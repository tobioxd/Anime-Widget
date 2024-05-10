const ReplyComment = require("../models/replycommentModel");
const factory = require("./handleFactory");

exports.setReplycommentUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.comment) req.body.comment = req.params.commentId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.deleteReplycommentbyCommentId = async (req, res, next) => {
  const doc = await ReplyComment.deleteMany({ comment: req.params.commentId });

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};

exports.getAllReplycomments = factory.getAll(ReplyComment);
exports.getReplycomment = factory.getOne(ReplyComment);
exports.createReplycomment = factory.createOne(ReplyComment);
exports.updateReplycomment = factory.updateOne(ReplyComment);
exports.deleteReplycomment = factory.deleteOne(ReplyComment);
