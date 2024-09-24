import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}-avatar-${Date.now()}.${file.mimetype.split("/")[1]}`);
  },
});

export const upload = multer({ storage: storage });
