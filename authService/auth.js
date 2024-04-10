import jwt from "jsonwebtoken";
import "dotenv/config";
const secret = process.env.SECRET_KEY;
export const setUser = (user) => {
  return jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    secret
  );
};

export const getUser = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};
