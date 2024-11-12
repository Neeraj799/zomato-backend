import express from "express";
import "express-group-routes";

import multer from "multer";
import {
  getAlldishes,
  getCategoryDishes,
  getDish,
} from "../../controller/api/dish.controller.js";
import {
  getAllCategories,
  getCategory,
  getSortedDishes,
} from "../../controller/api/categories.controller.js";
import { getAllModifiers } from "../../controller/api/modifiers.controller.js";
import {
  addToCart,
  checkout,
  deleteItem,
  getAllCartItems,
  updateItem,
} from "../../controller/api/cart.controller.js";
import { signIn, signUp } from "../../controller/api/userAuth.controller.js";
import { UserAuthCheck } from "../../middleware/auth.middleware.js";
import { getAllOrders } from "../../controller/api/order.controller.js";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/sign-up", signUp);

router.post("/sign-in", signIn);

router.group("/dishes", (router) => {
  router.get("/", getAlldishes);
  router.get("/:id", getDish);
  router.get("/category/:categoryId", getCategoryDishes);
});

router.group("/categories", (router) => {
  router.get("/", getAllCategories);
  router.get("/:id", getCategory);
  router.get("/dishes/:categoryId", getSortedDishes);
});

router.group("/modifiers", (router) => {
  router.get("/", getAllModifiers);
});

router.group("/cart", (router) => {
  router.get("/", UserAuthCheck, getAllCartItems);
  router.post("/addItems", upload.any(), UserAuthCheck, addToCart);
  router.delete("/deleteItem/:itemId", UserAuthCheck, deleteItem);
  router.patch("/updateItem/:itemId", UserAuthCheck, updateItem);
  router.post("/checkout", upload.any(), UserAuthCheck, checkout);
});

router.group("/orders", (router) => {
  router.get("/", getAllOrders);
});

export default router;
