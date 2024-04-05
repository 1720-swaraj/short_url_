import { userSchema } from "../models/users.mjs";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../authService/auth.mjs";
export const handleUserSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  await userSchema.create({
    name,
    email,
    password,
  });
  return res.redirect("/login");
};
export const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const findEmailAndPassword = await userSchema.findOne({ email, password });
  if (!findEmailAndPassword) {
    return res.render("userLogin", {
      error: "Invalid UserName and Password",
    });
  }

  const token = setUser(findEmailAndPassword);
  res.cookie("token", token);
  return res.redirect("/");
};
