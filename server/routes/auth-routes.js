require("dotenv").config();

const router = require("express").Router();
const auth = require("../middleware/auth-middleware");
const bcrypt = require("bcrypt");
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

  User.findOne({ username }).then((user) => {
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
          const token = signToken(user._id);

          res.status(201).json({
            message: "Account successfully created",
            status: "201",
            isAuthenticated: true,
            user: {
              id: user._id,
              name: user.name,
              email: user.username,
            },
            token,
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
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  if (!username || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }
      const name = user.name;
      const _id = user._id;
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const token = signToken(user._id);

          res.status(200).json({
            isAuthenticated: true,
            user: { username, name, _id },
            message: "Successful login",
            token,
          });
        } else {
          return res.status(400).json({
            isAuthenticated: false,
            user: { username },
            message: "Incorrect Password",
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// router.get("/logout", auth, (req, res) => {
//   res.clearCookie("access_token");
//   res.status(200).json({
//     user: { username: "", name: "" },
//     message: "Successfully logged out",
//   });
// });

router.get("/user", auth, (req, res) => {
  User.findById({ _id: req.user.sub })
    .select("-password")
    .then((user) => res.json(user));

  // res.status(200).json({ isAuthenticated: true, user: { username, role } });
});

module.exports = router;
