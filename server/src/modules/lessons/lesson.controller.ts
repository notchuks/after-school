import { Request, Response } from "express";
import * as dotenv from "dotenv";
import path from "path";
import { CreateLessonInput, DeleteLessonInput, ReadLessonInput, UpdateLessonInput } from "./lesson.schema";
import { createLesson, findLessons, findLesson, updateLesson, deleteLesson } from "./lesson.service";
import { LessonDocument } from "./lesson.model";

dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

export interface Query {
  lessonId: any;
  search: string;
  sort: string;
};

export async function createLessonHandler(req: Request<{}, {}, CreateLessonInput["body"]>, res: Response) {

  try {
    const input = {
      topic: req.body.topic,
      price: req.body.price,
      location: req.body.location,
      spaces: req.body.spaces,
    }

    const lesson = await createLesson(input);

    return res.status(201).json(lesson);
  } catch (err: any) {
    return res.status(409).send(err);
  }
}

export async function getLessonHandler(req: Request<ReadLessonInput["params"]>, res: Response) {
  const lessonId = req.params.lessonId;
  console.log("lessonId: ", lessonId);

  try {
    const lesson = await findLesson({ lessonId });
    return res.status(200).json(lesson);
  } catch (err) {
    res.status(409).send(err);
  }
}

export async function getLessonsHandler(req: Request<{}, {}, {}, Query>, res: Response) {
  const q = req.query;

  const filters = {
    ...(q.lessonId && { lessonId: q.lessonId }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  // console.log(filters);
  console.log(q.sort);
  const lessons = await findLessons(filters, q.sort);
  
  return res.json(lessons).status(200);
}

export async function updateLessonHandler (req: Request<UpdateLessonInput["params"]>, res: Response) {

  const lessonId = req.params.lessonId;
  const update = req.body;

  const lesson = await findLesson({ lessonId });

  if(!lesson) {
    return res.sendStatus(404);
  }

  const updatedLesson = await updateLesson({ lessonId }, update, { new: true, });

  return res.send(updatedLesson);
}

export async function deleteLessonHandler(req: Request<DeleteLessonInput["params"]>, res: Response) {

  const lessonId = req.params.lessonId;
  console.log(lessonId);

  const lesson = await findLesson({ lessonId });

  if(!lesson) {
    return res.sendStatus(404);
  };

  await deleteLesson({ lessonId });

  return res.sendStatus(200);
}