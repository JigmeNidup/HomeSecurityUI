import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  faceid: {
    type: String,
  },
  rfid: {
    type: String,
  },
});

const User = models.User || model("User", userSchema);

export default User;
