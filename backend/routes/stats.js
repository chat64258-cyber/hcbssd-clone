import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import db from "../db.js";

const router = Router();

// GET /api/stats - public
router.get("/", (req, res) => res.json(db.data.stats));

// PUT /api/stats/:key - admin
router.put("/:key", authMiddleware, async (req, res) => {
  const idx = db.data.stats.findIndex((s) => s.key === req.params.key);
  if (idx === -1) return res.status(404).json({ error: "الإحصائية غير موجودة" });
  const { label, value, unit, color } = req.body;
  db.data.stats[idx] = { ...db.data.stats[idx], label: label ?? db.data.stats[idx].label, value: value ?? db.data.stats[idx].value, unit: unit ?? db.data.stats[idx].unit, color: color ?? db.data.stats[idx].color, updatedAt: new Date().toISOString() };
  await db.write();
  res.json(db.data.stats[idx]);
});

export default router;
