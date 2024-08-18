import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: {
        type: String, required: true,
    },
}, { timestamps: true });

const Color =
    mongoose.models.Color || mongoose.model("Color", colorSchema);

export default Color;
