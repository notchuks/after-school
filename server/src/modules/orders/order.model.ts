import mongoose from "mongoose";
import { LessonDocument } from "../lessons/lesson.model";

export interface OrderInput {
  name: string;
  phone: number;
  lessonIds: Array<LessonDocument["_id"]>;
  spaces: number;
}

export interface OrderDocument extends OrderInput, mongoose.Document {
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema<OrderDocument>(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    lessonIds: { type: [mongoose.Schema.Types.ObjectId], ref: "Lesson", required: true },
    spaces: { type: Number, required: true },
    isCompleted: { type: Boolean, default: false },
  }, {
    timestamps: true,
  }
);

const OrderModel = mongoose.model<OrderDocument>("Order", orderSchema);
export default OrderModel;