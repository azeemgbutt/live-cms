
const User = require('../models/user');
const Blog  = require('../models/blog');
class blogController {

// Controller method to handle blog requests by ID (API version)
async getBlogById(req, res) {
  try {
    const blogId = req.params.blogId; 

    if (!blogId) {
      return res.status(400).json({ error: 'Blog ID is required' });
    }

    const Blogs = await Blog.findById(blogId).exec();

    if (!Blogs) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(Blogs);
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
}

async getBlogs(req, res) {
  try {
    const Blogs = await Blog.find(); // Get all pages

    if (!Blogs || Blog.length === 0) {
      return res.status(404).json({ error: 'No blogs found' });
    }

    res.setHeader('Access-Control-Allow-Origin', 'https://kanekt365.vercel.app');
    
    res.json(Blogs);
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
}

  async add (req, res){
  
      try {
        const assetsPath = '../../';
        const users = await User.find();
        const userId = req.session.userId;
        const userData = await User.findById(userId).exec();
        res.render('blogs/add', { 
          blogs: {}, 
          action: '/create', 
          method: 'POST', 
          users, 
          buttonText: 'Add Blog', 
          userData,
          assetsPath 
        });
      } catch (error) {
        res.status(500).send('Server error: ' + error.message);
      }
    
  }

  // Method to handle dashboard requests
async list (req, res){
  try {
    const userId = req.session.userId;
    const userData = await User.findById(userId).exec();
    const Blogs = await Blog.find();
    res.render('blogs/list', { Blogs, userData });
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }

}

async delete(req, res) {
  try {
    // Attempt to find and delete the page by ID
    const Blogs = await Blog.findByIdAndDelete(req.params.id);
    if (!Blogs) {
      return res.status(404).send('Blog not found'); // Handle case where page does not exist
    }

    res.status(200).send('Blog deleted successfully');

  } catch (error) {
    console.error('Error deleting blog:', error); // Log error for debugging
    res.status(500).send('Error deleting blog: ' + error.message);
  }
}

async createBlog(req, res) {
  try {
    // Check if the required fields are present
    if (!req.body.author) {
      return res.status(400).json({ message: 'Author is required' });
    }

    const { title, slug, content, timestamps, status, author, image } = req.body;

    // Assuming the image is a Base64 string coming from the form
    const photoPath = image.split(',')[1]; // Remove metadata part if included

    // Create a new blog instance
    const blog = new Blog({ title, slug, content, photoPath, timestamps, status, author  });

    // Save the blog to the database
    await blog.save();

    // Send a success response
    res.status(200).json({ message: 'ok' });

  } catch (error) {
    // Log the error for debugging
    console.error('Error creating blog:', error.message);
    res.status(500).json({ message: 'Error creating blog: ' + error.message });
  }
}

async update (req, res){
  try {
    if (!req.body.author) {
      return res.status(400).send('Author is required');
    }

    const { title, content, timestamps, status, author, image } = req.body;

    // Assuming the image is a Base64 string coming from the form
    const photoPath = image; // Remove metadata part if included
    const blog = await Blog.findByIdAndUpdate(req.params.id, {title, content, timestamps, status, author, photoPath}, { new: true });
    if (!blog) return res.status(404).send('Blog not found');
    const userId = req.session.userId;
    const userData = await User.findById(userId).exec();
    const Blogs = await Blog.find();
    res.render('blogs/list', { Blogs, userData });
    // res.status(200).send('page data has been updated successfully');
  } catch (error) {
    res.status(400).send('Error updating page: ' + error.message);
  }
}


async edit(req, res) {
  try {
    const blogName = 'Edit blog';
    const userId = req.session.userId;
    const users = await User.find();
    // Check if userId is present in the session
    if (!userId) {
      return res.status(401).send('Unauthorized: No user ID in session.');
    }

    const userData = await User.findById(userId).exec();
    if (!userData) {
      return res.status(404).send('User not found.');
    }

    const blogId = req.params.id;
    const blogs = await Blog.findById(blogId).exec();
    if (!blogs) {
      return res.status(404).send('Blog not found.');
    }

    res.render('blogs/edit', {
      blogName,
      blogs,
      users,
      userData
    });
  } catch (error) {
    console.error('Server error:', error);  // Log the error for debugging
    res.status(500).send('Server error: ' + error.message);
  }
}


}

module.exports = new blogController();