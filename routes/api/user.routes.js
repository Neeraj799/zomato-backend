import express from "express";
import "express-group-routes";

import multer from "multer";
import { getAlldishes } from "../../controller/api/dish.controller.js";
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.group("/dishes", (router) => {
  router.get("/", getAlldishes);
});

export default router;
