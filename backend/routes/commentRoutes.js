const express = require("express");
const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");
const replycommentRouter = require("./replycommentRoutes");
const ReplycommentController = require("../controllers/replycommentController");

const router = express.Router({ mergeParams: true });

router.use("/:commentId/replycomments", replycommentRouter);

router.route("/:commentId/deletereplys").delete(ReplycommentController.deleteReplycommentbyCommentId);

router.route("/:commentId/allreplycomments").get(ReplycommentController.getAllReplycommentsbyCommentId);

router.route("/").get(commentController.getAllComments);

router.route("/post/:postId").get(commentController.getAllCommentsByPostId);

router.route("/:id").get(commentController.getComment);

router.use(authController.protect);

router
  .route("/")
  .post(
    authController.restricTo('user'),
    commentController.setCommentUserIds,
    commentController.createComment
  );

router
  .route("/:id")
  .patch(authController.restricTo('user'), commentController.updateComment)
  .delete(authController.restricTo('user'), commentController.deleteComment);

module.exports = router;
