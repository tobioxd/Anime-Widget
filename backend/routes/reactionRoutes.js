const express = require("express");
const reactionController = require("../controllers/reactionController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.route("/").get(reactionController.getAllReactions);

router.route("/:userId").get(reactionController.getReactionbyUserIds);

router.use(authController.protect);

router.use(authController.restricTo("user"));

router
  .route("/")
  .post(
    reactionController.setReactionUserIds,
    reactionController.createReaction
  );

router
    .route("/:id")
    .patch(reactionController.updateReaction)
    .delete(reactionController.deleteReaction);

module.exports = router;
