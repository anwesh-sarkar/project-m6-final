const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  console.log(req.headers);
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "No token authorisation" });
  }

  try {
    const user = jwt.verify(token, SECRET_KEY);
    console.log(user);
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
}

module.exports = auth;
