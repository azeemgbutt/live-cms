const User = require('../models/user');

class userController{

  // async register(req, res) {
  //   //console.log('Received data:', req.body); // Log the incoming data

  //   try {
  //     const {firstname, lastname, email, username, password } = req.body;
  //     const user = new User({ firstname, lastname, email, username, password });
  //     await user.save();
  //     res.status(201).json({ message: 'User registered successfully' });

  //    // res.redirect("/login"); 
  //   } catch (err) {
  //     res.status(500).json({ message: 'Error registering user', error: err.message });
  //   }
  // }

  async register(req, res) {
    try {
      const { firstname, lastname, email, username, password, role } = req.body;
  
      // Validate role: If no role is provided, default to 'subscriber'
      const userRole = role === 'admin' || role === 'subscriber' ? role : 'subscriber';
  
      const user = new User({
        firstname,
        lastname,
        email,
        username,
        password,
        role: userRole // Add the role field
      });
  
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
  
    } catch (err) {
      res.status(500).json({ message: 'Error registering user', error: err.message });
    }
  }

  async login (req, res){
    try {
      
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      console.log(user);
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }else{
        req.session.userId = user._id; 
        res.status(200).json({ message: 'ok' });
      }
      
     //const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      
    } catch (err) {
      res.status(500).json({ message: 'Error logging in', error: err.message });
    }
  }

  async getDashboard(req, res) {
    try {
      // Retrieve user ID from session
      const userId = req.session.userId;
      
      // Fetch user data from the database
      const user = await User.findById(userId).exec();
      
      if (!user) {
        return res.redirect('/login'); // Redirect if user not found
      }
      
      // Render the dashboard view with the user data
      res.render('dashboard', { user });
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).send('Server Error'); // Handle errors appropriately
    }
  }

  async getUserById(req, res) {
    try {
      const userId = req.params._id;
      // Fetch user from database
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Exclude sensitive fields if necessary
      const { password, ...userWithoutPassword } = user.toObject();
  
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}


module.exports = new userController();