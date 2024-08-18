import express from "express";
import {
  createBanner,
  deleteBanner,
  getAllBanners,
  getBanner,
  deleteAllBanners,
  updateBanner,
} from "../controllers/BannerController.js";
import saveImageMiddleware from "../middlewares/uploadMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllBanners)
  .post(saveImageMiddleware, createBanner)
  .delete(deleteAllBanners);
router
  .route("/:id")
  .delete(protect, deleteBanner)
  .get(protect, getBanner)
  .put(saveImageMiddleware, updateBanner);
// router.route("/:id").delete(deleteBrand).get(getBrandById).put(updateBrand);

export default router;
