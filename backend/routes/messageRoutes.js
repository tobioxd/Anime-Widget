const express = require('express'); 
const messageController = require("../controllers/messageController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.use(authController.restricTo("user","admin"));

router.post("/send/:id", messageController.sendMessage);
router.get("/:id", messageController.getMessages);

module.exports = router;