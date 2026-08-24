import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import db from "../db.js";

const router = Router();

// GET /api/initiatives - public
router.get("/", (req, res) => {
  res.json(db.data.initiatives.filter((i) => i.active));
});

// GET /api/initiatives/all - admin
router.get("/all", authMiddleware, (req, res) => res.json(db.data.initiatives));

// PUT /api/initiatives/:slug - admin
router.put("/:slug", authMiddleware, async (req, res) => {
  const idx = db.data.initiatives.findIndex((i) => i.slug === req.params.slug);
  if (idx === -1) return res.status(404).json({ error: "المبادرة غير موجودة" });
  const { name, tag, description, statValue, statLabel, color, logo, active } = req.body;
  db.data.initiatives[idx] = { ...db.data.initiatives[idx], name: name ?? db.data.initiatives[idx].name, tag: tag ?? db.data.initiatives[idx].tag, description: description ?? db.data.initiatives[idx].description, statValue: statValue ?? db.data.initiatives[idx].statValue, statLabel: statLabel ?? db.data.initiatives[idx].statLabel, color: color ?? db.data.initiatives[idx].color, logo: logo ?? db.data.initiatives[idx].logo, active: active !== undefined ? active : db.data.initiatives[idx].active, updatedAt: new Date().toISOString() };
  await db.write();
  res.json(db.data.initiatives[idx]);
});

export default router;
