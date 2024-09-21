import multer from 'multer';
import { Request } from 'express';

const storage = multer.memoryStorage(); 

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); 
  } else {
    cb(new Error('Not an image! Please upload images only.'), false);
  }
};

export const upload = multer({ storage, fileFilter });
