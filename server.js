import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// ⚠️ লক্ষ্য করুন: শেষে .js অবশ্যই দিতে হবে
import tiktokRoutes from './src/routes/tiktok.routes.js'; 

dotenv.config();

const app = express();

app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// Routes
app.use('/api/tiktok', tiktokRoutes);

app.get('/', (req, res) => {
    res.send('TikTok Downloader API is Running (ES Module)...');
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

// Vercel এর জন্য এক্সপোর্ট
export default app;