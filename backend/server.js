import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import newsRoutes from "./routes/news.js";
import statsRoutes from "./routes/stats.js";
import initiativesRoutes from "./routes/initiatives.js";
import registrationsRoutes from "./routes/registrations.js";
import uploadRoutes from "./routes/upload.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

// CORS — يقبل localhost (dev) وأي نطاق Netlify أو نطاق مخصص
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL, // يُضبط على Render لاحقاً
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin) || origin.endsWith(".netlify.app")) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/initiatives", initiativesRoutes);
app.use("/api/registrations", registrationsRoutes);
app.use("/api/upload", uploadRoutes);

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok", time: new Date().toISOString() }));

app.listen(PORT, () => {
  console.log(`✅ HCBSSD Backend running at http://localhost:${PORT}`);
});
