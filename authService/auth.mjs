import jwt from "jsonwebtoken";
const secret = "swaraj*123";
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
