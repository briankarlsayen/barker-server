const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.get("/", userController.displayUsers);
router.get("/token", userController.viewUser);
router.put("/", userController.updateUser);
router.delete("/:id", userController.archiveUser);

module.exports = router;
