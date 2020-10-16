// may need this --> require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET; /* || "very secret thing" */

// this file is used to verify the user has a valid jwt, allowing them restricted access

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.status(401).json({
            err: err.message,
            msg: "Invalid token"
          });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      res.status(401).json({
        err: "Missing credentials, please log in or register"
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      err: err,
      msg: "Server error fulfilling request"
    })
  }
}