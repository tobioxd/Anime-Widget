const Anime = require('../models/animeModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory');

exports.getAllAnimes = factory.getAll(Anime);
exports.getAnime = factory.getOne(Anime);
exports.createAnime = factory.createOne(Anime);
exports.updateAnime = factory.updateOne(Anime);
exports.deleteAnime = factory.deleteOne(Anime);

exports.aliasTopAnimes = (req, res, next) => {
    req.query.limit = '7';
    req.query.sort = '-rating';
    req.query.fields = 'name,rating,image';
    next();
};

exports.getAnimeList = (req,res,next) => {
    req.query.fields = 'name,genre,producers,studios';
    next();
};

exports.getAnimeStats = catchAsync(async (req, res, next) => {
    const stats = await Anime.aggregate([
        {
            $match: { rating: { $gte: 4.5 } }
        },
        {
            $group: {
                _id: null,
                numAnimes: { $sum: 1 },
                avgRating: { $avg: '$rating' },
                minRating: { $min: '$rating' },
                maxRating: { $max: '$rating' }
            }
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            stats
        }
    });
});

