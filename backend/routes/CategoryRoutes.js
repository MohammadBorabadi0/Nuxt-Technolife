import { protect, admin } from "../middlewares/authMiddleware.js";
import ImageUpload from "../middlewares/uploadMiddleware.js";

import express from "express";
const router = express.Router();
import {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
} from "../controllers/CategoryController.js";

router.route("/").get(getCategories).post(protect, ImageUpload, createCategory);
router
  .route("/:id")
  .put(protect, ImageUpload, updateCategory)
  .delete(deleteCategory)
  .get(getCategoryById);

export default router;
