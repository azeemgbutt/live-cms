const mongoose = require("mongoose");

//const { Schema } = mongoose;
const visaSchema = new mongoose.Schema({
  Hash_id: String,
  Company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cms_companies",
  },
  Country: String,
  Agency_File_No: String,
  Visa_No: String,
  Sponsor: String,
  Visa_Date: String,
  Visa_Expire_Date: String,
  Total_Visa_Quantity: String,
  CareOfName: String,
  CareOfAddress: String,
  CareOfCell: String,
  Miscellaneous: String,
  VisaAthourity: String,
  status: String,
});

const visa = new mongoose.model("cms_visa", visaSchema);

// module.exports = visa;
module.exports = visa;
