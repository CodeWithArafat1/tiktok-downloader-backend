import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/db.js";
import tiktokRoutes from "./src/routes/tiktok.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: ["http://localhost:5173", "https://tiktok-downloader-backend-jet.vercel.app"],
    
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.log("Database Error:", error);
    res.status(500).send({ message: "Database Connection Error" });
  }
});

app.get("/", (req, res) => {
  res.send({ message: "Server is running successfully" });
});

// Routes
app.use('/api/tiktok', tiktokRoutes);

// Start server
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (err) {
    console.log(err);
  }
});

export default app;
