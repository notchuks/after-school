import mongoose from "mongoose";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import LessonModel, { LessonDocument, LessonInput } from "./lesson.model";
import { Query } from "./lesson.controller"


export async function createLesson(input: LessonInput) {
  try {
    const lesson = await LessonModel.create({ ...input });
    return lesson;
  } catch (err) {
    throw err;
  }
};

export async function findLessons(filters: Query, arrange: string) {
  try {
    const lessons = await LessonModel.find(filters).sort({ [arrange]: -1 });
    return lessons;
  } catch (err) {
    throw err;
  }
};

export async function findLesson(query: FilterQuery<LessonDocument>, options: QueryOptions = { lean: true }) {
  try {
    const order = await LessonModel.findOne(query, {}, options);
    return order;
  } catch (err) {
    throw err;
  }
};

export async function updateLesson(query: FilterQuery<LessonDocument>, update: UpdateQuery<LessonDocument>, options: QueryOptions) {
  try {
    const lesson = await LessonModel.findOneAndUpdate(query, update, options);
    return lesson;
  } catch (err) {
    throw err;
  }
};

export async function deleteLesson(query: FilterQuery<LessonDocument>) {
  return await LessonModel.deleteOne(query);
}