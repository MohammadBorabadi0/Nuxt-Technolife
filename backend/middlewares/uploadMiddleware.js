import multer from 'multer';
import path from 'path';
import fs from 'fs';

const allowedFileFormats = ['.png', '.jpg', '.jpeg', '.webp'];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extname = path.extname(file.originalname);
        cb(null, file.originalname + '-' + uniqueSuffix + extname);
    }
});

const fileFilter = function (req, file, cb) {
    const extname = path.extname(file.originalname).toLowerCase();
    if (allowedFileFormats.includes(extname)) {
        cb(null, true);
    } else {
        cb(new Error(`تصویر فقط با فرمت های ${allowedFileFormats} باشد`));
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const saveImageMiddleware = (req, res, next) => {
    console.log({ body: req.body });
    
    upload.single('image')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ success: false, message: 'مشکلی در آپلود عکس بوجود آمد لطفا دوباره امتحان کنید' });
        } else if (err) {
            return res.status(500).json({ success: false, message: `تصویر فقط با فرمت های ${allowedFileFormats} باشد` });
        }
        next();
    });
};

export default saveImageMiddleware;
