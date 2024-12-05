const express = require('express');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const dashboardController = require('../controller/dashboardController');
const router = express.Router();

// Protected root route
router.get('/', isAuthenticated, (req, res) => {
  const user = req.session.userId;
  res.render('dashboard', { user }); 
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.userId) {
    res.redirect('/'); // Redirect authenticated users
  } else {
    res.render('login'); // Render login page
  }
});

// Registration route
router.get('/register', (req, res) => {
  res.render("register");
});

// Logout route
router.get('/logout', isAuthenticated, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).render("error"); // Ensure 'error' view exists
    }
    res.redirect("/login");
  });
});

// Dashboard route
router.get('/dashboard', isAuthenticated, dashboardController.getDashboard.bind(dashboardController));
router.get('/', isAuthenticated, dashboardController.getDashboard.bind(dashboardController));
module.exports = router;
