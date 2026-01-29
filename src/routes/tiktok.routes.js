// backend/src/routes/tiktok.routes.js
import express from 'express';
const router = express.Router();
// import { downloadVideo } from '../controller/tiktok.controller.js';
import { downloadVideo,streamFile } from '../controller/tiktok.controller.js';

// এই রুটে ভিডিও লিঙ্ক আসবে: /api/tiktok/download
router.get('/download', downloadVideo);
router.get('/stream', streamFile);
export default router;