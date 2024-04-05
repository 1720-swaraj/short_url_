import express from "express";
import { url } from "../models/urlModel.mjs";
import { userSchema } from "../models/users.mjs";
import { restrictTo } from "../middleware/authMiddleware.mjs";
export const staticRouter = express.Router();

staticRouter
  .route("/admin/urls")
  .get(restrictTo(["ADMIN"]), async (req, res) => {
    const urls = await url.find({}); //user
    return res.render("urlHome", {
      urldata: urls,
    });
  });

staticRouter
  .route("/")
  .get(restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    const urls = await url.find({ createdBy: req.userdata._id }); //user
    return res.render("urlHome", {
      urldata: urls,
    });
  });

staticRouter.route("/signup").get(async (req, res) => {
  const userDetails = await userSchema.find({});
  return res.render("userHome", {
    users: userDetails,
  });
});

staticRouter.route("/login").get(async (req, res) => {
  return res.render("userLogin");
});
