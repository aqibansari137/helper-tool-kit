import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  passcode: {
    type: String,
    required: true,
  },
});

const File = mongoose.model("Files", fileSchema);

export default File;
