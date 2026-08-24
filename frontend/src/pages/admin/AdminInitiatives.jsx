import { useEffect, useState } from "react";
import api from "../../api.js";

export default function AdminInitiatives() {
  const [initiatives, setInitiatives] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => { api.get("/initiatives/all").then((r) => setInitiatives(r.data)).catch(() => {}); }, []);

  const handleEdit = (init) => {
    setEditing(init.slug);
    setForm({ name: init.name, tag: init.tag, description: init.description, statValue: init.statValue, statLabel: init.statLabel, color: init.color, active: init.active });
  };

  const handleSave = async () => {
    try {
      const r = await api.put(`/initiatives/${editing}`, form);
      setInitiatives((prev) => prev.map((i) => i.slug === editing ? r.data : i));
      setEditing(null);
    } catch { alert("حدث خطأ"); }
  };

  const COLORS = { "#1F3A5F": "أزرق", "#C8102E": "أحمر", "#2E9E6B": "أخضر", "#7A4B8F": "بنفسجي" };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">إدارة المبادرات</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {initiatives.map((init) => (
          <div key={init.slug} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="h-1.5" style={{ background: init.color }} />
            <div className="p-5">
              {editing === init.slug ? (
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">اسم المبادرة</label>
                      <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#1F3A5F]" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">التصنيف</label>
                      <input value={form.tag} onChange={(e) => setForm({...form, tag: e.target.value})} className="w-full border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#1F3A5F]" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">الوصف</label>
                    <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows={3} className="w-full border rounded-lg px-3 py-1.5 text-sm resize-none focus:outline-none focus:border-[#1F3A5F]" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">قيمة الإحصائية</label>
                      <input value={form.statValue} onChange={(e) => setForm({...form, statValue: e.target.value})} className="w-full border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#1F3A5F]" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">وصف الإحصائية</label>
                      <input value={form.statLabel} onChange={(e) => setForm({...form, statLabel: e.target.value})} className="w-full border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#1F3A5F]" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-xs text-gray-500">اللون:</label>
                    {Object.entries(COLORS).map(([c, name]) => (
                      <button key={c} onClick={() => setForm({...form, color: c})}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${form.color === c ? "border-gray-800 scale-110" : "border-transparent"}`}
                        style={{ background: c }} title={name} />
                    ))}
                    <input type="color" value={form.color} onChange={(e) => setForm({...form, color: e.target.value})} className="h-7 w-12 rounded cursor-pointer" title="لون مخصص" />
                  </div>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={form.active} onChange={(e) => setForm({...form, active: e.target.checked})} className="accent-[#1F3A5F]" />
                    مبادرة نشطة
                  </label>
                  <div className="flex gap-2 pt-1">
                    <button onClick={handleSave} className="flex-1 bg-[#2E9E6B] text-white py-1.5 rounded-lg text-sm font-semibold">حفظ</button>
                    <button onClick={() => setEditing(null)} className="flex-1 border border-gray-200 py-1.5 rounded-lg text-sm text-gray-600">إلغاء</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full mb-2 inline-block" style={{ background: init.color + "18", color: init.color }}>{init.tag}</span>
                      <h3 className="font-bold text-[#1F3A5F] text-lg">{init.name}</h3>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${init.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{init.active ? "نشط" : "معطل"}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">{init.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-lg" style={{ color: init.color }}>{init.statValue}</span>
                      <span className="text-xs text-gray-400 mr-2">{init.statLabel}</span>
                    </div>
                    <button onClick={() => handleEdit(init)} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-100">تعديل</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
