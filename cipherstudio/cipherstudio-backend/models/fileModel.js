// import mongoose from "mongoose";

// const fileSchema = new mongoose.Schema({
//   projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
//   parentId:  { type: mongoose.Schema.Types.ObjectId, ref: "File", default: null },
//   name: { type: String, required: true },
//   type: { type: String, enum: ["file", "folder"], required: true },
//   s3Key: { type: String, default: null }
// }, { timestamps: true });

// const File = mongoose.model("File", fileSchema);
// export default File;

// models/fileModel.js
import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  parentId:  { type: mongoose.Schema.Types.ObjectId, ref: "File", default: null },
  name: { type: String, required: true },
  type: { type: String, enum: ["file", "folder"], required: true },
  content: { type: String, default: "" }  // store code/text here instead of S3
}, { timestamps: true });

const File = mongoose.model("File", fileSchema);
export default File;
