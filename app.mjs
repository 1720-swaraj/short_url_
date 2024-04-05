import "dotenv/config";
import express from "express";
import { dbConnection } from "./config/dbConnection.mjs";
import {
  checkForAuthentication,
  restrictTo
} from "./middleware/authMiddleware.mjs";
import cookieParser from "cookie-parser";
import path from "path";

import { urlRouter } from "./routes/urlRouter.mjs";
import { staticRouter } from "./routes/staticRouter.mjs";
import { userRouter } from "./routes/userRouter.mjs";
const app = express();
const PORT = process.env.PORT || 8001;
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
app.listen(PORT, () => console.log(`listning to port ${PORT}`));
