import express from "express";
const router = express.Router();
import {
  createOrder,
  deleteOrderById,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/OrderController.js";
import { protect } from "../middlewares/authMiddleware.js";

router.route("/my").get(protect, getMyOrders);
router.route("/").get(getAllOrders).post(protect, createOrder);
router
  .route("/:id")
  .delete(deleteOrderById)
  .get(getOrderById)
  .put(updateOrderStatus);
// router.route("/:id/delivered").put(updateOrderToDelivered);
// router.route("/:id/returned").put(updateOrderToReturend);

export default router;
