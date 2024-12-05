const Company = require("../models/company");
const User = require("../models/user");
const visa = require("../models/visa");

// ______________ for Generate a Random number_______________________________________use in company data
function generateRandomUniqueString(length = 3, prefix = "AOEP-") {
  const characters = "0123456789";
  let uniqueString = prefix;
  for (let i = 0; i < length; i++) {
    uniqueString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return uniqueString;
}

class visaController {
  // Controller method to handle company requests by ID (API version)
  async getvisaById(req, res) {
    try {
      const visaId = req.params.visaId;

      if (!visaId) {
        return res.status(400).json({ error: "visa ID is required" });
      }

      const visas = await visa.findById(visaId).exec();

      if (!visas) {
        return res.status(404).json({ error: "Visa not found" });
      }

      res.json(visas);
    } catch (error) {
      res.status(500).json({ error: "Server error: " + error.message });
    }
  }

  async getVisa(req, res) {
    try {
      const visadata = await visa.find(); // Get all pages

      if (!visadata || visadata.length === 0) {
        return res.status(404).json({ error: "No pages found" });
      }

      res.setHeader(
        "Access-Control-Allow-Origin",
        "https://kanekt365.vercel.app"
      );

      res.json(visadata);
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
      const companies = await Company.find();

      res.render("visa/add", {
        visa: {},
        companies,
        action: "/create",
        method: "POST",
        users,
        buttonText: "Add visa",
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
      const visadata = await visa.find().populate("Company");
      res.render("visa/list", { visadata, userData });
    } catch (error) {
      res.status(500).send("Server error: " + error.message);
    }
  }

  async delete(req, res) {
    try {
      // Attempt to find and delete the page by ID
      const visas = await visa.findByIdAndDelete(req.params.id);
      if (!visas) {
        return res.status(404).send("visa not found"); // Handle case where page does not exist
      }

      res.status(200).send("visa deleted successfully");
    } catch (error) {
      console.error("Error deleting visa:", error); // Log error for debugging
      res.status(500).send("Error deleting : " + error.message);
    }
  }

  async createVisa(req, res) {
    // Check if the required fields are present
    // if (!req.body.author) {
    //   return res.status(400).json({ message: "Author is required" });
    // }

    // Log the incoming request body for debugging
    // console.log("Request Body:", req.body);

    // // Create a new company instance
    // const visadata = new visa(req.body);

    // // Save the visa to the database
    // await visadata.save();
    //#######################################################################################

    const {
      Company,
      // Company_Name,
      // Country,
      Agency_File_No,
      Visa_No,
      Sponsor,
      Visa_Date,
      Visa_Expire_Date,
      Total_Visa_Quantity,
      CareOfName,
      CareOfAddress,
      CareOfCell,
      Miscellaneous,
      VisaAthourity,
    } = req.body;

    const Visa_user = new visa({
      Hash_id: `#${generateRandomUniqueString()}`,
      Company,
      // Company_Name,
      // Country,
      Agency_File_No,
      Visa_No,
      Sponsor,
      Visa_Date,
      Visa_Expire_Date,
      Total_Visa_Quantity,
      CareOfName,
      CareOfAddress,
      CareOfCell,
      Miscellaneous,
      VisaAthourity,
      status: "",
    });
    await Visa_user.save();
    console.log(Visa_user);
    //res.redirect("/list");

    // Send a success response
    res.status(200).json({ message: "ok" });
  }
  catch(error) {
    // Log the error for debugging
    console.error("Error creating visa:", error.message);
    res.status(500).json({ message: "Error creating visa: " + error.message });
  }

  async update(req, res) {
    // try {
    //   if (!req.body.author) {
    //     return res.status(400).send("Author is required");
    //   }

    const visadata = await visa.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!visadata) return res.status(404).send("visa not found");
    const userId = req.session.userId;
    const userData = await User.findById(userId).exec();

    // console.log(companies);
    res.render("visa/list", { userData });
    // res.status(200).send('page data has been updated successfully');
  }
  catch(error) {
    res.status(400).send("Error updating visa: " + error.message);
  }

  async edit(req, res) {
    try {
      const visaName = "Edit visa";
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

      const visaId = req.params.id;
      const visadata = await visa.findById(visaId).exec();
      const companies = await Company.find();

      if (!visadata) {
        return res.status(404).send("visa not found.");
      }

      res.render("visa/edit", {
        visaName,
        visadata,
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
module.exports = new visaController();
