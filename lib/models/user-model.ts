import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, index: true },
  password: { type: String, required: true }, // bcrypt hash — never plaintext
  isAdmin: { type: Boolean, default: false },
});

const UserModel =
  mongoose.models.UserModel ?? mongoose.model("UserModel", UserSchema);

export default UserModel;
