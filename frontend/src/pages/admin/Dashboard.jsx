import { useEffect, useState } from "react";
import api from "../../api.js";

export default function Dashboard() {
  const [data, setData] = useState({ news: 0, registrations: 0, pending: 0 });
  const [recentReg, setRecentReg] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get("/news/all"),
      api.get("/registrations"),
    ]).then(([newsRes, regRes]) => {
      const regs = regRes.data;
      setData({ news: newsRes.data.length, registrations: regs.length, pending: regs.filter(r => r.status === "pending").length });
      setRecentReg(regs.slice(0, 5));
    }).catch(() => {});
  }, []);

  const STATUS = { pending: { label: "قيد المراجعة", cls: "bg-yellow-100 text-yellow-800" }, accepted: { label: "مقبول", cls: "bg-green-100 text-green-800" }, rejected: { label: "مرفوض", cls: "bg-red-100 text-red-800" } };
  const INIT_LABELS = { shurakaa: "شركاء لتوظيفهم", sanedhom: "ساندهم", taafee: "تعافي", amal: "أمل" };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">نظرة عامة</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {[
          { label: "إجمالي الأخبار", value: data.news, color: "bg-blue-500", icon: "📰" },
          { label: "إجمالي التسجيلات", value: data.registrations, color: "bg-purple-500", icon: "📋" },
          { label: "طلبات قيد المراجعة", value: data.pending, color: "bg-yellow-500", icon: "⏳" },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
            <div className={`${c.color} text-white w-12 h-12 rounded-lg flex items-center justify-center text-xl`}>{c.icon}</div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{c.value}</div>
              <div className="text-sm text-gray-500">{c.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="font-bold text-gray-700 mb-4">آخر التسجيلات</h2>
        {recentReg.length === 0 ? <p className="text-gray-400 text-sm">لا توجد تسجيلات بعد.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-100 text-gray-500 text-right">
                <th className="py-2 px-3 font-medium">الاسم</th>
                <th className="py-2 px-3 font-medium">المبادرة</th>
                <th className="py-2 px-3 font-medium">الهاتف</th>
                <th className="py-2 px-3 font-medium">الحالة</th>
                <th className="py-2 px-3 font-medium">التاريخ</th>
              </tr></thead>
              <tbody>
                {recentReg.map((r) => (
                  <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2.5 px-3 font-medium text-gray-800">{r.fullName}</td>
                    <td className="py-2.5 px-3 text-gray-600">{INIT_LABELS[r.initiativeSlug] || r.initiativeSlug}</td>
                    <td className="py-2.5 px-3 text-gray-600">{r.phone}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS[r.status]?.cls}`}>{STATUS[r.status]?.label}</span>
                    </td>
                    <td className="py-2.5 px-3 text-gray-400">{new Date(r.createdAt).toLocaleDateString("ar-KW")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
