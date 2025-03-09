import vine from "@vinejs/vine";

export const createCategoryValidator = vine.compile(
  vine.object({
    backgroundColor: vine.string().optional(),
    icon: vine.string().optional(),
    label: vine.string(),
  }),
);

export const updateCategoryValidator = vine.compile(
  vine.object({
    backgroundColor: vine.string().optional(),
    icon: vine.string().optional(),
    label: vine.string(),
  }),
);
