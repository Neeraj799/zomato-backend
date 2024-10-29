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
  imagekit: {
    PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
    PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    URL: process.env.IMAGEKIT_URL,
    FOLDER: process.env.IMAGEKIT_FOLDER,
  },
};

export default envConfig;
