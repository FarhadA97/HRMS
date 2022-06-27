import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  _doc: object;
}

const userSchema: Schema = new Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true }

});

export default model<IUser>("User", userSchema);
