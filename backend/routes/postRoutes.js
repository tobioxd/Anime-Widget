const express = require("express");
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");
const commentRouter = require("./commentRoutes");
const reactionRouter = require("./reactionRoutes");

const router = express.Router({ mergeParams: true });

router.use("/:postId/comments", commentRouter);

router.use("/:postId/reactions", reactionRouter);

router.route("/").get(postController.getAllPosts);

router.use("/blog/:userId", postController.getPostsByUserId);

router.route("/:id").get(postController.getPost);

router.use(authController.protect);

router.use(authController.restricTo("user"));

router
  .route("/")
  .post(
    postController.setPostUserIds,
    postController.createPost
  );
router.patch("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

module.exports = router;
