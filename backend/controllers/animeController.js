const Anime = require('../models/animeModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handleFactory');

exports.getAllAnimes = factory.getAll(Anime);
exports.getAnime = factory.getOne(Anime);
exports.createAnime = factory.createOne(Anime);
exports.updateAnime = factory.updateOne(Anime);
exports.deleteAnime = factory.deleteOne(Anime);

exports.aliasTopAnimes = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-rating';
    req.query.fields = 'name,rating';
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

