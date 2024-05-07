const express = require("express");

const animeController = require("../controllers/animeController");
const authController = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes");

const router = express.Router();

router.use("/:animeId/reviews", reviewRouter);

router
  .route("/top-7-anime")
  .get(animeController.aliasTopAnimes, animeController.getAllAnimes);

router.route("/anime-list").get(animeController.getAnimeList, animeController.getAllAnimes);

router.route("/anime-stats").get(animeController.getAnimeStats);

router
  .route("/")
  .get(animeController.getAllAnimes)
  .post(
    authController.protect,
    authController.restricTo("admin"),
    animeController.createAnime
  );

router
  .route("/:id")
  .get(animeController.getAnime)
  .patch(
    authController.protect,
    authController.restricTo("admin"),
    animeController.updateAnime
  )
  .delete(
    authController.protect,
    authController.restricTo("admin"),
    animeController.deleteAnime
  );

module.exports = router;
