import { nanoid } from "nanoid";
import mongoose from "mongoose";
import { url } from "../models/urlModel.mjs";
import { userSchema } from "../models/users.mjs";

export const handleGenerateNewUrl = async (req, res) => {
  const body = req.body;
  if (!body.redirectUrl)
    return res.status(400).json({ error: "url is required" });
  const shortId = nanoid(8);
  await url.create({
    shortId: shortId,
    redirectUrl: body.redirectUrl,
    visitHistory: [],
    createdBy: req.userdata._id, //user
  });
  return res.render("urlHome", {
    id: shortId,
  });
};

export const handleRedirectToOriginalUrl = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await url.findOneAndUpdate(
    {
      shortId: shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (entry && entry.redirectUrl) {
    res.redirect(entry.redirectUrl);
  } else {
    res.status(404).send("Redirect URL not found");
  }
};

export const handleAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await url.findOne({ shortId: shortId });
  res.json({
    totalVisit: `${result.visitHistory.length}`,
    analytics: `${result.visitHistory}`,
  });
};
