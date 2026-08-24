import { useEffect, useState } from "react";
import api from "../../api.js";

const EMPTY = { title: "", body: "", category: "عام", image: "", published: true };

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const load = () => api.get("/news/all").then((r) => setNews(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleEdit = (item) => { setEditing(item.id); setForm({ title: item.title, body: item.body, category: item.category, image: item.image || "", published: item.published }); setShowForm(true); };
  const handleNew = () => { setEditing(null); setForm(EMPTY); setShowForm(true); };

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      if (editing) await api.put(`/news/${editing}`, form);
      else await api.post("/news", form);
      setShowForm(false); load();
    } catch { alert("حدث خطأ"); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("هل تريد حذف هذا الخبر؟")) return;
    await api.delete(`/news/${id}`); load();
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setUploadLoading(true);
    const fd = new FormData(); fd.append("image", file);
    try {
      const r = await api.post("/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setForm((f) => ({ ...f, image: r.data.url }));
    } catch { alert("فشل رفع الصورة"); }
    finally { setUploadLoading(false); }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">إدارة الأخبار</h1>
        <button onClick={handleNew} className="bg-[#1F3A5F] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#162c4a]">+ إضافة خبر</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h2 className="font-bold text-lg mb-4">{editing ? "تعديل الخبر" : "إضافة خبر جديد"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">العنوان *</label>
                <input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1F3A5F]" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">المحتوى *</label>
                <textarea value={form.body} onChange={(e) => setForm({...form, body: e.target.value})} required rows={5} className="w-full border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-[#1F3A5F]" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">التصنيف</label>
                <input value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1F3A5F]" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">الصورة</label>
                <input type="file" accept="image/*" onChange={handleUpload} className="text-sm" />
                {uploadLoading && <span className="text-xs text-gray-400">جاري الرفع...</span>}
                {form.image && <img src={form.image} className="mt-2 h-24 object-cover rounded" />}
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm({...form, published: e.target.checked})} className="accent-[#1F3A5F]" />
                منشور
              </label>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={loading} className="flex-1 bg-[#1F3A5F] text-white py-2 rounded-lg font-semibold text-sm disabled:opacity-50">
                  {loading ? "جاري الحفظ..." : "حفظ"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-gray-300 py-2 rounded-lg text-sm text-gray-600">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 border-b text-gray-500 text-right">
            <th className="py-3 px-4 font-medium">العنوان</th>
            <th className="py-3 px-4 font-medium">التصنيف</th>
            <th className="py-3 px-4 font-medium">الحالة</th>
            <th className="py-3 px-4 font-medium">التاريخ</th>
            <th className="py-3 px-4 font-medium">إجراءات</th>
          </tr></thead>
          <tbody>
            {news.map((n) => (
              <tr key={n.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-800 max-w-xs truncate">{n.title}</td>
                <td className="py-3 px-4 text-gray-500">{n.category}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${n.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"}`}>
                    {n.published ? "منشور" : "مخفي"}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-400">{new Date(n.createdAt).toLocaleDateString("ar-KW")}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(n)} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100">تعديل</button>
                    <button onClick={() => handleDelete(n.id)} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded hover:bg-red-100">حذف</button>
                  </div>
                </td>
              </tr>
            ))}
            {news.length === 0 && <tr><td colSpan={5} className="py-12 text-center text-gray-400">لا توجد أخبار</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
