const mongoose = require("mongoose");

const OfferingSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

module.exports = Offering = mongoose.model("Offering", OfferingSchema);
