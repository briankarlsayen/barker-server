const express = require("express");
const commentController = require("../controllers/comment.controller");

const router = express.Router();

router.post("/", commentController.createComment);
router.put("/:id", commentController.updateComment);
router.delete("/:id", commentController.archiveComment);

module.exports = router;
