import asyncHandler from "../middlewares/async.js";
import Color from "../models/Color.js";

const getAllColors = asyncHandler(async (req, res) => {
    try {
        const colors = await Color.find();
        return res.status(200).json({ success: true, data: colors });
    } catch (error) {
        return res.status(500)
            .json({ success: false, message: 'مشکلی در ارتباط با سرور به وجود آمد' });
    }
});

const getColorById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const color = await Color.findOne({ _id: id });
        if (!color) {
            return res.status(404)
                .json({ success: false, message: 'رنگ با این مشخصات پیدا نشد' })
        }

        return res.status(200).json({ success: true, data: color });

    } catch (error) {
        return res.status(500)
            .json({ success: false, message: 'مشکلی در ارتباط با سرور به وجود آمد' });
    }
});

const createColor = asyncHandler(async (req, res) => {
    try {
        const { name, code } = req.body;
        const newColor = Color.create({
            name, code
        });
        return res.status(201).json({ success: true, data: newColor });
    } catch (error) {
        console.log(error);
        return res.status(500)
            .json({ success: false, message: 'مشکلی در ارتباط با سرور به وجود آمد' });
    }
});

const updateColor = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { name, code } = req.body;

        const color = await Color.findOne({ _id: id });

        if (!color) {
            return res.status(404)
                .json({ success: false, message: 'رنگی با این مشخصات پیدا نشد' });
        }

        color.name = name || color.name;
        color.code = code || color.code;

        await color.save();

        return res.status(200).json({ success: true, data: color });
    } catch (error) {
        console.log(error);
        return res.status(500)
            .json({ success: false, message: 'مشکلی در ارتباط با سرور بوجود آمد' })
    }
});

const deleteColor = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const color = await Color.findOne({ _id: id });

        if (!color) {
            return res.status(404).json({ success: false, message: 'رنگ با این مشخصات پیدا نشد' });
        }

        await Color.deleteOne({ _id: id });

        return res.status(200).json({ success: true, message: 'رنگ با موفقیت حذف شد' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'مشکلی در ارتباط با سرور به وجود آمد' });
    }
});

export { getAllColors, getColorById, createColor, updateColor, deleteColor }