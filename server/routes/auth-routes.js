require("dotenv").config();

const router = require("express").Router();
const passport = require("passport");
const passportSetup = require("../config/passport-setup");
const User = require("../models/User");
const JWT = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

// router.get("auth/login/success", (req, res) => {
//   if (req.user) {
//     res.status(200).json({
//       success: true,
//       message: "user has successfully authenticated",
//       user: req.user,
//       cookies: req.cookies,
//     });
//   }
// });

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
  console.log("inside register");
  const { username, name, password, role } = req.body;
  console.log(username);
  User.findOne({ username }, (err, user) => {
    console.log("finding username");
    if (err) {
      res.status(500).json({ message: err, status: "500" });
    }
    if (user) {
      res
        .status(400)
        .json({ message: "Email already registered", status: "400" });
    } else {
      const newUser = new User({ username, name, password, role });
      console.log(newUser);
      newUser.save((err) => {
        if (err) {
          res.status(503).json({
            message: "Error occurred while saving. Please try again",
            status: "503",
          });
        } else {
          res
            .status(201)
            .json({ message: "Account successfully created", status: "201" });
        }
      });
    }
  });
});

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const { _id, username, name } = req.user;
    if (req.isAuthenticated()) {
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({
        isAuthenticated: true,
        user: { username, name },
        message: "Successful login",
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

// router.get("auth/login/failed", (req, res) => {
//   res.status(401).json({
//     success: false,
//     message: "user has failed to authenticate",
//   });
// });

// router.get("auth/logout", (req, res) => {
//   req.logout();
// });

// router.get("/auth/twitter", passport.authenticate("twitter"));
// router.get(
//   "/auth/twitter/redirect",
//   passport.authenticate("twitter", {
//     successRedirect: CLIENT_HOMEPAGE_URL,
//     failureRedirect: "/login/failed",
//   })
// );

// router.get("/auth/reddit", passport.authenticate("reddit"));
// router.get(
//   "/auth/reddit/callback",
//   passport.authenticate("reddit", {
//     successRedirect: CLIENT_HOMEPAGE_URL,
//     failureRedirect: "/login",
//   })
// );

module.exports = router;
