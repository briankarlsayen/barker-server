const express = require("express");
const postController = require("../controllers/post.controller");

const router = express.Router();

router.post("/", postController.createPost);
router.get("/", postController.displayPosts);
router.get("/:id", postController.viewPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.archivePost);

module.exports = router;
