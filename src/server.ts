import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import AppError from "./error/AppError";

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
main();
