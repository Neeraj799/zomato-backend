import jwt from "jsonwebtoken";
import envConfig from "../config/env.config.js";
import Admin from "../models/admin/admin.js";
import User from "../models/admin/user.js";

const AdminAuthCheck = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, envConfig.general.APP_KEY, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Unauthorized" });
        } else {
          const user = await Admin.findOne({ _id: decoded.id });

          if (user) {
            req.userId = user._id;
            console.log("authorized");
            next();
          } else {
            return res.status(401).json({ error: "user not found" });
          }
        }
      });
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const UserAuthCheck = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, envConfig.general.APP_KEY, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Unauthorized" });
        } else {
          const user = await User.findOne({ _id: decoded.id });

          if (user) {
            req.userId = user._id;
            console.log("authorized");
            next();
          } else {
            return res.status(401).json({ error: "user not found" });
          }
        }
      });
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { AdminAuthCheck, UserAuthCheck };
