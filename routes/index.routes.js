const router = require("express").Router();
const userRoutes = require("./userRoutes");
const customerVehicalRoutes = require("./customer.vehical.routes");
const SymptomsCategoryRoutes = require("./symptoms.category.routes");
const SymptomChecksRoutes = require("./symptoms.checks.routes ")
router.use("/api/users", userRoutes);
router.use("/api/customervehical", customerVehicalRoutes);
router.use("/api/symptomscategory", SymptomsCategoryRoutes);
router.use("/api/symptomscheck", SymptomChecksRoutes);
module.exports = router;