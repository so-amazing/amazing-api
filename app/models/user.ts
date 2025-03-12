import { DateTime } from "luxon";
import hash from "@adonisjs/core/services/hash";
import { compose } from "@adonisjs/core/helpers";
import { BaseModel, column, hasMany } from "@adonisjs/lucid/orm";
import { withAuthFinder } from "@adonisjs/auth/mixins/lucid";
import { DbAccessTokensProvider } from "@adonisjs/auth/access_tokens";
import Order from "./order.js";
import type { HasMany } from "@adonisjs/lucid/types/relations";

const AuthFinder = withAuthFinder(() => hash.use("scrypt"), {
  uids: ["email"],
  passwordColumnName: "password",
});

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare fullName: string | null;

  @column()
  declare email: string;

  @column()
  declare phone: string | null;

  @column({ serializeAs: null })
  declare password: string;

  @column({ serializeAs: null, columnName: "remember_token" })
  declare rememberToken: string | null;

  @column()
  declare about?: string | null;

  @column()
  declare avatar?: string | null;

  @column({ columnName: "is_verified_by_mail" })
  declare isVerifiedByMail?: boolean | null;

  @column({ columnName: "is_verified_by_org" })
  declare isVerifiedByOrg: boolean | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;

  static accessTokens = DbAccessTokensProvider.forModel(User);

  @hasMany(() => Order)
  declare orders: HasMany<typeof Order>;
}
