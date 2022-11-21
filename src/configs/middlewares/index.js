const jwt = require("jsonwebtoken");
const UserModel = require("../../components/users/UserModel");
const config = process.env;

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    const decoded = jwt.verify(bearerToken, config.TOKEN_KEY);
    const isRegisteredUser = UserModel.findById(decoded.user_id);
    if (isRegisteredUser) {
      next();
    }
  } else {
    return res.status(403).send({ message: "Token not found" });
  }
};

module.exports = verifyToken;
