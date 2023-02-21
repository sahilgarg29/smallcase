require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, user) {
      if (err) return reject(err);
      resolve(user);
    });
  });
};

module.exports = async (req, res, next) => {
  if (req.cookies.jwt) {
    // console.log(req.cookies.jwt);
    let user = null;
    try {
      user = await verifyToken(req.cookies.jwt);
    } catch (err) {
      return res.status(401).send({ message: "Invalid Token" });
    }

    res.locals.user = user.user;
    console.log(user.user);
    next();
  } else {
    res.locals.user = null;
    next();
  }
};
