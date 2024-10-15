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
  getAllCategories,
} from "../../controller/admin/admin.categories.js";

const router = express.Router();

router.post("/sign-in", signIn);

// router.get("sign-out", signOut);

// router.use(AdminAuthCheck);

router.group("/dishes", (router) => {
  router.get("/", getAlldishes);
  router.get("/:id", getDish);
  router.post("/create", createDish);
  router.delete("/:id", deleteDish);
  router.patch("/:id", updateDish);
});

router.group("/categories", (router) => {
  router.get("/", getAllCategories);
  router.post("/createCategory", createCategory);
});

// router.get("/catagory/:id", getCategory);

// router.delete("/category/:id", deleteCategory);

// router.patch("/category/:id", updateCategory);

export default router;
