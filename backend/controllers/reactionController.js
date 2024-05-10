const Reaction = require("../models/reactionModel");
const factory = require("./handleFactory");

exports.setReactionUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.post) req.body.post = req.params.postId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getReactionbyUserIds = async (req, res, next) => {
  const { userId } = req.params;
  
  // Use userId and postId to find the reaction
  const reaction = await Reaction.find({ user: userId });

  if (!reaction) {
    return next(new AppError("No reaction found with that ID", 404));
  }

  res.status(200).json(reaction);
};

exports.getAllReactions = factory.getAll(Reaction);
exports.getReaction = factory.getOne(Reaction);
exports.createReaction = factory.createOne(Reaction);
exports.updateReaction = factory.updateOne(Reaction);
exports.deleteReaction = factory.deleteOne(Reaction);
