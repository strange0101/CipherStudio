// import File from "../models/fileModel.js";
// import s3 from "../config/s3.js";
// import multer from "multer";
// import multerS3 from "multer-s3";

// const upload = multer({
//   storage: multerS3({
//     s3,
//     bucket: process.env.AWS_BUCKET,
//     key: (req, file, cb) => {
//       cb(null, `projects/${req.body.projectId}/${file.originalname}`);
//     },
//   }),
// });

// export const createFile = async (req, res) => {
//   try {
//     const file = await File.create(req.body);
//     res.status(201).json(file);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const getFile = async (req, res) => {
//   try {
//     const file = await File.findById(req.params.id);
//     res.json(file);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const updateFile = async (req, res) => {
//   try {
//     const updated = await File.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const deleteFile = async (req, res) => {
//   try {
//     await File.findByIdAndDelete(req.params.id);
//     res.json({ message: "File deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const uploadMiddleware = upload.single("file");

import File from "../models/fileModel.js";

// ---------------------------
// CREATE FILE OR FOLDER
// ---------------------------
export const createFile = async (req, res) => {
  try {
    const { projectId, parentId, name, type, content } = req.body;

    // Validate type
    if (!["file", "folder"].includes(type)) {
      return res.status(400).json({ message: "Invalid type. Must be 'file' or 'folder'." });
    }

    const file = await File.create({
      projectId,
      parentId: parentId || null,
      name,
      type,
      content: content || "" // store file content; empty string for folders
    });

    res.status(201).json(file);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ---------------------------
// GET FILE OR FOLDER BY ID
// ---------------------------
export const getFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });
    res.json(file);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ---------------------------
// UPDATE FILE CONTENT OR RENAME
// ---------------------------
export const updateFile = async (req, res) => {
  try {
    const { name, content } = req.body;
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    if (name) file.name = name;
    if (content !== undefined) file.content = content;

    await file.save();
    res.json(file);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ---------------------------
// DELETE FILE OR FOLDER
// ---------------------------
export const deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    // Delete all children if it's a folder
    if (file.type === "folder") {
      await File.deleteMany({ parentId: file._id });
    }

    await file.remove();
    res.json({ message: "File deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ---------------------------
// UPLOAD MIDDLEWARE (NO S3 REQUIRED)
// ---------------------------
// If you want to handle raw file uploads from frontend, you can use express.json()
// or multer memory storage, but for text/code files we can just store content in MongoDB.
// So this middleware is no longer needed.
export const uploadMiddleware = (req, res, next) => next();
