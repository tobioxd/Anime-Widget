const monggoose = require('mongoose');
const { type } = require('os');
const slugify = require('slugify');

const animeSchema = new monggoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'An anime must have a name'],
            unique: true,
            trim: true,
            maxlength: [40, 'An anime name must have less or equal then 40 characters'],
            minlength: [5, 'An anime name must have more or equal then 5 characters']
        },
        slug: String,
        rating: {
            type: Number,
            default: 5,
            min: [1, 'Rating must be above 1.0'],
            max: [10, 'Rating must be below 10.0'],
            set: val => Math.round(val * 10) / 10   
        },
        ratingsQuantity: {
            type: Number,
            default: 0
        },
        type: {
            type: String,
            required: [true, 'An anime must have a type'],
            enum: {
                values: ['TV', 'Movie', 'OVA', 'ONA', 'Special'],
                message: 'Type is either: TV, Movie, OVA, ONA, Special'
            }
        },
        episodes: {
            type: Number,
            required: [true, 'An anime must have a number of episodes']
        },
        duration: {
            type: String,
            required: [true, 'An anime must have a duration']
        },
        favorites: {
            type: Number,
            default: 0
        },
        genre: {
            type: [String],
            required: [true, 'An anime must have a genre']
        },
        description: {
            type: String,
            trim: true
        },
        image: [String],
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false
        },
        updatedAt: {
            type: Date,
            default: Date.now(),
            select: false
        },
        status:{
            type: String,
            required: [true, 'An anime must have a status'],
            enum: {
                values: ['Finished Airing', 'Currently Airing', 'Not yet aired'],
                message: 'Status is either: Finished Airing, Currently Airing, Not yet aired'
            }
        },
        aired:{
            type: String,
            required: [true, 'An anime must have an aired date']
        },
        producers: {
            type: [String],
            required: [true, 'An anime must have a producer']
        },
        studios: {
            type: [String],
            required: [true, 'An anime must have a studio']
        },

    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

animeSchema.index({ price: 1, ratingsAverage: -1 });
animeSchema.index({ slug: 1 });

animeSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'anime',
    localField: '_id'
});

animeSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

animeSchema.post(/^find/, function(docs, next) {
    console.log(`Query took ${Date.now() - this.start} milliseconds!`);
    console.log(docs);
    next();
});

const Anime = monggoose.model('Anime', animeSchema);

module.exports = Anime;