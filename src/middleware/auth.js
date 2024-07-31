import jwt from "jsonwebtoken";
import Users from "../models/user.js";
import { config } from "dotenv";
import { sendError, sendResponse } from "../sender/sender.js";
config();

export const isUser = async (req, res, next) => {
  try {
    let token = req?.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return sendResponse(res, false, "You must be logged in");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await Users.findById(decoded._id);
    if (req.user.accessToken != token) {
      return res.status(203).json({ message: "You Must Be Logged In" });
    }
    next();
  } catch (error) {
    return sendError(res, error);
  }
};
