const mongoose = require("mongoose");

const WantedSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

module.exports = Wanted = mongoose.model("Wanted", WantedSchema);
