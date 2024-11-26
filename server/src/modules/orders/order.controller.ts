import { Request, Response } from "express";
import * as dotenv from "dotenv";
import path from "path";
import { CreateOrderInput, DeleteOrderInput, ReadOrderInput, UpdateOrderInput } from "./order.schema";
import { createOrder, findOrders, findOrder, updateOrder, deleteOrder } from "./order.service";
import { OrderDocument } from "./order.model";

dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

export interface Query {
  orderId: any;
  search: string;
  sort: string;
};

export async function createOrderHandler(req: Request<CreateOrderInput["params"], {}, CreateOrderInput["body"]>, res: Response) {

  try {
    const input = {
      name: req.body.name,
      phone: req.body.phone,
      lessonIds: req.body.lessonIds,
      spaces: req.body.spaces,
    }

    const order = await createOrder(input);

    return res.status(201).json(order);
  } catch (err: any) {
    return res.status(409).send(err);
  }
}

export async function getOrderHandler(req: Request<ReadOrderInput["params"]>, res: Response) {
  const orderId = req.params.orderId;
  console.log("orderId: ", orderId);

  try {
    const order = await findOrder({ orderId });
    return res.status(200).json(order);
  } catch (err) {
    res.status(409).send(err);
  }
}

export async function getOrdersHandler(req: Request<{}, {}, {}, Query>, res: Response) {
  const q = req.query;

  const filters = {
    ...(q.orderId && { orderId: q.orderId }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  // console.log(filters);
  console.log(q.sort);
  const orders = await findOrders(filters, q.sort);
  
  return res.json(orders).status(200);
}

export async function updateOrderHandler (req: Request<UpdateOrderInput["params"]>, res: Response) {

  const orderId = req.params.orderId;
  const update = req.body;

  const order = await findOrder({ orderId });

  if(!order) {
    return res.sendStatus(404);
  }

  const updatedOrder = await updateOrder({ orderId }, update, { new: true, });

  return res.send(updatedOrder);
}

export async function deleteOrderHandler(req: Request<DeleteOrderInput["params"]>, res: Response) {

  const orderId = req.params.orderId;
  console.log(orderId);

  const order = await findOrder({ orderId });

  if(!order) {
    return res.sendStatus(404);
  };

  await deleteOrder({ orderId });

  return res.sendStatus(200);
}