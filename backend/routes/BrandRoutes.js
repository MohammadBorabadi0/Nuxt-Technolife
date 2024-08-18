import express from "express";
import ImageUpload from "../middlewares/uploadMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
import {
  getBrands,
  createBrand,
  deleteBrand,
  getBrandById,
  updateBrand,
} from "../controllers/BrandController.js";

router.route("/").get(getBrands).post(protect, createBrand);
router
  .route("/:id")
  .delete(deleteBrand)
  .get(getBrandById)
  .put(protect, updateBrand);

export default router;
