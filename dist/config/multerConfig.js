"use strict";
// import multer from "multer";
// // Define the IUser interface
// export interface IUser {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
// }
// // Extend Express Request interface to include IUser
// declare global {
//   namespace Express {
//     interface Request {
//       user?: IUser; 
//     }
//   }
// }
// // Multer storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     if (req.user) {  // Ensure req.user is present
//       cb(null, `${req.user.id}-avatar-${Date.now()}.${file.mimetype.split("/")[1]}`);
//     } else {
//       cb(new Error("User is not authenticated"), "");
//     }
//   },
// });
// // Create the multer instance
// export const upload = multer({ storage });
