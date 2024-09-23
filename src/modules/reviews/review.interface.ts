import { Types } from "mongoose";

export type TReview= {
    user:Types.ObjectId | undefined;
    rating: number;
    feedback: string;
  }