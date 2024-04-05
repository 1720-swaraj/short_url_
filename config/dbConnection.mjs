import mongoose from "mongoose";
export const dbConnection = async (req, res) => {
  return await mongoose.connect(process.env.MONGODB_URL);
};
