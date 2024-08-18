import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        color: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Color",
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      province: { type: String, required: true },
      city: { type: String, required: true },
      postalAddress: { type: String, required: true },
      postalCode: { type: String, required: true },
      quarter: { type: String, required: true },
      houseNumber: { type: Number, required: true },
      phoneNumber: { type: String, required: true },
    },
    paymentResult: {
      id: { type: String },
      status: {
        type: String,
        enum: [
          "awaiting payment",
          "processing",
          "delivered",
          "returned",
          "canceled and suspended",
        ],
        default: "awaiting payment",
      },
      update_time: { type: String },
      email_address: { type: String },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    sendCompany: {
      type: String,
      required: true,
    },
    totalPrices: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPricesAfterDiscount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingCost: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalDiscountAmount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
