import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import envConfig from "./config/env.config.js";
import cors from "cors";
import { format } from "date-fns";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

//BEGIN::Db connection
let dbSuccess = "Fail";
mongoose.set("strictQuery", false);
mongoose
  .connect(envConfig.db.URL, {
    dbName: `${envConfig.db.NAME}`,
  })
  .then(() => {
    dbSuccess = "Success";
    console.log("DB Connected");
  })
  .catch((error) => {
    console.log("data base error \n" + error);
  });
//END::Db connection

//BEGIN::Health Check
app.get("/health", async (req, res) => {
  const appKey =
    envConfig.general.APP_KEY === undefined ? "APP Key is missing!!!" : "OK";
  res.status(200).json({
    "DB Status": dbSuccess,
    Health: "OK",
    "App Key": appKey,
    Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    TimeNow: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  });
});
//END::Health Check

const PORT = 4000;

app.listen(process.env.PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
