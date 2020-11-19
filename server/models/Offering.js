const mongoose = require("mongoose");

const OfferingSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  user: {
    type: String,
  },
});

module.exports = mongoose.model("Offering", OfferingSchema);
