import vine from "@vinejs/vine";

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string(),
    email: vine
      .string()
      .email()
      .unique(async (db, value, field) => {
        const user = await db.from("users").where("email", value).first();
        return !user;
      }),
    password: vine.string(),
    about: vine.string().nullable(),
    avatar: vine.string().nullable(),
  }),
);

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string(),
    password: vine.string(),
    about: vine.string().nullable(),
    avatar: vine.string().nullable(),
  }),
);
