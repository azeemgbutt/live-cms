// routes/pages.js
const express = require("express");
const app = express();
const visaController = require("../controller/visaController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const router = express.Router();
const methodOverride = require("method-override"); // Middleware for HTTP method override
const { create } = require("browser-sync");

router.get("/list", isAuthenticated, visaController.list);

router.get("/add", isAuthenticated, visaController.add);

router.get("/edit/:id", isAuthenticated, visaController.edit);
router.post("/edit/:id", isAuthenticated, visaController.update);

router.delete("/delete/:id", isAuthenticated, visaController.delete);

// Create a new page
router.post("/create", visaController.createVisa);
// Update a existing page
router.post("/edit/:id", isAuthenticated, visaController.update);

//API

//router.get('/:pageId', cmsController.getPageById);
router.get("/all", visaController.getVisa); // This will map to /api/pages/all

module.exports = router;
