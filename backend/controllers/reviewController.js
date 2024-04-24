/* eslint-disable prettier/prettier */
const Review = require("../models/reviewModel");
const factory = require("./handleFactory");

exports.setAnimeUserIds = (req, res, next) => {
    // Allow nested routes
    if (!req.body.anime) req.body.anime = req.params.animeId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);



