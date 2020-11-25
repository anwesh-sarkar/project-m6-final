const router = require("express").Router();
const User = require("../models/User");

router.get("/allusers", async (req, res) => {
  const result = await User.find(
    {},
    { username: 0, password: 0, role: 0 },
    (err, result) => {
      if (err) {
        res.status(400).json({ message: "Cannot get users", status: "400" });
      } else {
        res
          .status(200)
          .json({ message: "All users", status: "200", users: result });
      }
    }
  );
});

module.exports = router;
