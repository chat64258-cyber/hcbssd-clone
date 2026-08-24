import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { authMiddleware } from "../middleware/auth.js";
import db from "../db.js";

const router = Router();

// GET /api/news - public
router.get("/", (req, res) => {
  const published = db.data.news.filter((n) => n.published).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(published);
});

// GET /api/news/all - admin
router.get("/all", authMiddleware, (req, res) => {
  const all = [...db.data.news].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(all);
});

// GET /api/news/:id
router.get("/:id", (req, res) => {
  const item = db.data.news.find((n) => n.id === req.params.id);
  if (!item) return res.status(404).json({ error: "الخبر غير موجود" });
  res.json(item);
});

// POST /api/news - admin
router.post("/", authMiddleware, async (req, res) => {
  const { title, body, category, image, published } = req.body;
  if (!title || !body) return res.status(400).json({ error: "العنوان والمحتوى مطلوبان" });
  const item = { id: uuidv4(), title, body, category: category || "عام", image: image || "", published: published !== false, createdAt: new Date().toISOString() };
  db.data.news.push(item);
  await db.write();
  res.status(201).json(item);
});

// PUT /api/news/:id - admin
router.put("/:id", authMiddleware, async (req, res) => {
  const idx = db.data.news.findIndex((n) => n.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "الخبر غير موجود" });
  const { title, body, category, image, published } = req.body;
  db.data.news[idx] = { ...db.data.news[idx], title: title ?? db.data.news[idx].title, body: body ?? db.data.news[idx].body, category: category ?? db.data.news[idx].category, image: image ?? db.data.news[idx].image, published: published !== undefined ? published : db.data.news[idx].published, updatedAt: new Date().toISOString() };
  await db.write();
  res.json(db.data.news[idx]);
});

// DELETE /api/news/:id - admin
router.delete("/:id", authMiddleware, async (req, res) => {
  const idx = db.data.news.findIndex((n) => n.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "الخبر غير موجود" });
  db.data.news.splice(idx, 1);
  await db.write();
  res.json({ success: true });
});

export default router;
