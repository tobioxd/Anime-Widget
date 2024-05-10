const Post = require('../models/postModel');
const factory = require('./handleFactory');
const AppError = require('../utils/appError');

exports.setPostUserIds = (req, res, next) => {
    // Allow nested routes
    if (!req.body.anime) req.body.anime = req.params.animeId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
};

exports.getPostsByUserId = async (req, res, next) => {
    const { userId } = req.params;

    const posts = await Post.find({ user: userId });

    if (!posts) {
        return next(new AppError('No post found with that ID', 404));
    }

    res.status(200).json(posts);
};

exports.getAllPosts = factory.getAll(Post);
exports.getPost = factory.getOne(Post);
exports.createPost = factory.createOne(Post);
exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);