import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (err: any) {
    return next(err);
  }
});
UserSchema.methods.validatePassword = async function validatePassword(
  data: string
) {
  return bcrypt.compare(data, this.password);
};

UserSchema.methods.generateToken = function generateToken() {
  return Buffer.from(
    `${this.username}:${this.password}:${Date.now()}`
  ).toString("base64");
};

UserSchema.index({ username: "text" });

export default model("User", UserSchema);
