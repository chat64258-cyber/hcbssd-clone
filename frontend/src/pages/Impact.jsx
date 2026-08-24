import { useEffect, useState } from "react";
import api from "../api.js";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function Impact() {
  const [stats, setStats] = useState([]);
  useEffect(() => { api.get("/stats").then((r) => setStats(r.data)).catch(() => {}); }, []);
  const getStat = (key) => stats.find((s) => s.key === key);
  const pieData = [
    { name: "مستمرون في الوظائف", value: 18, color: "#2E9E6B" },
    { name: "مقاعد غير مشغولة", value: 7, color: "#D7AA35" },
  ];
  return (
    <div dir="rtl" className="py-16">
      <div className="container max-w-5xl mx-auto">
        <p className="eyebrow mb-2"><span />الأثر بالأرقام</p>
        <h1 className="text-4xl font-bold text-[#1F3A5F] mb-2">حين نقيس الأثر، <span className="text-[#D7AA35]">نرى الإنسان</span></h1>
        <div className="gold-rule" />
        <p className="text-gray-600 mt-4 mb-10 max-w-2xl">بيانات موثقة من برامج الجمعية ضمن منهجية SPI وقياس العائد الاجتماعي على الاستثمار (SROI).</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-12">
          {stats.map((s) => (
            <div key={s.id} className="rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm">
              <div className="text-3xl font-bold mb-1" style={{ color: s.color || "#1F3A5F" }}>{s.value}<span className="text-lg">{s.unit}</span></div>
              <div className="text-sm text-gray-500 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="font-bold text-[#1F3A5F] text-xl mb-6">مقاعد شركاء لتوظيفهم — الاستمرارية الوظيفية</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-sm text-gray-500 leading-relaxed max-w-xs">
              <p className="font-bold text-[#1F3A5F] text-base mb-3">الدفعة الأولى • العام التدريبي 2025/2026</p>
              <p>من أصل <strong>25 مقعدًا وظيفيًا</strong> متاحاً، استمر <strong>18 منتسبًا</strong> في وظائفهم بنسبة استمرارية تبلغ <strong className="text-[#2E9E6B]">72%</strong>.</p>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-[#F8F5EE] rounded-xl p-6 flex items-start gap-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D7AA35" strokeWidth="2" className="shrink-0 mt-1"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
          <p className="text-sm text-gray-600">البيانات المنشورة مصدرها إحصائيات الجمعية الرسمية وتقارير المبادرات الوطنية المعتمدة.</p>
        </div>
      </div>
    </div>
  );
}
