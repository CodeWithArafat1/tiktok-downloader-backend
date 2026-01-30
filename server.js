import express from 'express';
import dotenv from 'dotenv';
import tiktokRoutes from './src/routes/tiktok.routes.js'; 

dotenv.config();
const app = express();

// ✅ ম্যানুয়াল CORS সেটআপ (সবচেয়ে শক্তিশালী পদ্ধতি)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // সব ডোমেইন অ্যালাউ
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    // প্রি-ফ্লাইট (OPTIONS) রিকোয়েস্ট হ্যান্ডেল করা
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.use(express.json());

// Routes
app.use('/api/tiktok', tiktokRoutes);

app.get('/', (req, res) => {
    res.send('TikTok Downloader API is Running...');
});

// Vercel এক্সপোর্ট
export default app;