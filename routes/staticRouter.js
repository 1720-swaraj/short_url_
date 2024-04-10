import express from "express";
import { url } from "../models/urlModel.js";
import { userSchema } from "../models/users.js";
import { restrictTo } from "../middleware/authMiddleware.js";
export const staticRouter = express.Router();

staticRouter
  .route("/admin/urls")
  .get(restrictTo(["ADMIN"]), async (req, res) => {
    try {
      const urls = await url.find({}); //user
      return res.render("urlHome", {
        urldata: urls,
      });
    } catch (error) {
      console.error("Error fetching URLs:", error);
      res.status(500).send("Internal Server Error");
    }
  });

staticRouter
  .route("/")
  .get(restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    try {
      const urls = await url.find({ createdBy: req.userdata._id }); //user
      return res.render("urlHome", {
        urldata: urls,
      });
    } catch (error) {
      console.error("Error fetching user URLs:", error);
      res.status(500).send("Internal Server Error");
    }
  });

staticRouter.route("/signup").get(async (req, res) => {
  try {
    const userDetails = await userSchema.find({});
    return res.render("userHome", {
      users: userDetails,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).send("Internal Server Error");
  }
});

staticRouter.route("/login").get(async (req, res) => {
  return res.render("userLogin");
});
