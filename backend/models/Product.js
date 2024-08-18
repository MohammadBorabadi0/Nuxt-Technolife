// models/Product.js
import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    positivePoints: { type: String },
    negativePoints: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Define the product schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Brand",
    },
    reviews: [reviewSchema],
    description: {
      type: String,
    },
    orderCount: { type: Number, default: 0 },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    discountTime: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    images: [
      {
        file: {
          type: String,
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    specifications: {
      simplePhone: { type: Boolean, default: false },
      flagship: { type: Boolean, default: false },
      gaming: { type: Boolean, default: false },
      fiveG: { type: Boolean, default: false },
      cpu: { type: String },
      gpu: { type: String },
      ram: { type: String },
      os: { type: String },
      memory: { type: String },
      screenSize: { type: String },
      screenType: { type: String },
      mainCamera: { type: String },
      selfieCamera: { type: String },
      battery: { type: String },
      sensors: { type: String },
      connectionType: { type: String },
      bluetooth: { type: String },
      weight: { type: String },
      dimensions: { type: String },
      outputPower: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

// ----------------------------------------------------------------------

// import mongoose from "mongoose";

// const reviewSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     rating: { type: Number, required: true },
//     comment: { type: String, required: true },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'User',
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     countInStock: { type: Number, required: true, default: 0 },
//     numReviews: { type: Number, required: true, default: 0 },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'User',
//     },
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'Category',
//     },
//     brand: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'Brand',
//     },
//     reviews: [reviewSchema],
//     rating: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     description: { type: String },
//     discount: { type: Number, default: 0 },
//     images: [
//       {
//         url: { type: String, required: true },
//         colorName: { type: String, required: true },
//         colorCode: { type: String, required: true },
//         price: { type: Number, required: true },
//       },
//     ],
//     specifications: {
//       cpu: { type: String },
//       gpu: { type: String },
//       ram: { type: String },
//       os: { type: String },
//       memory: { type: String },
//       screenSize: { type: String },
//       screenType: { type: String },
//       mainCamera: { type: String },
//       selfieCamera: { type: String },
//       battery: { type: String },
//       sensors: { type: String },
//       connectionType: { type: String },
//       bluetooth: { type: String },
//       weight: { type: String },
//       dimensions: { type: String },
//       outputPower: { type: String },
//     }
//   },
//   { timestamps: true }
// );

// const Product =
//   mongoose.models.Product || mongoose.model("Product", productSchema);

// export default Product;
