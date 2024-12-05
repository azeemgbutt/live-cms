
const User = require('../models/user');
const Pages = require('../models/cms');
class cmsController {

// Controller method to handle page requests by ID (API version)
async getPageById(req, res) {
  try {
    const pageId = req.params.pageId; // Get the page ID from request parameters

    if (!pageId) {
      return res.status(400).json({ error: 'Page ID is required' });
    }

    const page = await Pages.findById(pageId).exec();

    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }
    res.setHeader('Access-Control-Allow-Origin', 'https://kanekt365.vercel.app');
    res.json(page);
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
}

async getPages(req, res) {
  try {
    const pages = await Pages.find(); // Get all pages

    if (!pages || pages.length === 0) {
      return res.status(404).json({ error: 'No pages found' });
    }

    res.setHeader('Access-Control-Allow-Origin', 'https://kanekt365.vercel.app');
    res.json(pages);
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
        res.render('pages/add', { 
          page: {}, 
          action: '/add', 
          method: 'POST', 
          users, 
          buttonText: 'Add Page', 
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
    const pages = await Pages.find();
    res.render('pages/list', { pages, userData });
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }

}

async delete(req, res) {
  try {
    // Attempt to find and delete the page by ID
    const page = await Pages.findByIdAndDelete(req.params.id);
    if (!page) {
      return res.status(404).send('Page not found'); // Handle case where page does not exist
    }

    res.status(200).send('Page deleted successfully');

  } catch (error) {
    console.error('Error deleting page:', error); // Log error for debugging
    res.status(500).send('Error deleting page: ' + error.message);
  }
}


async update (req, res){
  try {
    if (!req.body.author) {
      return res.status(400).send('Author is required');
    }

    const page = await Pages.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!page) return res.status(404).send('Page not found');
    const userId = req.session.userId;
    const userData = await User.findById(userId).exec();
    const pages = await Pages.find();
    res.render('pages/list', { pages, userData });
    // res.status(200).send('page data has been updated successfully');
  } catch (error) {
    res.status(400).send('Error updating page: ' + error.message);
  }
}

async createPage (req, res){
  
  try {
    if (!req.body.author) {
      return res.status(400).send('Author is required');
    }

    const page = new Pages(req.body);
    await page.save();
    res.status(200).json({ message: 'ok' });
    
  } catch (error) {
    res.status(400).send('Error creating page: ' + error.message);
  }
}
async edit(req, res) {
  try {
    const pageName = 'Edit page';
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

    const pageId = req.params.id;
    const page = await Pages.findById(pageId).exec();
    console.log(page);
    if (!page) {
      return res.status(404).send('Page not found.');
    }

    res.render('pages/edit', {
      pageName,
      page,
      users,
      userData
    });
  } catch (error) {
    console.error('Server error:', error);  // Log the error for debugging
    res.status(500).send('Server error: ' + error.message);
  }
}


}



module.exports = new cmsController();