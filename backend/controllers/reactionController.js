const Reaction = require("../models/reactionModel");
const factory = require("./handleFactory");

exports.setReactionUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.post) req.body.post = req.params.postId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getReactionbyUserIds = async (req, res, next) => {
  const reaction = await Reaction.find({
    user: req.params.userId,
  });

  res.status(200).json(reaction);
};

exports.getReactionbyPostIds = async (req, res, next) => {
  const reaction = await Reaction.find({
    user: req.params.userId,
    post: req.params.postId,
  });

  res.status(200).json(reaction);
}

exports.getAllReactions = factory.getAll(Reaction);
exports.getReaction = factory.getOne(Reaction);
exports.createReaction = factory.createOne(Reaction);
exports.updateReaction = factory.updateOne(Reaction);
exports.deleteReaction = factory.deleteOne(Reaction);
