import express from "express";
import {
  createMenu,
  dashboard,
} from "../../controller/admin/admin.controller.js";
import { signIn } from "../../controller/admin/adminAuth.controller.js";

const router = express.Router();

router.post("/sign-in", signIn);

// router.get("sign-out", signOut);

// router.use(AdminAuthCheck);

router.get("/dashboard", dashboard);

// router.get("/:id", getFoodItem);

router.post("/", createMenu);

// router.delete("/:id", deleteFoodItem);

// router.patch("/:id", updateFoodItem);

export default router;
