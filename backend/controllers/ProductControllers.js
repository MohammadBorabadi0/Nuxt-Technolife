import asyncHandler from "../middlewares/async.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Brand from "../models/Brand.js";

const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "سرور ارور" });
  }
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  console.log({ images: product.images });

  return res.json({ success: true, data: product });
});

const createProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      category,
      images,
      countInStock,
      discount,
      discountTime,
      specifications,
    } = req.body;

    console.log(req.body);

    if (!(name || brand || category || images.length || description)) {
      return res.status(400).json({
        success: false,
        message: "لطفا مقادیر ستاره دار را وارد کنید",
      });
    }

    const newProduct = await Product.create({
      name,
      description,
      brand,
      category,
      images,
      countInStock,
      discount,
      discountTime,
      specifications,
    });

    return res.status(201).json({
      success: true,
      data: newProduct,
      message: "محصول با موفقیت ایجاد شد",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "مشکلی در ارتباط با سرور بوجود آمد",
    });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "محصولی با این مشخصات پیدا نشد" });
    }
    return res
      .status(200)
      .json({ success: true, message: "محصول با موفقیت حذف شد" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "مشکلی در ارتباط با سرور بوجود آمد" });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      category,
      images,
      countInStock,
      discount,
      discountTime,
      specifications,
    } = req.body;

    const {
      cpu,
      gpu,
      ram,
      os,
      memory,
      screenSize,
      screenType,
      mainCamera,
      selfieCamera,
      battery,
      sensors,
      connectionType,
      bluetooth,
      dimensions,
      weight,
      outputPower,
      simplePhone,
    } = specifications;

    const findCategory = await Category.findOne({ _id: category });
    const findBrand = await Brand.findOne({ _id: brand });

    const product = await Product.findOne({ _id: req.params.id });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "محصولی با این مشخصات پیدا نشد" });
    }

    product.name = name || product.name;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.description = description || product.description;
    product.countInStock = countInStock || product.countInStock;
    product.discount = discount || product.discount;
    product.discountTime = discountTime || product.discountTime;
    product.specifications.battery = battery || product.specifications.battery;
    product.specifications.bluetooth =
      bluetooth || product.specifications.bluetooth;
    product.specifications.connectionType =
      connectionType || product.specifications.connectionType;
    product.specifications.screenSize =
      screenSize || product.specifications.screenSize;
    product.specifications.screenType =
      screenType || product.specifications.screenType;
    product.specifications.cpu = cpu || product.specifications.cpu;
    product.specifications.gpu = gpu || product.specifications.gpu;
    product.specifications.mainCamera =
      mainCamera || product.specifications.mainCamera;
    product.specifications.selfieCamera =
      selfieCamera || product.specifications.selfieCamera;
    product.specifications.ram = ram || product.specifications.ram;
    product.specifications.os = os || product.specifications.os;
    product.specifications.memory = memory || product.specifications.memory;
    product.specifications.weight = weight || product.specifications.weight;
    product.specifications.dimensions =
      dimensions || product.specifications.dimensions;
    product.specifications.sensors = sensors || product.specifications.sensors;
    product.specifications.outputPower =
      outputPower || product.specifications.outputPower;
    product.specifications.simplePhone =
      simplePhone || product.specifications.simplePhone;
    product.images = images || product.images;

    // if (!findCategory.brand.includes(findBrand._id)) {
    //   findCategory.brand.push(findBrand._id);
    // }

    // await findCategory.save();
    await product.save();

    return res.status(201).json({
      success: true,
      data: product,
      message: "محصول با موفقیت ویرایش شد",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "مشکلی در ارتباط با سرور بوجود آمد",
    });
  }
});

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment, positivePoints, negativePoints } = req.body;

  console.log("=================================");
  console.log(req.user, rating, comment, positivePoints, negativePoints);
  console.log("=================================");

  if (!(rating || comment)) {
    return res.status(400).json({
      success: false,
      message: "لطفا نظر و امتیاز خود به این محصول را وارد کنید",
    });
  }

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({
          success: false,
          message: "شما از قبل نظری را برای این محصول اضافه کرده اید.",
        });
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        positivePoints,
        negativePoints,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res
        .status(201)
        .json({ success: true, message: "نظر شما با موفقیت اضافه شد" });
    } else {
      res
        .status(404)
        .json({ success: false, message: "محصولی با این مشخصات پیدا نشد" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "مشکلی در ارتباط با سرور به وجود آمد.",
    });
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
};
