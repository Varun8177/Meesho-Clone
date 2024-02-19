const HttpException = require("../exceptions/HttpException");
const jwt = require("jsonwebtoken");

const EnsureAuth = (req, res, next) => {
  console.log(req.headers.authorization);
  let token = req.headers.authorization;
  if (token) {
    token = token.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, "your-secret-key"); // Replace with your actual secret key
      console.log(decodedToken);
      const userId = decodedToken.userId;
      req.body.user = userId;
      next();
    } catch (error) {
      throw new HttpException(401, "Invalid token");
    }
  } else {
    throw new HttpException(401, "Not authorized");
  }
};

module.exports = EnsureAuth;
