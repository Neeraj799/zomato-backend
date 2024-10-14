import jwt from "jsonwebtoken";
import envConfig from "../config/env.config.js";

const createToken = (id) => {
  return jwt.sign({ id }, envConfig.general.APP_KEY, { expiresIn: "24h" });
};

export default createToken;
