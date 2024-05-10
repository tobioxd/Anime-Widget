const express = require("express");
const replycommentController = require("../controllers/replycommentController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.route("/").get(replycommentController.getAllReplycomments);

router.route("/:id").get(replycommentController.getReplycomment);

router.use(authController.protect);

router
  .route("/")
  .post(
    authController.restricTo("user"),
    replycommentController.setReplycommentUserIds,
    replycommentController.createReplycomment
  );

router
  .route("/:id")
  .patch(
    authController.restricTo("user"),
    replycommentController.updateReplycomment
  )
  .delete(
    authController.restricTo("user"),
    replycommentController.deleteReplycomment
  );


module.exports = router;
