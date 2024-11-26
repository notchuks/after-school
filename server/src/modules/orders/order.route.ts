import express, { Request, Response, NextFunction } from "express";
import { createOrderHandler, deleteOrderHandler, getOrderHandler, getOrdersHandler, updateOrderHandler } from "./order.controller";
import validateResource from "../../middleware/validateResource";
import { createOrderSchema } from "./order.schema";

const router = express.Router();

router.get("/test", (req: Request, res: Response) => {
  res.send("It works!");
});

router.post("/", validateResource(createOrderSchema), createOrderHandler);
router.get("/:orderId", getOrderHandler);
router.get("/", getOrdersHandler);
router.put("/:orderId", updateOrderHandler);
router.delete("/:orderId", deleteOrderHandler);

export default router;