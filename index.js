import "dotenv/config";
import express from "express";
import { dbConnection } from "./config/dbConnection.js";
import {
  checkForAuthentication,
  restrictTo
} from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import path from "path";

import { urlRouter } from "./routes/urlRouter.js";
import { staticRouter } from "./routes/staticRouter.js";
import { userRouter } from "./routes/userRouter.js";
const app = express();
const PORT = process.env.PORT || 8000;
dbConnection();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication)
app
  .use("/url",restrictTo(["NORMAL","ADMIN"]), urlRouter)
  .use("/user", userRouter)
  .use("/", staticRouter);
app.listen(process.env.PORT, () => console.log(`listning to port ${PORT}`));
