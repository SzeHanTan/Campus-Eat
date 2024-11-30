// backend/middleware/uploadMiddleware.js
import multer from 'multer';
import path from 'path';

// Define the storage location and file naming convention for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the directory to store uploaded files
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Name the file using the current timestamp to avoid conflicts
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Create the upload instance using multer with the storage configuration
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024, // Limit file size to 2MB
    },
}).single('paymentScreenshot'); // Accept only one file with the field name 'paymentScreenshot'

export default upload;

