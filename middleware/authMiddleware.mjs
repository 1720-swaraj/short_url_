import { getUser } from "../authService/auth.mjs";

export const checkForAuthentication = (req, res, next) => {
  const tokenCookie = req.cookies?.token;
  req.userdata = null;

  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);
  req.userdata = user;

  return next();
};

export const restrictTo =
  (roles = []) =>
  (req, res, next) => {
    if (!req.userdata) return res.redirect("/login");

    if (!roles.includes(req.userdata.role)) return res.end("Unauthorized");
    return next();
  };
