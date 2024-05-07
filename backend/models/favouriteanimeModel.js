const mongoose = require('mongoose');
const User = require('./userModel');
const Anime = require('./animeModel');

const favouriteAnimeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Favourite must belong to a user']
    },
    anime: {
        type: mongoose.Schema.ObjectId,
        ref: 'Anime',
        required: [true, 'Favourite must belong to an anime']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

favouriteAnimeSchema.index({ user: 1, anime: 1 }, { unique: true });

favouriteAnimeSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'anime',
        select: 'name image'
    });

    next();
});

favouriteAnimeSchema.post('save', function() {
    this.constructor.calcFavouriteAnime(this.anime);
}
);

favouriteAnimeSchema.statics.calcFavouriteAnime = async function(animeId) {
    const favAnime = await this.aggregate([
      {
        $match: { anime: animeId }
      },
      {
        $group: {
          _id: '$anime',
          favorites: { $sum: 1 }
        }
      }
    ]);

    await Anime.findByIdAndUpdate(animeId, {
        favorites: favAnime.length
    });
};

favouriteAnimeSchema.pre(/^findOneAnd/, async function(next) {
    this.r = await this.clone().findOne();
    console.log(this.r);
    next();
}

);

favouriteAnimeSchema.post(/^findOneAnd/, async function() {
    await this.r.constructor.calcFavouriteAnime(this.r.anime);
}  
);

const FavouriteAnime = mongoose.model('FavouriteAnime', favouriteAnimeSchema);

module.exports = FavouriteAnime;

