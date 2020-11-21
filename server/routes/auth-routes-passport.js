require("dotenv").config();

const router = require("express").Router();
const passport = require("passport");
const passportSetup = require("../config/passport-setup");
const User = require("../models/User");
const JWT = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const signToken = (userId) => {
  return JWT.sign(
    {
      iss: "Kindred",
      sub: userId,
    },
    SECRET_KEY,
    { expiresIn: "1 day" }
  );
};

router.post("/register", (req, res) => {
  const { username, name, password, role } = req.body;
  console.log(username);

  if (!username || !name || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  User.findOne({ username })
    .then((user) => {
      if (user) {
        res
          .status(400)
          .json({ message: "Email already registered", status: "400", user });
      } else {
        const newUser = new User({ username, name, password, role });
        console.log(newUser);
        newUser
          .save()
          .then((user) => {
            // const token = signToken(user._id);

            res.status(201).json({
              message: "Account successfully created",
              status: "201",
              user: { id: user._id, name: user.name, email: user.username },
            });
          })
          .catch((err) => {
            res.status(503).json({
              message: "Error occurred while saving. Please try again",
              status: "503",
              err,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err, status: "500" });
    });
});

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const { _id, username, name } = req.user;
    console.log(_id, username, name);
    if (req.isAuthenticated()) {
      const token = signToken(_id);
      // res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({
        isAuthenticated: true,
        user: { username, name },
        message: "Successful login",
        token,
      });
    } else {
      res
        .status(401)
        .json({ isAuthenticated: false, user: { username, name } });
    }
  }
);

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.status(200).json({
      user: { username: "", name: "" },
      message: "Successfully logged out",
    });
  }
);

router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username, role } = req.user;
    console.log(req.user);

    res.status(200).json({ isAuthenticated: true, user: { username, role } });
  }
);

module.exports = router;
