import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import pool from "./database.js";
import "dotenv/config";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
  algorithms: ["HS256"],
};

const strategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      payload.sub,
    ]);
    const user = result.rows[0];
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    done(err, null);
  }
});

export default function configurePassport(passport) {
  passport.use(strategy);
}
