import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import tiktokRoutes from './src/routes/tiktok.routes.js'; 

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://tiktok-downloader-eta-three.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Routes
app.use('/api/tiktok', tiktokRoutes);

// ✅ Root Route (Testing)
app.get('/', (req, res) => {
    res.send('TikTok Downloader API is Running...');
});

const PORT = process.env.PORT || 5000;

// ✅ Server Start
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

// Vercel Export
export default app;