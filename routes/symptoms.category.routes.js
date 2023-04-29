const express = require("express");
const router = express.Router();
const SymptomsCategoryContrller = require("../controllers/symptomsCategory.controller");
const auth = require("../middlewares/auth");

router.post("/create", auth, SymptomsCategoryContrller.create);
router.get("/fetch", auth, SymptomsCategoryContrller.fetchCategories);

module.exports = router;