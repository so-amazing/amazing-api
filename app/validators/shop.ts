import vine from "@vinejs/vine";

export const createShopValidator = vine.compile(
  vine.object({
    name: vine.string(),
    location: vine.string(),
    types: vine.object({}),
    deliveryInfo: vine.object({}),
  }),
);

export const updateShopValidator = vine.compile(
  vine.object({
    name: vine.string(),
    location: vine.string(),
    types: vine.object({}),
    deliveryInfo: vine.object({}),
  }),
);
