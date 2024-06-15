import multer from "multer";
import path from "path";
import File from "../models/files.js";
import fs from "fs";

// Set storage engine
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 50000000 }, // 50MB limit
}).single("file");

// @route   POST /upload
// @desc    Upload a file
export const uploadImage = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }
    const { passcode } = req.body;
    if (!passcode) {
      return res.status(400).json({ msg: "Passcode is required" });
    }

    const newFile = new File({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      passcode: passcode,
    });
    await newFile.save();
    res.json(newFile);
  });
};

export const getAllFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const downloadUploadedFiles = async (req, res) => {
  try {
    const { id } = req.params;
    const { passcode } = req.query;

    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ msg: "File not found" });
    }

    if (file.passcode !== passcode) {
      return res.status(401).json({ msg: "Invalid passcode" });
    }

    // Use res.download to send the file with the original filename
    res.download(file.path, file.originalName, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Server Error");
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const deleteUploadedFiles = async (req, res) => {
  try {
    // Delete all files from the database
    const deletedFiles = await File.deleteMany({});
    console.log(`Deleted ${deletedFiles.deletedCount} files from database`);

    // Remove all files from the uploads folder
    fs.readdir("./uploads", (err, files) => {
      if (err) {
        console.error("Error reading uploads directory", err);
        return res.status(500).send("Server Error");
      }

      for (const file of files) {
        fs.unlink(path.join("./uploads", file), (err) => {
          if (err) {
            console.error(`Error deleting file ${file}`, err);
          }
        });
      }

      console.log(`Deleted ${files.length} files from uploads folder`);
      res.json({ msg: "All files deleted successfully" });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
