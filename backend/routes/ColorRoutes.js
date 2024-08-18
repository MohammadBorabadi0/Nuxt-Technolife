import express from 'express';
const router = express.Router();
import { getAllColors, createColor, updateColor, getColorById, deleteColor } from '../controllers/ColorController.js';

router.route('/').get(getAllColors).post(createColor);
router.route('/:id').get(getColorById).put(updateColor).delete(deleteColor);

export default router;