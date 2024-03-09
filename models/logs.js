import { Schema, model, models } from "mongoose";

const logSchema = new Schema({
  type: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  message: {
    type: String,
  },
});

const Logs = models.Logs || model("Logs", logSchema);

export default Logs;
