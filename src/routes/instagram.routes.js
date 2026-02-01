import express from 'express';
import { downloadInstagramVideo } from '../controller/instagram.controller.js';

const router = express.Router();

router.get('/download', downloadInstagramVideo);

export default router;