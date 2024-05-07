const FavouiteAnime = require('../models/favouriteanimeModel');
const factory = require('./handleFactory');
const AppError = require('../utils/appError');

exports.setAnimeUserIds = (req, res, next) => {
    // Allow nested routes
    if (!req.body.anime) req.body.anime = req.params.animeId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
};

exports.getFavouriteAnime = async (req, res, next) => {
    const { userId } = req.params;
    
    // Use userId and animeId to find the favAnime
    const favAnime = await FavouiteAnime.find({ user: userId });
  
    if (!favAnime) {
      return next(new AppError('No favAnime found with that ID', 404));
    }
  
    res.status(200).json(favAnime);
};

exports.getFavouriteByAnimeAndUser = async (req, res, next) => {
    const { userId, animeId } = req.params;
    
    // Use userId and animeId to find the favAnime
    const favAnime = await FavouiteAnime.findOne({ user: userId, anime: animeId });
  
    if (!favAnime) {
      return next(new AppError('No favAnime found with that ID', 404));
    }
  
    res.status(200).json(favAnime);
};

exports.createFavouriteAnime = factory.createOne(FavouiteAnime);
exports.deleteFavouriteAnime = factory.deleteOne(FavouiteAnime);