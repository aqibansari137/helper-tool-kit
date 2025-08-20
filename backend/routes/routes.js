import express from "express";
import {
  getCode,
  addCode,
  deleteCode,
  updateCode,
} from "../controller/code-controller.js";
import {
  uploadFile,
  getAllFiles,
  findFilesById,
  downloadUploadedFiles,
  deleteUploadedFiles,
} from "../controller/fileupload-controller.js";

const router = express.Router();

router.get("/getcodedata", getCode);
router.post("/addcodedata", addCode);
router.delete("/deletecodedata/:id", deleteCode);
router.put("/updatecodedata/:id", updateCode);

//Upload a file
router.post("/upload", uploadFile);
router.get("/allFiles", getAllFiles);
router.get("/downloads/:id", downloadUploadedFiles);
router.get("/uploadFile/:id", findFilesById);
router.post("/deleteFiles", deleteUploadedFiles);

export default router;
