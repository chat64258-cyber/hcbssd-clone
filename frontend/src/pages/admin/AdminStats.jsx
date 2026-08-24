import { useEffect, useState } from "react";
import api from "../../api.js";

export default function AdminStats() {
  const [stats, setStats] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => { api.get("/stats").then((r) => setStats(r.data)).catch(() => {}); }, []);

  const handleEdit = (s) => { setEditing(s.key); setForm({ label: s.label, value: s.value, unit: s.unit, color: s.color }); };

  const handleSave = async () => {
    try {
      const r = await api.put(`/stats/${editing}`, form);
      setStats((prev) => prev.map((s) => s.key === editing ? r.data : s));
      setEditing(null);
    } catch { alert("حدث خطأ"); }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">إدارة الإحصائيات</h1>
      <p className="text-gray-500 text-sm mb-6">تعديل أرقام الأثر الظاهرة على الموقع العام</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.key} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            {editing === s.key ? (
              <div className="flex flex-col gap-3">
                <input value={form.label} onChange={(e) => setForm({...form, label: e.target.value})} className="border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#1F3A5F]" placeholder="الوصف" />
                <div className="flex gap-2">
                  <input value={form.value} onChange={(e) => setForm({...form, value: e.target.value})} className="flex-1 border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#1F3A5F]" placeholder="القيمة" />
                  <input value={form.unit} onChange={(e) => setForm({...form, unit: e.target.value})} className="w-20 border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#1F3A5F]" placeholder="الوحدة" />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-500">اللون:</label>
                  <input type="color" value={form.color} onChange={(e) => setForm({...form, color: e.target.value})} className="h-8 w-16 rounded cursor-pointer border border-gray-200" />
                </div>
                <div className="flex gap-2">
                  <button onClick={handleSave} className="flex-1 bg-[#2E9E6B] text-white py-1.5 rounded-lg text-sm font-semibold">حفظ</button>
                  <button onClick={() => setEditing(null)} className="flex-1 border border-gray-200 py-1.5 rounded-lg text-sm text-gray-600">إلغاء</button>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-2xl font-bold mb-1" style={{ color: s.color }}>{s.value}<span className="text-sm">{s.unit}</span></div>
                <div className="text-sm text-gray-500 leading-snug mb-3">{s.label}</div>
                <button onClick={() => handleEdit(s)} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-100 w-full">تعديل</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
