import mongoose from "mongoose";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import OrderModel, { OrderDocument, OrderInput } from "./order.model";
import { Query } from "./order.controller";



export async function createOrder(input: OrderInput) {
  try {
    const order = await OrderModel.create({ ...input });
    return order;
  } catch (err) {
    throw err;
  }
};

export async function findOrders(filters: Query, arrange: string) {
  try {
    const orders = await OrderModel.find(filters).sort({ [arrange]: -1 });
    return orders;
  } catch (err) {
    throw err;
  }
};

export async function findOrder(query: FilterQuery<OrderDocument>, options: QueryOptions = { lean: true }) {
  try {
    const order = await OrderModel.findOne(query, {}, options);
    return order;
  } catch (err) {
    throw err;
  }
};

export async function updateOrder(query: FilterQuery<OrderDocument>, update: UpdateQuery<OrderDocument>, options: QueryOptions) {
  try {
    const order = await OrderModel.findOneAndUpdate(query, update, options);
    return order;
  } catch (err) {
    throw err;
  }
};

export async function deleteOrder(query: FilterQuery<OrderDocument>) {
  return await OrderModel.deleteOne(query);
};