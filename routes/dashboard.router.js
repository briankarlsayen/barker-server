const express = require("express");
const dashboardController = require("../controllers/dashboard.controller");

const router = express.Router();

router.get("/interactions", dashboardController.displayInteractions);
router.get("/counters", dashboardController.displayCounters);

module.exports = router;
