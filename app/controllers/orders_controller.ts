import Order from "#models/order";
import OrderDetail from "#models/order_detail";
import { createOrderValidator } from "#validators/order";
import type { HttpContext } from "@adonisjs/core/http";
import db from "@adonisjs/lucid/services/db";

export default class OrdersController {
  // Show All Orders
  public async index({ response }: HttpContext) {
    const orders = await Order.query().preload("orderDetails");
    return response.json(orders);
  }
  // Create Order
  public async store({ response, request, auth }: HttpContext) {
    if (!auth.user) {
      return response.status(401).json({ message: "Unathorized" });
    }
    // Create Order
    const details = await request.validateUsing(createOrderValidator);
    // Generate Order number
    let orderNumber;

    const order = await Order.create({
      userId: auth.user.id,
      orderNumber: orderNumber,
      status: "pending",
      seenByAdmin: false,
    });
    // Create Order Details
    details.forEach(async (detail) => {
      const orderDetails = await OrderDetail.create({
        productId: detail.productId,
        orderId: order.id,
        price: detail.price,
        quantity: detail.quantity,
      });
    });

    return response.status(200).json(order.load("orderDetails"));
  }
}
