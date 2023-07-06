const express = require("express");
const router = express.Router();

const {
  getAllFeeds,
  getFeedById,
  createNewFeed,
  updateFeed,
  deleteFeed,
} = require("../controllers/feed.controller");

router.get("/", getAllFeeds);
router.get("/:id", getFeedById);
router.post("/", createNewFeed);
router.patch("/:id", updateFeed);
router.delete("/:id", deleteFeed);

module.exports = router;
