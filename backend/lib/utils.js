import jsonwebtoken from "jsonwebtoken";
import passport from "passport";

const issueRefreshToken = (userId) => {
  const refreshToken = jsonwebtoken.sign(
    { sub: userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return refreshToken;
};

const issueAccessToken = (userId) => {
  const accessToken = jsonwebtoken.sign(
    { sub: userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  return accessToken;
};

const optionalJwt = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (user) {
      req.user = user;
    }

    if (!user && req.cookies.refreshToken) {
      return res.status(401).json({ message: "Access token invalid, attempt refresh" });
    }

    next();
  })(req, res, next);
};

export { issueRefreshToken, issueAccessToken, optionalJwt };
