import vine from "@vinejs/vine";

export const createOrderValidator = vine.compile(
  vine.array(
    vine.object({
      productId: vine.number(),
      quantity: vine.number(),
      price: vine.number(),
    }),
  ),
);
