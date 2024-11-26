import { object, string, custom, number, array, boolean, TypeOf } from "zod";

const payload = {
  body: object({
    topic: string({
      required_error: "topic is required"
    }),
    price: number({
      required_error: "price is required"
    }),
    location: string({
      required_error: "location is required"
    }),
    spaces: number({
      required_error: "Number of spaces is required"
    })
  })
}

const params = {
  params: object({
    lessonId: string({
      required_error: "lessonId is required"
    })
  })
}

export const createLessonSchema = object({
  ...payload
})

export const updateLessonSchema = object({
  ...payload,
  ...params
})

export const getLessonSchema = object({
  ...params
})

export const deleteLessonSchema = object({
  ...params
})

export type CreateLessonInput = TypeOf<typeof createLessonSchema>
export type UpdateLessonInput = TypeOf<typeof updateLessonSchema>
export type ReadLessonInput = TypeOf<typeof getLessonSchema>
export type DeleteLessonInput = TypeOf<typeof deleteLessonSchema>