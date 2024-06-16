import express from "express";
import {
  getCode,
  addCode,
  deleteCode,
  updateCode,
} from "../controller/code-controller.js";
import {
  uploadImage,
  getAllFiles,
  downloadUploadedFiles,
  deleteUploadedFiles,
} from "../controller/fileupload-controller.js";

const router = express.Router();

router.get("/getcodedata", getCode);
router.post("/addcodedata", addCode);
router.delete("/deletecodedata/:id", deleteCode);
router.put("/updatecodedata/:id", updateCode);

//Upload a file
router.post("/upload", uploadImage);
router.get("/allFiles", getAllFiles);
router.get("/downloads/:id", downloadUploadedFiles);
router.delete("/allFiles", deleteUploadedFiles);

export default router;
