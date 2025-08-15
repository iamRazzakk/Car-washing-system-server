import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import AppError from "./error/AppError";

// For local development
export async function main() {
  try {
    await mongoose.connect(config.URL as string);
    app.listen(config.PORT, () => {
      console.log(`Example app listening on port ${config.PORT}`);
    });
  } catch (error) {
    throw new AppError(500, ` error ${error}`);
  }
}

// For Vercel deployment - export the app with database connection
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }
  
  try {
    await mongoose.connect(config.URL as string);
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Database connection error:', error);
    throw new AppError(500, `Database connection error: ${error}`);
  }
};

// Export for Vercel
export default async (req: any, res: any) => {
  await connectToDatabase();
  return app(req, res);
};

// Run locally if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  main();
}
