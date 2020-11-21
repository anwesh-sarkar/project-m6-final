require("dotenv").config();
const fetch = require("node-fetch");

const { MAPBOX_ACCESS_TOKEN } = process.env;

// const forwardGeocoding = function(address) {
//   var url =
//     "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
//     encodeURIComponent(address) +
//     ".json?access_token=" +
//     MAPBOX_ACCESS_TOKEN +
//     "&limit=1";

//   request({ url: url, json: true }, function(error, response) {
//     if (error) {
//       callback("Unable to connect to Geocode API", undefined);
//     } else if (response.body.features.length == 0) {
//       callback("Unable to find location. Try to " + "search another location.");
//     } else {
//       var longitude = response.body.features[0].center[0];
//       var latitude = response.body.features[0].center[1];
//       var location = response.body.features[0].place_name;

//       console.log("Latitude :", latitude);
//       console.log("Longitude :", longitude);
//       console.log("Location :", location);
//     }
//   });
// };

// var address = "Indore"; // Sample data

// // Function call
// forwardGeocoding(address);

const router = require("express").Router();
const auth = require("../middleware/auth-middleware");

router.post("/updateaddress", (req, res) => {
  const address = Object.values(req.body);
  console.log(address);
  const string = address.join(" ");
  console.log(string);
  var url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=" +
    MAPBOX_ACCESS_TOKEN +
    "&limit=1";
  console.log(url);

  fetch(url, {
    method: "POST",
  })
    .then((res) => console.log(res))

    .catch((err) => console.log(err));
});

module.exports = router;
