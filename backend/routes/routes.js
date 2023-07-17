import express from 'express'
import { uploadImage, downloadImage, deleteAllImage } from '../controller/image-controller.js';
import upload from '../utils/upload.js';
const router = express.Router();

router.post('/upload', upload.single('file'), uploadImage);
router.get('/file/:fileId', downloadImage);
router.get('/delF/:delId', deleteAllImage);

export default router;