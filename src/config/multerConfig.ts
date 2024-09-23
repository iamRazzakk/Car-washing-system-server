import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { cloudinaryConfig } from '.';

// Define the parameters type
interface CloudinaryParams {
  folder: string;
  allowed_formats: string[];
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryConfig,
  params: {
    folder: 'avatars',  
    allowed_formats: ['jpg', 'png', 'jpeg'],
  } as CloudinaryParams, 
});

export const upload = multer({ storage });
