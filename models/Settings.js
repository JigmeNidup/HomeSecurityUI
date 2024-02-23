import { Schema, model, models } from "mongoose";

const SettingSchema = new Schema({
  faceid: {
    type: String,
  },
  rfid: {
    type: String,
  },
  temperature: {
    type: String,
  },
  humidity: {
    type: String,
  },
  gas: {
    type: String,
  },
});

const Setting = models.Setting || model("Setting", SettingSchema);

export default Setting;
