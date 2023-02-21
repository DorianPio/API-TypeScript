import { Model, Schema, model } from "mongoose";
import { ExtractSchemaType } from "../../types/Schema";

interface IUser {
  name: String;
  email: String;
}

interface IUserMethods {}

type UserModel = Model<IUser, {}, IUserMethods>;

const schema: ExtractSchemaType<UserModel> = new Schema<
  IUser,
  UserModel,
  IUserMethods
>({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export const User: UserModel = model<IUser, UserModel>("User", schema);
