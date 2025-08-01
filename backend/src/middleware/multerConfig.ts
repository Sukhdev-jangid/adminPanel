import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "uploads/");
    },
    filename:(req,file,cb)=>{
        const ext = path.extname(file.originalname);
        const filename = `${file.fieldname}-${Date.now()}${ext}`;
        cb(null, filename);
    },
});

// File Filter - Allow images & videos
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedImageTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  const allowedVideoTypes = ["video/mp4", "video/mkv", "video/webm", "video/avi"];

  if (allowedImageTypes.includes(file.mimetype) || allowedVideoTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type! Only images and videos are allowed."));
  }
};

const MAX_SIZE = 1024 * 1024 * 1024; 

export const upload = multer({ storage, fileFilter, limits: { fileSize: MAX_SIZE } });