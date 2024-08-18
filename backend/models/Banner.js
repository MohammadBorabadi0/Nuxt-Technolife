import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imageUrl: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    selectedLocationBanner: {
      type: String,
    },
  },
  { timestamps: true }
);

const Banner = mongoose.models.Banner || mongoose.model("Banner", bannerSchema);

export default Banner;
