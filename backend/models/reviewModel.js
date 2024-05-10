//review / rating / createdAt / ref to anime / ref to user

const mongoose = require('mongoose');
const Anime = require('./animeModel');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review can not be empty']
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    anime: {
        type: mongoose.Schema.ObjectId,
        ref: 'Anime',
        required: [true, 'Review must belong to an anime']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user']
    }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

reviewSchema.index({ anime: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    });

    next();
});

reviewSchema.statics.calcAverageRatings = async function(animeId) {
    const stats = await this.aggregate([
      {
        $match: { anime: animeId }
      },
      {
        $group: {
          _id: '$anime',
          nRating: { $sum: 1 },
          avgRating: { $avg: '$rating' }
        }
      }
    ]);
    console.log(stats);

    if (stats.length > 0) {
      await Anime.findByIdAndUpdate(animeId, {
        ratingsQuantity: stats[0].nRating,
        rating: stats[0].avgRating
      });
    }
    else {
      await Anime.findByIdAndUpdate(animeId, {
        ratingsQuantity: 0,
        rating: 0
      });
    }
  };
  
  reviewSchema.post('save', function() {
    // this points to current review
    this.constructor.calcAverageRatings(this.anime);
  });
  
  // findByIdAndUpdate
  // findByIdAndDelete
  reviewSchema.pre(/^findOneAnd/, async function(next) {
    this.r = await this.clone().findOne();
    console.log(this.r);
    next();
  });
  
  reviewSchema.post(/^findOneAnd/, async function() {
    // await this.findOne(); does NOT work here, query has already executed
    await this.r.constructor.calcAverageRatings(this.r.anime);
  });
  
  const Review = mongoose.model('Review', reviewSchema);
  
  module.exports = Review;