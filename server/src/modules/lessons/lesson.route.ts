import express, { Request, Response, NextFunction } from "express";
import { createLessonHandler, deleteLessonHandler, getLessonHandler, getLessonsHandler, updateLessonHandler } from "./lesson.controller";
import validateResource from "../../middleware/validateResource";
import { createLessonSchema } from "./lesson.schema";

const router = express.Router();

router.get("/test", (req: Request, res: Response) => {
  res.send("It works!");
});

router.post("/", validateResource(createLessonSchema), createLessonHandler);
router.get("/:lessonId", getLessonHandler);
router.get("/", getLessonsHandler);
router.put("/:lessonId", updateLessonHandler);
router.delete("/:lessonId", deleteLessonHandler);

export default router;