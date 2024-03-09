import { Schema, model, models } from "mongoose";

const uploadSchema = new Schema({
  imgdata: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
});

const Upload = models.Upload || model("Upload", uploadSchema);

export default Upload;
