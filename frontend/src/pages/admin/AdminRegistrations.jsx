import { useEffect, useState } from "react";
import api from "../../api.js";

const STATUS_CONFIG = {
  pending:  { label: "قيد المراجعة", cls: "bg-yellow-100 text-yellow-800" },
  accepted: { label: "مقبول",        cls: "bg-green-100 text-green-800" },
  rejected: { label: "مرفوض",        cls: "bg-red-100 text-red-800" },
};
const INIT_LABELS = { shurakaa: "شركاء لتوظيفهم", sanedhom: "ساندهم", taafee: "تعافي", amal: "أمل" };

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [filter, setFilter] = useState({ initiative: "", status: "" });

  const load = () => {
    const params = new URLSearchParams();
    if (filter.initiative) params.set("initiative", filter.initiative);
    if (filter.status) params.set("status", filter.status);
    api.get(`/registrations?${params}`).then((r) => setRegistrations(r.data)).catch(() => {});
  };
  useEffect(() => { load(); }, [filter]);

  const updateStatus = async (id, status) => {
    await api.put(`/registrations/${id}/status`, { status });
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm("حذف هذا الطلب؟")) return;
    await api.delete(`/registrations/${id}`); load();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">إدارة التسجيلات</h1>
      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <select value={filter.initiative} onChange={(e) => setFilter({...filter, initiative: e.target.value})}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1F3A5F] bg-white">
          <option value="">جميع المبادرات</option>
          {Object.entries(INIT_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={filter.status} onChange={(e) => setFilter({...filter, status: e.target.value})}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1F3A5F] bg-white">
          <option value="">جميع الحالات</option>
          <option value="pending">قيد المراجعة</option>
          <option value="accepted">مقبول</option>
          <option value="rejected">مرفوض</option>
        </select>
        <div className="text-sm text-gray-500 flex items-center">
          {registrations.length} نتيجة
        </div>
      </div>
      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b text-gray-500 text-right">
              <th className="py-3 px-4 font-medium">الاسم</th>
              <th className="py-3 px-4 font-medium">المبادرة</th>
              <th className="py-3 px-4 font-medium">الهاتف</th>
              <th className="py-3 px-4 font-medium">الجنس</th>
              <th className="py-3 px-4 font-medium">الحالة</th>
              <th className="py-3 px-4 font-medium">التاريخ</th>
              <th className="py-3 px-4 font-medium">إجراءات</th>
            </tr></thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">
                    <div>{r.fullName}</div>
                    {r.email && <div className="text-xs text-gray-400">{r.email}</div>}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{INIT_LABELS[r.initiativeSlug] || r.initiativeSlug}</td>
                  <td className="py-3 px-4 text-gray-600">{r.phone}</td>
                  <td className="py-3 px-4 text-gray-500">{r.gender || "—"}</td>
                  <td className="py-3 px-4">
                    <select value={r.status} onChange={(e) => updateStatus(r.id, e.target.value)}
                      className={`text-xs px-2 py-1 rounded-full font-medium border-0 cursor-pointer focus:outline-none ${STATUS_CONFIG[r.status]?.cls}`}>
                      <option value="pending">قيد المراجعة</option>
                      <option value="accepted">مقبول</option>
                      <option value="rejected">مرفوض</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-xs">{new Date(r.createdAt).toLocaleDateString("ar-KW", { year: "numeric", month: "short", day: "numeric" })}</td>
                  <td className="py-3 px-4">
                    <button onClick={() => handleDelete(r.id)} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded hover:bg-red-100">حذف</button>
                  </td>
                </tr>
              ))}
              {registrations.length === 0 && <tr><td colSpan={7} className="py-12 text-center text-gray-400">لا توجد تسجيلات</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
