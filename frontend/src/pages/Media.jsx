import { useEffect, useState } from "react";
import api from "../api.js";

export default function Media() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("الكل");
  useEffect(() => { api.get("/news").then((r) => setNews(r.data)).catch(() => {}).finally(() => setLoading(false)); }, []);
  const categories = ["الكل", ...new Set(news.map((n) => n.category))];
  const filtered = filter === "الكل" ? news : news.filter((n) => n.category === filter);
  return (
    <div dir="rtl" className="py-16">
      <div className="container">
        <p className="eyebrow mb-2"><span />المركز الإعلامي</p>
        <h1 className="text-4xl font-bold text-[#1F3A5F] mb-4">الأخبار والفعاليات</h1>
        <div className="gold-rule mb-8" />
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${filter === c ? "bg-[#1F3A5F] text-white border-[#1F3A5F]" : "bg-white text-gray-600 border-gray-200 hover:border-[#1F3A5F]"}`}>
              {c}
            </button>
          ))}
        </div>
        {loading ? <div className="text-center py-20 text-gray-400">جاري التحميل...</div> : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">لا توجد أخبار منشورة حالياً</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((n) => (
              <article key={n.id} className="rounded-xl border border-gray-100 bg-white overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gradient-to-br from-[#1F3A5F] to-[#2E8BA8] flex items-center justify-center overflow-hidden">
                  {n.image ? <img src={n.image} alt={n.title} className="w-full h-full object-cover" /> : (
                    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#D7AA35" strokeWidth="1"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/></svg>
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs bg-[#F8F5EE] text-[#1F3A5F] font-semibold px-2 py-0.5 rounded-full">{n.category}</span>
                  <h3 className="font-bold text-[#1F3A5F] mt-3 mb-2 text-base leading-snug">{n.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">{n.body}</p>
                  <div className="text-xs text-gray-400 mt-3">{new Date(n.createdAt).toLocaleDateString("ar-KW", { year: "numeric", month: "long", day: "numeric" })}</div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
