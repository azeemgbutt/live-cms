// routes/pages.js
const express = require("express");
const app = express();
const companyController = require("../controller/companyController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const router = express.Router();
const methodOverride = require("method-override"); // Middleware for HTTP method override
const { create } = require("browser-sync");

router.get("/list", isAuthenticated, companyController.list);

router.get("/add", isAuthenticated, companyController.add);

router.get("/edit/:id", isAuthenticated, companyController.edit);
router.post("/edit/:id", isAuthenticated, companyController.update);

router.delete("/delete/:id", isAuthenticated, companyController.delete);

// Create a new page
router.post("/create", companyController.createCompany);
// Update a existing page
//router.post('/edit/:id', isAuthenticated, companyController.update);

//API

//router.get('/:pageId', cmsController.getPageById);
router.get("/all", companyController.getCompanies); // This will map to /api/pages/all

module.exports = router;
