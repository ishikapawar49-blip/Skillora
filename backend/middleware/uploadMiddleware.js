import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import path from "path";

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(file.originalname, ext);

    const isPDF = ext === ".pdf";

    return {
      folder: "skillora_services",

      // IMPORTANT
      resource_type: isPDF ? "raw" : "image",

      format: isPDF ? "pdf" : undefined,

      public_id: Date.now() + "-" + baseName.replace(/\s+/g, "-"),
    };
  },
});

const upload = multer({ storage });

export default upload;