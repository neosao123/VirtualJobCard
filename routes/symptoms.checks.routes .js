const express = require("express");
const router = express.Router();
const SystemCheckController = require("../controllers/symptomsCheck.controller");
const auth = require("../middlewares/auth");

router.post("/create", auth, SystemCheckController.create);
router.post("/fetchchecks", SystemCheckController.findByCatId);


module.exports = router;







