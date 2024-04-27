"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/user-routes.ts
const express_1 = require("express");
const multer_config_1 = require("../../shared/helper/multer.config");
const multer_1 = __importDefault(require("multer"));
const upload_controller_1 = require("../controllers/upload.controller");
const uploadRouter = (0, express_1.Router)();
const uploadController = new upload_controller_1.UploadControllers();
function fileStorage(folderName) {
    return multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `./public/uploads/${folderName}`);
        },
        filename: (req, file, cb) => {
            const originalname = file.originalname;
            const filename = `${Date.now()}-${originalname
                .replace(/\s+/g, "")
                .toLowerCase()}`;
            cb(null, filename);
        },
    });
}
const upload = (folderName) => (0, multer_1.default)({
    storage: fileStorage(folderName),
    fileFilter: multer_config_1.fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});
uploadRouter.post("/banners", upload("banners").single("image"), uploadController.uploadFile);
// uploadRouter.post(
//   "/products",
//   upload("products").fields([{ name: "productImages", maxCount: 5,  }]),
//   uploadController.uploadFiles
// );
uploadRouter.post("/products", upload("products").single("imageUrl"), uploadController.uploadFile);
uploadRouter.post("/posts", upload("posts").single("imageUrl"), uploadController.uploadFile);
uploadRouter.post("/documents", upload("documents").single("image"), uploadController.uploadFile);
uploadRouter.post("/courses", upload("courses").single("imageUrl"), uploadController.uploadFile);
uploadRouter.post("/stores", upload("stores").single("imageBannerUrl"), uploadController.uploadFile);
exports.default = uploadRouter;