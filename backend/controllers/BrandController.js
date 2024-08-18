import mongoose from "mongoose";
import asyncHandler from "../middlewares/async.js";
import Brand from "../models/Brand.js";
import Category from "../models/Category.js";

const getBrands = asyncHandler(async (req, res) => {
  try {
    const brands = await Brand.find();
    return res.json({ success: true, data: brands });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "مشکلی در ارتباط با سرور به وجود آمد" });
  }
});

const getBrandById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findOne({ _id: id });

    console.log("****************");
    console.log({ brand });

    if (!brand) {
      return res
        .status(404)
        .json({ success: false, message: "برند با این مشخصات پیدا نشد" });
    }

    return res.status(200).json({ success: true, data: brand });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "مشکلی در ارتباط با سرور به وجود آمد" });
  }
});

const createBrand = asyncHandler(async (req, res) => {
  try {
    const { name, categories } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "نام برند مورد نظر را وارد کنید ",
      });
    }

    const brand = new Brand({ name });

    for (const item of categories) {
      const { category: categoryId, imageUrl } = item;

      let existingCategory = await Category.findById(categoryId);
      if (!existingCategory) {
        existingCategory = await Category.create({
          _id: categoryId,
        });
      }

      brand.categories.push({
        category: existingCategory._id,
        imageUrl,
        showInHomePage: imageUrl ? true : false,
      });
    }

    await brand.save();

    return res.json({
      success: true,
      data: brand,
      message: "برند با موفقیت ایجاد شد",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json("مشکلی بوجود آمده است. لطفا دوباره امتحان کنید.");
  }
});

const updateBrand = asyncHandler(async (req, res) => {
  try {
    const { name, categories } = req.body;
    const { id: brandId } = req.params;

    console.log(req.body);

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "نام برند مورد نظر را وارد کنید ",
      });
    }

    const brand = await Brand.findOne({ _id: brandId });

    for (const item of categories) {
      const { category: categoryId, imageUrl } = item;

      let existingCategory = await Category.findById(categoryId);
      if (!existingCategory) {
        existingCategory = await Category.create({
          _id: categoryId,
        });
      }
    }

    brand.name = name || brand.name;
    brand.categories = categories;

    console.log({ brand });

    await brand.save();

    res.status(200).json({
      success: true,
      message: "برند با موفقیت ویرایش شد",
      data: brand,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "هنگام ویرایش برند مشکلی به وجود آمد لطفا مجددا تلاش کنید",
      error,
    });
  }
});

const deleteBrand = asyncHandler(async (req, res) => {
  const { id: brandId } = req.params;

  // const allCategories = await Category.find({});

  // Filter and update the brands in each category
  // const updatedCategories = allCategories.map((category) => {
  //   const filteredBrands = category.brand.filter(
  //     (brand) => brand.toString() !== brandId
  //   );
  //   category.brand = filteredBrands;
  //   return category.save();
  // });

  // // Wait for all category updates to complete
  // await Promise.all(updatedCategories);

  const brand = await Brand.findOne({ _id: brandId });
  console.log({ brand });

  await Brand.findByIdAndDelete(brandId);

  return res.json({ success: true, message: "برند با موفقیت حذف شد" });
});

export { getBrands, getBrandById, createBrand, updateBrand, deleteBrand };
