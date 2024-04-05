import express from "express";
export const urlRouter = express.Router();
import {
  handleGenerateNewUrl,
  handleRedirectToOriginalUrl,
  handleAnalytics,
} from "../controller/urlController.mjs";

urlRouter.route("/").post(handleGenerateNewUrl);

urlRouter.route("/:shortId").get(handleRedirectToOriginalUrl);

urlRouter.route("/analytics/:shortId").get(handleAnalytics);
