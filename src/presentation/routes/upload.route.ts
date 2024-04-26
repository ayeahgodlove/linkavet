// src/infrastructure/routes/user-routes.ts
import { Router } from "express";
import { fileFilter } from "../../shared/helper/multer.config";
import multer from "multer";
import { UploadControllers } from "../controllers/upload.controller";

const uploadRouter = Router();

const uploadController = new UploadControllers();

function fileStorage(folderName: string) {
  return multer.diskStorage({
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

const upload = (folderName: string) =>
  multer({
    storage: fileStorage(folderName),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  });

uploadRouter.post(
  "/banners",
  upload("banners").single("image"),
  uploadController.uploadFile
);

// uploadRouter.post(
//   "/products",
//   upload("products").fields([{ name: "productImages", maxCount: 5,  }]),
//   uploadController.uploadFiles
// );

uploadRouter.post(
  "/products",
  upload("products").single("imageUrl"),
  uploadController.uploadFile
);

uploadRouter.post(
  "/posts",
  upload("posts").single("imageUrl"),
  uploadController.uploadFile
);

uploadRouter.post(
  "/documents",
  upload("documents").single("image"),
  uploadController.uploadFile
);

uploadRouter.post(
  "/courses",
  upload("courses").single("imageUrl"),
  uploadController.uploadFile
);

uploadRouter.post(
  "/stores",
  upload("stores").single("image"),
  uploadController.uploadFile
);

export default uploadRouter;