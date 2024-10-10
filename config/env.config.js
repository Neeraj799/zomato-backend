import dotenv from "dotenv";
dotenv.config();

const envConfig = {
  general: {
    PORT: process.env.PORT || 8080,
    APP_KEY: process.env.APP_KEY || "testkey",
  },
  db: {
    URL: process.env.DB_CONNECTION,
    NAME: process.env.DB_NAME,
  },
};

export default envConfig;
