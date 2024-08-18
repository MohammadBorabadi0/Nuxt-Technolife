import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
} from "../controllers/ProductControllers.js";
import { protect } from "../middlewares/authMiddleware.js";
import saveImageMiddleware from "../middlewares/uploadMiddleware.js";
import checkObjectId from "../middlewares/checkObjectId.js";

router
  .route("/")
  .get(getProducts)
  .post(protect, saveImageMiddleware, createProduct);

router.route("/:id/reviews").post(protect, checkObjectId, createProductReview);

router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .delete(protect, checkObjectId, deleteProduct)
  .put(protect, checkObjectId, saveImageMiddleware, updateProduct);

export default router;
