import express from "express";
import "express-group-routes";
import {
  createDish,
  deleteDish,
  getAlldishes,
  getDish,
  updateDish,
} from "../../controller/admin/admin.controller.js";
import { signIn, signUp } from "../../controller/admin/adminAuth.controller.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../../controller/admin/admin.categories.js";
import multer from "multer";
import {
  createModifier,
  deleteModifier,
  getAllModifiers,
  getModifier,
  updateModifier,
} from "../../controller/admin/admin.modifiers.js";
import { AdminAuthCheck } from "../../middleware/auth.middleware.js";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/sign-in", signIn);

router.post("/sign-up", signUp);

router.group("/dishes", (router) => {
  router.get("/", AdminAuthCheck, getAlldishes);
  router.get("/:id", getDish);
  router.post("/create", upload.any(), createDish);
  router.delete("/:id", deleteDish);
  router.patch("/:id", upload.any(), updateDish);
});

router.group("/categories", (router) => {
  router.get("/", AdminAuthCheck, getAllCategories);
  router.post("/createCategory", upload.any(), createCategory);
  router.get("/:id", getCategory);
  router.patch("/:id", upload.any(), updateCategory);
  router.delete("/:id", deleteCategory);
});

router.group("/modifiers", (router) => {
  router.get("/", AdminAuthCheck, getAllModifiers);
  router.post("/create", upload.any(), createModifier);
  router.get("/:id", getModifier);
  router.patch("/:id", upload.any(), updateModifier);
  router.delete("/:id", deleteModifier);
});

export default router;
