import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "hcbssd_secret_2024";

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "يرجى إدخال اسم المستخدم وكلمة السر" });

  const admin = db.data.admins.find((a) => a.username === username);
  if (!admin) return res.status(401).json({ error: "بيانات غير صحيحة" });

  const valid = bcrypt.compareSync(password, admin.password);
  if (!valid) return res.status(401).json({ error: "بيانات غير صحيحة" });

  const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, username: admin.username });
});

// GET /api/auth/me
router.get("/me", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ error: "غير مصرح" });
  try {
    const decoded = jwt.verify(authHeader.split(" ")[1], JWT_SECRET);
    res.json({ username: decoded.username });
  } catch {
    res.status(401).json({ error: "الرمز غير صالح" });
  }
});

export default router;
