import express from "express";
import "express-group-routes";

import multer from "multer";
import { getAlldishes, getDish } from "../../controller/api/dish.controller.js";
import {
  getAllCategories,
  getCategory,
} from "../../controller/api/categories.controller.js";
import { getAllModifiers } from "../../controller/api/modifiers.controller.js";
import {
  addToCart,
  deleteItem,
  getAllCartItems,
} from "../../controller/api/cart.controller.js";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.group("/dishes", (router) => {
  router.get("/", getAlldishes);
  router.get("/:id", getDish);
});

router.group("/categories", (router) => {
  router.get("/", getAllCategories);
  router.get("/:id", getCategory);
});

router.group("/modifiers", (router) => {
  router.get("/", getAllModifiers);
});

router.group("/cart", (router) => {
  router.get("/", getAllCartItems);
  router.post("/addItems", upload.any(), addToCart);
  router.delete("/:id", deleteItem);
});

export default router;
