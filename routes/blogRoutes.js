// routes/pages.js
const express = require('express');
const app = express();
const blogController = require('../controller/blogController');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const router = express.Router();
const methodOverride = require('method-override'); // Middleware for HTTP method override
const { create } = require('browser-sync');

router.get('/list', isAuthenticated, blogController.list);

router.get('/add', isAuthenticated, blogController.add);

router.get('/edit/:id', isAuthenticated, blogController.edit);

router.delete('/delete/:id', isAuthenticated, blogController.delete);

// Create a new page
router.post('/create', blogController.createBlog);
// Update a existing page
router.post('/edit/:id', isAuthenticated, blogController.update);


//API

//router.get('/:pageId', cmsController.getPageById);
router.get('/all', blogController.getBlogs); // This will map to /api/pages/all


module.exports = router;
