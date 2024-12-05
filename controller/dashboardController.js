
const User = require('../models/user');

class dashboardController{
// Method to handle dashboard requests
async getDashboard(req, res) {
    try {
      // Retrieve user ID from session
      const userId = req.session.userId;
      
      // Fetch user data from the database
      const user = await User.findById(userId).exec();
      const totalUsers = await User.countDocuments().exec();

      if (!user) {
        return res.redirect('/login'); // Redirect if user not found
      }
      
      // Render the dashboard view with the user data
      res.render('dashboard', { user , totalUsers });
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).send('Server Error'); // Handle errors appropriately
    }
  }
}

module.exports = new dashboardController();