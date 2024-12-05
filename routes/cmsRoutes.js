// routes/pages.js
const express = require('express');
const app = express();
const cmsController = require('../controller/cmsController');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const router = express.Router();
const methodOverride = require('method-override'); // Middleware for HTTP method override
const { create } = require('browser-sync');

// Use method override middleware
//router.use(methodOverride('_method'));

router.get('/list', isAuthenticated, cmsController.list);

router.get('/add', isAuthenticated, cmsController.add);

router.get('/edit/:id', isAuthenticated, cmsController.edit);
// Create a new page
router.post('/add', isAuthenticated, cmsController.createPage);
// Update a existing page
router.post('/edit/:id', isAuthenticated, cmsController.update);
// Delete an existing page
router.delete('/delete/:id', isAuthenticated, cmsController.delete);


//API

//router.get('/:pageId', cmsController.getPageById);
router.get('/all', cmsController.getPages); // This will map to /api/pages/all


module.exports = router;
