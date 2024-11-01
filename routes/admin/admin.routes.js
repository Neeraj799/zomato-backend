import express from "express";
import "express-group-routes";
import {
  createDish,
  deleteDish,
  getAlldishes,
  getDish,
  updateDish,
} from "../../controller/admin/admin.controller.js";
import { signIn } from "../../controller/admin/adminAuth.controller.js";
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

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/sign-in", signIn);

// router.get("sign-out", signOut);

// router.use(AdminAuthCheck);

router.group("/dishes", (router) => {
  router.get("/", getAlldishes);
  router.get("/:id", getDish);
  router.post("/create", upload.any(), createDish);
  router.delete("/:id", deleteDish);
  router.patch("/:id", updateDish);
});

router.group("/categories", (router) => {
  router.get("/", getAllCategories);
  router.post("/createCategory", upload.any(), createCategory);
  router.get("/:id", getCategory);
  router.patch("/:id", updateCategory);
  router.delete("/:id", deleteCategory);
});

router.group("/modifiers", (router) => {
  router.get("/", getAllModifiers);
  router.post("/create", upload.any(), createModifier);
  router.get("/:id", getModifier);
  router.patch("/:id", updateModifier);
  router.delete("/:id", deleteModifier);
});

export default router;
