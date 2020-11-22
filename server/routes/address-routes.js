require("dotenv").config();
const router = require("express").Router();
const auth = require("../middleware/auth-middleware");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const User = require("../models/User");
const { MAPBOX_ACCESS_TOKEN } = process.env;

const geocoder = mbxGeocoding({ accessToken: MAPBOX_ACCESS_TOKEN });

router.post("/updateaddress", async (req, res) => {
  console.log(req.body);
  const { street, city, province, country, user } = req.body;
  if (!street || !city || !country) {
    return res.status(400).json({ message: "Please enter mandatory fields " });
  }

  const address = Object.values({ street, city, province, country }).join("");
  console.log(address);

  const geoData = await geocoder
    .forwardGeocode({
      query: address,
      limit: 1,
    })
    .send();

  const updateAddress = await User.findByIdAndUpdate(
    { _id: user },
    { location: geoData.body.features[0].geometry },
    { upsert: true },
    function(err, result) {
      if (err) {
        return res
          .status(403)
          .json({ message: "Cannot save location", status: "403" });
      } else {
        res.status(200).json({
          message: "Location was saved",
          status: "200",
          location: result.location,
        });
      }
    }
  );
});

module.exports = router;
