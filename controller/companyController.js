const User = require("../models/user");
const Company = require("../models/company");
class companyController {
  // Controller method to handle company requests by ID (API version)
  async getCompanyById(req, res) {
    try {
      const companyId = req.params.companyId;

      if (!companyId) {
        return res.status(400).json({ error: "Company ID is required" });
      }

      const Companies = await Company.findById(companyId).exec();

      if (!Companies) {
        return res.status(404).json({ error: "Company not found" });
      }

      res.json(Companies);
    } catch (error) {
      res.status(500).json({ error: "Server error: " + error.message });
    }
  }

  async getCompanies(req, res) {
    try {
      const Companies = await Company.find(); // Get all pages

      if (!Companies || Company.length === 0) {
        return res.status(404).json({ error: "No pages found" });
      }

      res.setHeader(
        "Access-Control-Allow-Origin",
        "https://kanekt365.vercel.app"
      );

      res.json(Companies);
    } catch (error) {
      res.status(500).json({ error: "Server error: " + error.message });
    }
  }

  async add(req, res) {
    try {
      const assetsPath = "../../";
      const users = await User.find();
      const userId = req.session.userId;
      const userData = await User.findById(userId).exec();
      res.render("companies/add", {
        companies: {},
        action: "/create",
        method: "POST",
        users,
        buttonText: "Add Company",
        userData,
        assetsPath,
      });
    } catch (error) {
      res.status(500).send("Server error: " + error.message);
    }
  }

  // Method to handle dashboard requests
  async list(req, res) {
    try {
      const userId = req.session.userId;
      const userData = await User.findById(userId).exec();
      const companies = await Company.find();
      res.render("companies/list", { companies, userData });
    } catch (error) {
      res.status(500).send("Server error: " + error.message);
    }
  }

  async delete(req, res) {
    try {
      // Attempt to find and delete the page by ID
      const Companies = await Company.findByIdAndDelete(req.params.id);
      if (!Companies) {
        return res.status(404).send("Company not found"); // Handle case where page does not exist
      }

      res.status(200).send("Company deleted successfully");
    } catch (error) {
      console.error("Error deleting company:", error); // Log error for debugging
      res.status(500).send("Error deleting company: " + error.message);
    }
  }

  async createCompany(req, res) {
    try {
      // Check if the required fields are present
      // if (!req.body.author) {
      //   return res.status(400).json({ message: "Author is required" });
      // }

      // Log the incoming request body for debugging
      console.log("Request Body:", req.body);

      // Create a new company instance
      const company = new Company(req.body);

      // Save the company to the database
      await company.save();

      // Send a success response
      res.status(200).json({ message: "ok" });
    } catch (error) {
      // Log the error for debugging
      console.error("Error creating company:", error.message);
      res
        .status(500)
        .json({ message: "Error creating company: " + error.message });
    }
  }

  async update(req, res) {
    // try {
    //   if (!req.body.author) {
    //     return res.status(400).send("Author is required");
    //   }

    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!company) return res.status(404).send("company not found");
    const userId = req.session.userId;
    const userData = await User.findById(userId).exec();
    const companies = await Company.find();
    console.log(companies);
    res.render("companies/list", { companies, userData });
    // res.status(200).send('page data has been updated successfully');
  }
  catch(error) {
    res.status(400).send("Error updating page: " + error.message);
  }

  async edit(req, res) {
    try {
      const companyName = "Edit company";
      const userId = req.session.userId;
      const users = await User.find();
      // Check if userId is present in the session
      if (!userId) {
        return res.status(401).send("Unauthorized: No user ID in session.");
      }

      const userData = await User.findById(userId).exec();
      if (!userData) {
        return res.status(404).send("User not found.");
      }

      const companyId = req.params.id;
      const companies = await Company.findById(companyId).exec();
      if (!companies) {
        return res.status(404).send("Company not found.");
      }

      res.render("companies/edit", {
        companyName,
        companies,
        users,
        userData,
      });
    } catch (error) {
      console.error("Server error:", error); // Log the error for debugging
      res.status(500).send("Server error: " + error.message);
    }
  }
}

module.exports = new companyController();
