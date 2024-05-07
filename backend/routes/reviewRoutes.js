/* eslint-disable prettier/prettier */
// eslint-disable-next-line import/no-useless-path-segments

const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReviews)

router.use(authController.protect);

router
  .route('/')
  .post(
    authController.restricTo('user'),
    reviewController.setAnimeUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restricTo('user'),
    reviewController.updateReview
  )
  .delete(
    authController.restricTo('user'),
    reviewController.deleteReview
  );


module.exports = router;