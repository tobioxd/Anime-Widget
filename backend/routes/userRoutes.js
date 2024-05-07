/* eslint-disable prettier/prettier */
const express = require("express");
// eslint-disable-next-line import/no-useless-path-segments
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes");
const reviewController = require("../controllers/reviewController");
const router = express.Router();
const favouriteAnimeRouter = require("./favouriteAnimeRoutes");

router.use(
  "/:userId/reviews/:animeId",
  reviewController.getReviewByAnimeAndUser
);

router.use("/:userId/reviews", reviewRouter);

router.use("/:userId/favAnime", favouriteAnimeRouter);

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);


router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.restricTo("user"),
  authController.updatePassword
);
router.get(
  "/me",
  authController.protect,
  authController.restricTo("user"),
  userController.getMe,
  userController.getUser
);
router.patch(
  "/updateMe",
  authController.protect,
  authController.restricTo("user"),
  userController.updateMe
);
router.delete(
  "/deleteMe",
  authController.protect,
  authController.restricTo("user"),
  userController.deleteMe
);

router.get(
  "/user-list",
  authController.protect,
  authController.restricTo("admin"),
  userController.getUserList,
  userController.getAllUsers
);

router
  .route("/")
  .get(
    userController.getAllUsers,
    authController.protect,
    authController.restricTo("admin")
  )
  .post(
    userController.createUser,
    authController.protect,
    authController.restricTo("admin")
  );

router
  .route("/:id")
  .get(userController.getUser)
  .patch(
    userController.updateUser,
    authController.protect,
    authController.restricTo("admin")
  )
  .delete(
    userController.deleteUser,
    authController.protect,
    authController.restricTo("admin")
  );

module.exports = router;
