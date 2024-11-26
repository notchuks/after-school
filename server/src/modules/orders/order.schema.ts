import mongoose from "mongoose";
import { object, string, custom, number, array, boolean, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "name is required"
    }),
    phone: number({
      required_error: "Phone number is required"
    }),
    lessonIds: array(string({
      required_error: "Order must contain at least one lesson"
    })),
    spaces: number({
      required_error: "Number of spaces is required"
    })
  })
}

const params = {
  params: object({
    orderId: string({
      required_error: "orderId is required"
    })
  })
}

export const createOrderSchema = object({
  ...payload,
})

export const updateOrderSchema = object({
  ...payload,
  ...params
})

export const getOrderSchema = object({
  ...params
})

export const deleteOrderSchema = object({
  ...params
})

export type CreateOrderInput = TypeOf<typeof createOrderSchema>
export type UpdateOrderInput = TypeOf<typeof updateOrderSchema>
export type ReadOrderInput = TypeOf<typeof getOrderSchema>
export type DeleteOrderInput = TypeOf<typeof deleteOrderSchema>