import {fileURLToPath} from "url";
import path from "path";
import multer from "multer";
import {v4 as uuidv4} from "uuid";
import * as fs from "fs";
import ApiError from "../exeptions/api-error.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../uploads'))
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname + '-' + uuidv4() +'.'+ file.mimetype.split('/')[1]}`);
    }
});
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(ApiError.BadRequestError(403, 'Invalid file type. Only JPEG and PNG files are allowed.'), false);
    }
}
export const uploadWithFilter = multer({
    storage: storage,
    fileFilter: fileFilter
});

export const deleteFile = async (filename) => {
    const filePath = path.join(`${process.cwd()}\\uploads\\`, filename);

    await fs.unlink(filePath, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return ApiError.BadRequestError(404, 'File not found')
            }
            return ApiError.InternalServerError()
        }
    });
}