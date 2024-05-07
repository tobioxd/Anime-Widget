/* eslint-disable prettier/prettier */
const Review = require("../models/reviewModel");
const factory = require("./handleFactory");
const AppError = require("../utils/appError");

exports.setAnimeUserIds = (req, res, next) => {
    // Allow nested routes
    if (!req.body.anime) req.body.anime = req.params.animeId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
};

exports.getReviewByAnimeAndUser = async (req, res, next) => {
    const { userId, animeId } = req.params;
    
    // Use userId and animeId to find the review
    const review = await Review.findOne({ user: userId, anime: animeId });
  
    if (!review) {
      return next(new AppError('No review found with that ID', 404));
    }
  
    res.status(200).json(review);
};


exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);



