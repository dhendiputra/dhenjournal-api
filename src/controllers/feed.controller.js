const { validationResult } = require("express-validator");
const FeedModel = require("../models/feed.models");
const cloudinary = require("../config/clodinary");

exports.getAllFeeds = (req, res, next) => {
  FeedModel.find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getFeedById = async (req, res) => {
  try {
    let feed = await FeedModel.findById(req.params.id);
    res.json(feed);
  } catch (err) {
    console.log(err);
  }
};

exports.createNewFeed = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Input value tidak sesuai!");
    err.errStatus = 400;
    err.data = errors.array();
    throw err;
  }

  if (!req.file) {
    const err = new Error("Upload dong photonya, gimana sih!");
    err.errStatus = 422;
    throw err;
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const caption = req.body.caption;

    const PostFeed = new FeedModel({
      image: result.secure_url,
      caption: caption,
      cloudinary_id: result.public_id,
    });

    await PostFeed.save()
      .then((result) => {
        res.status(201).json({
          message: "Feed created",
          data: result,
        });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log("ERR", error);
  }
};

exports.updateFeed = async (req, res) => {
  try {
    let feed = await FeedModel.findById(req.params.id);
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
      await cloudinary.uploader.destroy(feed.cloudinary_id);
    }
    const data = {
      image: req.body.image || feed.image,
      caption: req.body.caption || feed.caption,
      cloudinary_id: result?.public_id || feed.cloudinary_id,
    };
    feed = await FeedModel.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json({
      message: "Success update feed: ",
      updated: feed,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteFeed = async (req, res) => {
  try {
    let feed = await FeedModel.findById(req.params.id);
    await cloudinary.uploader.destroy(feed.cloudinary_id);
    await feed.deleteOne();
    res.json({
      message: "Success delete feed: ",
      deleted: feed,
    });
  } catch (err) {
    console.log(err);
  }
};
