const mongoose = require("mongoose");

//const { Schema } = mongose;

const companySchema = new mongoose.Schema({
  title: {
    type: String,
    requrired: true,
  },

  Date: String,
  Company_Name: String,
  Website: String,
  Telephone_No: String,
  Cell_No: String,
  Country: String,
  email: String,
  postalAddress: String,
  Type: String,
});
const cms_companies = new mongoose.model("cms_companies", companySchema);

module.exports = cms_companies;

//module.exports = mongose.model("cms_companies", companySchema);
