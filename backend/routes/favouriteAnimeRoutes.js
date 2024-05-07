express = require("express");
const favouriteAnimeController = require("../controllers/favouriteanimeController");
const authController = require("../controllers/authController");
const animeRouter = require("./animeRoutes");

const router = express.Router({ mergeParams: true });

router.get("/", favouriteAnimeController.getFavouriteAnime);

router.use(authController.protect);

router.use(authController.restricTo("user"));

router.use("/:userId/:animeId", favouriteAnimeController.getFavouriteByAnimeAndUser);

router.post("/", favouriteAnimeController.setAnimeUserIds, favouriteAnimeController.createFavouriteAnime);

router.delete(
  "/:id",
  favouriteAnimeController.deleteFavouriteAnime
);

module.exports = router;
