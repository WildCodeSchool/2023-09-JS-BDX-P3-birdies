const jwt = require("jsonwebtoken");
const models = require("../../models");

const authMiddleware = (req, res, next) => {
  // Step 1: denied access without token
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Tu rentres pas !" });
  }
  // step 2: verify token then set user data in req
  return jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.APP_SECRET,
    (err, data) => {
      if (err) {
        return res.status(401).json({ error: err.message });
      }
      // step 3: get user data from token payload
      models.user.getProfile(data.id).then(([result]) => {
        if (!result.length) {
          return res.status(401).json({ error: "tu n'exites plus" });
        }
        // step 4: share user data from different middlewares
        const [firstResult] = result;
        req.user = firstResult;
        return next();
      });
      return null;
    }
  );
  // return next();
};

module.exports = { authMiddleware };
