import Banner from "../models/Banner.js";
import asyncHandler from "../middlewares/async.js";

const getAllBanners = asyncHandler(async (req, res) => {
  try {
    const banners = await Banner.find();
    return res.status(200).json({ success: true, data: banners });
  } catch (error) {
    res
      .status(500)
      .json({ succses: false, message: "مشکلی در ارتباط با سرور به وجود آمد" });
  }
});

const getBanner = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findOne({ _id: id });

    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "بنری با این مشخصات پیدا نشد" });
    }

    return res.status(200).json({ success: true, data: banner });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "مشکلی در ارتباط با سرور به وجود آمد" });
  }
});

const createBanner = asyncHandler(async (req, res) => {
  try {
    const file = req.file;
    const { name, url, selectedLocationBanner } = req.body;

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "لطفا تصویر را وارد کنید" });
    }

    if (name.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "لطفا نام بنر را وارد کنید" });
    }
    const newBanner = new Banner({
      imageUrl: file.filename,
      name,
      url,
      selectedLocationBanner: selectedLocationBanner
        ? selectedLocationBanner
        : null,
    });

    await newBanner.save();
    return res.status(201).json({
      success: true,
      data: newBanner,
      message: "بنر با موفقیت ایجاد شد",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ succses: false, message: "مشکلی در ارتباط با سرور به وجود آمد" });
  }
});

const updateBanner = asyncHandler(async (req, res) => {
  try {
    const file = req.file;
    const { name, url, selectedLocationBanner } = req.body;
    const { id } = req.params;

    console.log("$$$$$$$$$$$$$$$$$$$");
    console.log(req.body);

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "لطفا تصویر را وارد کنید" });
    }

    if (name.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "لطفا نام بنر را وارد کنید" });
    }

    const banner = await Banner.findOne({ _id: id });

    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "بنر مورد نظر یافت نشد" });
    }

    banner.imageUrl = file.filename || banner.imageUrl;
    banner.name = name || banner.name;
    banner.url = url || banner.url;
    banner.selectedLocationBanner = selectedLocationBanner;
    await banner.save();

    console.log({ banner });

    return res.status(201).json({
      success: true,
      data: banner,
      message: "بنر با موفقیت ایجاد شد",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ succses: false, message: "مشکلی در ارتباط با سرور به وجود آمد" });
  }
});

const deleteBanner = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBanner = await Banner.findByIdAndDelete(id);

    if (deletedBanner) {
      return res
        .status(200)
        .json({ success: true, message: "بنر با موفقیت حذف شد" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "بنری با این مشخصات پیدا نشد" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ succses: false, message: "مشکلی در ارتباط با سرور به وجود آمد" });
  }
});

const deleteAllBanners = asyncHandler(async (req, res) => {
  try {
    await Banner.deleteMany();
    return res
      .status(200)
      .json({ success: true, message: "همه بنر ها با موفقیت حذف شدند" });
  } catch (error) {
    res
      .status(500)
      .json({ succses: false, message: "مشکلی در ارتباط با سرور به وجود آمد" });
  }
});

export {
  getAllBanners,
  getBanner,
  createBanner,
  updateBanner,
  deleteBanner,
  deleteAllBanners,
};
