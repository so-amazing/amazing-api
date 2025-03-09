import vine from "@vinejs/vine";

export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string().nullable(),
    images: vine.array(vine.string()).nullable(),
    price: vine.number().min(0),
    isNegotiable: vine.boolean(),
    categoryId: vine.number(),
    shopId: vine.number(),
  }),
);

export const updateProductValidator = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string().nullable(),
    images: vine.array(vine.string()).nullable(),
    price: vine.number().min(0),
    isNegotiable: vine.boolean(),
    categoryId: vine.number(),
    shopId: vine.number(),
  }),
);
