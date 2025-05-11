import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import passport from "passport";
import configurePassport from "./config/passport.js";

const app = express();

configurePassport(passport);

app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://members-only-production-2bc4.up.railway.app/",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Origin: ", req.headers.origin);
  next();
});

app.use(userRouter);
app.use(messageRouter);

app.use((err, req, res, next) => {
  console.log(err);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
