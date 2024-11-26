import mongoose from "mongoose";

export interface LessonInput {
  topic: string;
  price: number;
  location: string;
  spaces: number;
}

export interface LessonDocument extends LessonInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const lessonSchema = new mongoose.Schema<LessonDocument>(
  {
    topic: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    spaces: { type: Number, required: true },
  }, {
    timestamps: true,
  }
);

const lessonModel = mongoose.model<LessonDocument>("Lesson", lessonSchema);
export default lessonModel;