import File from "../models/files.js";
// @route   POST /upload
// @desc    Upload a file
export const uploadFile = async (req, res) => {
  try {
    let { passcode } = req.body;
    if (!passcode) {
      return res.status(400).json({ msg: "Passcode is required" });
    }

    const newFile = new File({
      originalName: req.body.name,
      path: req.body.downloadUrl,
      size: req.body.size,
      passcode: passcode,
    });
    await newFile.save();
    res.json({ name: newFile.originalName, size: newFile.size });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const getAllFiles = async (req, res) => {
  try {
    let files = await File.find();
    files = files.map(({ _id, size, date, originalName }) => ({
      _id,
      size,
      date,
      originalName,
    }));
    res.json(files);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const downloadUploadedFiles = async (req, res) => {
  try {
    const { id } = req.params;
    let { passcode } = req.query;

    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ msg: "File not found" });
    }

    if (file.passcode !== passcode) {
      return res.status(401).json({ msg: "Invalid passcode" });
    }

    // Use res.download to send the file with the original filename
    res.status(200).json({name:file.originalName ,url:file.path});
  } catch (err) {
    console.error("Unexpected error occurred:", err.message);
    res.status(500).send("Server Error");
  }
};

export const findFilesById = async (req, res) => {
  try {
    const { id } = req.params;

    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ msg: "File not found" });
    }

    res.status(200).json({name:file.originalName ,url:file.path});
  } catch (err) {
    console.error("Unexpected error occurred:", err.message);
    res.status(500).send("Server Error");
  }
};

export const deleteUploadedFiles = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || ids.length === 0) {
      return res.status(400).json({ msg: "No file IDs provided" });
    }

    // Delete only selected files
    const deletedFiles = await File.deleteMany({ _id: { $in: ids } });

    res.json({
      msg: `Deleted ${deletedFiles.deletedCount} files from database`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

