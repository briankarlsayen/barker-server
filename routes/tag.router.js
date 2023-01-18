const express = require("express");
const tagController = require("../controllers/tag.controller");

const router = express.Router();

router.post("/", tagController.createTag);
router.get("/", tagController.displayTags);
router.put("/status/:id", tagController.updateTagStatus);
router.put("/:id", tagController.updateTag);
router.delete("/:id", tagController.archiveTag);

module.exports = router;
