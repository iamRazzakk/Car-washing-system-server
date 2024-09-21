import { cloudinaryConfig } from "../../config";

export const uploadToCloudinary = async (fileBuffer: Buffer, folder: string) => {
    try {
      const result = await cloudinaryConfig.uploader.upload_stream({ folder }, (error, result) => {
        if (error) throw error;
        return result;
      });
      return result;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('Failed to upload image to Cloudinary');
    }
  };