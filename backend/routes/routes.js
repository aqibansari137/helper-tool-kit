import express from 'express'
import { uploadImage, downloadImage, deleteAllImage } from '../controller/image-controller.js';
import { getCode, addCode, deleteCode, updateCode } from '../controller/code-controller.js';
import upload from '../utils/upload.js';
const router = express.Router();

router.post('/upload', upload.single('file'), uploadImage);
router.get('/file/:fileId', downloadImage);
router.get('/delF/:delId', deleteAllImage);

router.get('/getcodedata', getCode);
router.post('/addcodedata', addCode);
router.delete('/deletecodedata/:id', deleteCode);
router.put('/updatecodedata/:id', updateCode);

export default router;