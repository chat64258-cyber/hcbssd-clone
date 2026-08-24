import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { authMiddleware } from "../middleware/auth.js";
import db from "../db.js";

const router = Router();

// POST /api/registrations - public (submit registration)
router.post("/", async (req, res) => {
  const { initiativeSlug, fullName, civilId, phone, email, gender, notes } = req.body;
  if (!initiativeSlug || !fullName || !phone) return res.status(400).json({ error: "الاسم ورقم الهاتف والمبادرة مطلوبة" });
  const item = { id: uuidv4(), initiativeSlug, fullName, civilId: civilId || "", phone, email: email || "", gender: gender || "", notes: notes || "", status: "pending", createdAt: new Date().toISOString() };
  db.data.registrations.push(item);
  await db.write();
  res.status(201).json({ success: true, message: "تم تسجيل طلبك بنجاح. سنتواصل معك قريباً." });
});

// GET /api/registrations - admin
router.get("/", authMiddleware, (req, res) => {
  const { initiative, status } = req.query;
  let list = [...db.data.registrations].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (initiative) list = list.filter((r) => r.initiativeSlug === initiative);
  if (status) list = list.filter((r) => r.status === status);
  res.json(list);
});

// PUT /api/registrations/:id/status - admin
router.put("/:id/status", authMiddleware, async (req, res) => {
  const idx = db.data.registrations.findIndex((r) => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "الطلب غير موجود" });
  const { status } = req.body;
  if (!["pending", "accepted", "rejected"].includes(status)) return res.status(400).json({ error: "حالة غير صالحة" });
  db.data.registrations[idx].status = status;
  await db.write();
  res.json(db.data.registrations[idx]);
});

// DELETE /api/registrations/:id - admin
router.delete("/:id", authMiddleware, async (req, res) => {
  const idx = db.data.registrations.findIndex((r) => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "الطلب غير موجود" });
  db.data.registrations.splice(idx, 1);
  await db.write();
  res.json({ success: true });
});

export default router;
