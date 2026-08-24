import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../api.js";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell
} from "recharts";

/* ── بيانات ثابتة ──────────────────────────────── */
const SLIDES = [
  { label: "شراكات تصنع أثرًا",    color: "#1F3A5F" },
  { label: "تعاون مؤسسي مستدام", color: "#6B1A2A" },
  { label: "تمكين وإدماج",          color: "#1a4a35" },
  { label: "شراكات وطنية ودولية", color: "#3B1F5F" },
];

const STAGE_DATA = [
  { name: "الأولى",  value: 14, fill: "#D7AA35" },
  { name: "الثانية", value: 20, fill: "#C8102E" },
  { name: "الثالثة", value: 14, fill: "#2E9E6B" },
  { name: "الرابعة", value: 25, fill: "#7A4B8F" },
];

const STRATEGY_STEPS = [
  { num: "01", title: "الاعتراف",         desc: "رؤية الإنسان قبل الحالة",                        color: "#D7AA35" },
  { num: "02", title: "التدخل",           desc: "برامج مصممة وفق الاحتياج الفردي",                color: "#1F3A5F" },
  { num: "03", title: "التمكين",          desc: "قدرات نفسية واجتماعية ومهنية متوازية",            color: "#2E9E6B" },
  { num: "04", title: "الاندماج",         desc: "حضور فعلي مستدام في سوق العمل",                  color: "#C8102E" },
  { num: "05", title: "القياس والتطوير", desc: "تثبيت ما تغيّر وتطوير البرامج باستمرار",          color: "#7A4B8F" },
];

/* ── مكوّن بطاقة مبادرة ────────────────────────── */
function InitCard({ init }) {
  return (
    <article
      className="bg-white rounded-2xl overflow-hidden flex flex-col"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
    >
      <div style={{ height: 4, background: init.color }} />
      <div className="p-5 flex flex-col flex-1 gap-3">
        <span
          className="text-xs font-bold px-3 py-1 rounded-full self-start"
          style={{ background: init.color + "18", color: init.color }}
        >
          {init.tag}
        </span>
        <h3 className="text-lg font-bold text-[#1F3A5F] leading-snug">{init.name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1">{init.description}</p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-xl font-bold" style={{ color: init.color }}>{init.statValue}</p>
            <p className="text-gray-400 text-xs mt-0.5">{init.statLabel}</p>
          </div>
          <Link
            to={`/register/${init.slug}`}
            className="text-xs font-bold text-white px-4 py-2 rounded-full"
            style={{ background: init.color }}
          >
            سجّل الآن
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ── مكوّن بطاقة إحصائية ───────────────────────── */
function KpiCard({ value, unit, label }) {
  return (
    <div className="bg-white/10 rounded-xl p-4 text-center border border-white/10">
      <p className="text-2xl font-bold text-[#D7AA35]">
        {value}<span className="text-base">{unit}</span>
      </p>
      <p className="text-white/60 text-xs mt-1 leading-snug">{label}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   الصفحة الرئيسية
═══════════════════════════════════════════════════ */
export default function HomePage() {
  const [slide, setSlide]           = useState(0);
  const [initiatives, setInitiatives] = useState([]);
  const [stats, setStats]           = useState([]);
  const [news, setNews]             = useState([]);
  const timer = useRef(null);

  /* تحميل البيانات */
  useEffect(() => {
    api.get("/initiatives").then(r => { if (Array.isArray(r.data)) setInitiatives(r.data); }).catch(() => {});
    api.get("/stats").then(r => { if (Array.isArray(r.data)) setStats(r.data); }).catch(() => {});
    api.get("/news").then(r => { if (Array.isArray(r.data)) setNews(r.data.slice(0, 3)); }).catch(() => {});
  }, []);

  /* تدوير الشرائح */
  useEffect(() => {
    timer.current = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(timer.current);
  }, []);

  const kpi = key => stats.find(s => s.key === key) || {};

  return (
    <main>

      {/* ════════════════════════════════════════
          1 — HERO
      ════════════════════════════════════════ */}
      <section
        className="relative flex flex-col justify-center"
        style={{ minHeight: "88vh" }}
      >
        {/* خلفيات الشرائح — كلها absolute inset-0 */}
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              background: `linear-gradient(135deg, ${s.color} 0%, #0b1e35 100%)`,
              opacity: i === slide ? 1 : 0,
              zIndex: 0,
            }}
          />
        ))}

        {/* طبقة نقاط خفيفة */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)",
            backgroundSize: "36px 36px",
            zIndex: 1,
          }}
        />

        {/* المحتوى — مستقل عن الخلفية */}
        <div
          className="relative container mx-auto px-6 py-24"
          style={{ zIndex: 2 }}
        >
          {/* خط ذهبي صغير */}
          <div className="flex items-center gap-3 mb-6">
            <div style={{ width: 32, height: 2, background: "#D7AA35", borderRadius: 2 }} />
            <span className="text-[#D7AA35] text-xs font-bold tracking-widest">HCBSSD · الكويت</span>
          </div>

          {/* العنوان */}
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 leading-none">
            نبني<br />
            <span style={{ color: "#D7AA35" }}>الإنسان</span>
          </h1>

          {/* الوصف */}
          <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md">
            جمعية نفع عام كويتية تبني قدرات فئات الرعاية الاجتماعية عبر مبادرات وطنية متخصصة.
          </p>

          {/* الأزرار */}
          <div className="flex flex-wrap gap-3 mb-14">
            <a
              href="#initiatives"
              className="font-bold px-6 py-3 rounded-full text-sm"
              style={{ background: "#D7AA35", color: "#1F3A5F" }}
            >
              مبادراتنا الوطنية
            </a>
            <Link
              to="/about"
              className="font-bold px-6 py-3 rounded-full text-sm text-white"
              style={{ border: "2px solid rgba(255,255,255,0.35)" }}
            >
              من نحن
            </Link>
          </div>

          {/* مؤشرات الشريحة */}
          <div className="flex gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={i}
                aria-label={s.label}
                onClick={() => { setSlide(i); clearInterval(timer.current); }}
                style={{
                  height: 8,
                  width: i === slide ? 28 : 8,
                  borderRadius: 9999,
                  background: i === slide ? "#D7AA35" : "rgba(255,255,255,0.35)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          2 — شريط الأرقام السريعة
      ════════════════════════════════════════ */}
      <section style={{ background: "#162e4d" }}>
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
            {[
              { v: kpi("jobs").value || "210",         u: "",  l: "فرصة عمل لائقة" },
              { v: kpi("members").value || "381",      u: "",  l: "منتسب في دفعات مكتملة" },
              { v: kpi("continuity").value || "97.6",  u: "%", l: "استمرارية وظيفية" },
              { v: kpi("employ_rate").value || "55.1", u: "%", l: "نسبة التوظيف التراكمية" },
            ].map((item, i) => (
              <div key={i} className="py-2">
                <p className="text-2xl font-bold" style={{ color: "#D7AA35" }}>
                  {item.v}<span className="text-base">{item.u}</span>
                </p>
                <p className="text-white/50 text-xs mt-1">{item.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          3 — من نحن
      ════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* نص */}
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#D7AA35" }}>من نحن</p>
              <h2 className="text-4xl font-bold text-[#1F3A5F] leading-tight mb-4">
                جمعية البناء البشري<br />
                <span style={{ color: "#D7AA35" }}>للتنمية الاجتماعية</span>
              </h2>
              <div style={{ width: 48, height: 3, background: "#D7AA35", borderRadius: 2, marginBottom: 20 }} />
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                جمعية نفع عام كويتية أُسست بموجب القرار الوزاري 155/أ لسنة 2022، تعمل على بناء قدرات فئات الرعاية الاجتماعية عبر مبادرات وطنية متخصصة تجمع بين التدخل المهني والتمكين الحقيقي والاندماج المستدام.
              </p>
              <Link
                to="/about"
                className="text-sm font-bold"
                style={{ color: "#1F3A5F", textDecoration: "underline", textUnderlineOffset: 4 }}
              >
                اقرأ أكثر ←
              </Link>
            </div>

            {/* بطاقات القيم */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "الرؤية",     desc: "مجتمع كويتي متماسك ومنتج",          icon: "🎯", bg: "#1F3A5F" },
                { title: "الرسالة",    desc: "تمكين الفئات الأكثر احتياجاً",       icon: "💡", bg: "#D7AA35" },
                { title: "القيم",      desc: "الاحترام · الأثر · الشراكة",         icon: "⭐", bg: "#2E9E6B" },
                { title: "المنهجية",   desc: "SPI وقياس العائد الاجتماعي SROI",   icon: "📊", bg: "#C8102E" },
              ].map(v => (
                <div
                  key={v.title}
                  className="rounded-xl p-5"
                  style={{ background: v.bg + "10", border: `1px solid ${v.bg}20` }}
                >
                  <span className="text-2xl block mb-3">{v.icon}</span>
                  <h3 className="font-bold text-[#1F3A5F] mb-1 text-sm">{v.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          4 — المبادرات
      ════════════════════════════════════════ */}
      <section id="initiatives" style={{ background: "#F5F2EC" }} className="py-20">
        <div className="container mx-auto px-6">
          {/* رأس القسم */}
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#D7AA35" }}>
              مبادراتنا الوطنية
            </p>
            <h2 className="text-4xl font-bold text-[#1F3A5F]">
              أربع مسارات نحو{" "}
              <span style={{ color: "#D7AA35" }}>حياة أكثر اتزانًا</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
              كل مبادرة تستجيب لاحتياج مختلف — تدخل متخصص، تمكين حقيقي، اندماج مستدام.
            </p>
          </div>

          {/* الشبكة */}
          {initiatives.length === 0 ? (
            <p className="text-center text-gray-400 py-16">جاري التحميل…</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {initiatives.map(init => <InitCard key={init.slug} init={init} />)}
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════
          5 — الأثر بالأرقام
      ════════════════════════════════════════ */}
      <section className="py-20" style={{ background: "#1F3A5F" }}>
        <div className="container mx-auto px-6">
          {/* رأس */}
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#D7AA35" }}>
              الأثر بالأرقام
            </p>
            <h2 className="text-4xl font-bold text-white">
              حين نقيس الأثر،{" "}
              <span style={{ color: "#D7AA35" }}>نرى الإنسان</span>
            </h2>
            <div className="mt-4">
              <Link
                to="/impact"
                className="text-sm font-bold underline underline-offset-4"
                style={{ color: "#D7AA35" }}
              >
                كيف نقيس الأثر؟ ←
              </Link>
            </div>
          </div>

          {/* شبكة الإحصائيات */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { key: "jobs",         color: "#D7AA35" },
              { key: "members",      color: "#2E9E6B" },
              { key: "retention",    color: "#D7AA35" },
              { key: "employ_rate",  color: "#D7AA35" },
              { key: "continuity",   color: "#D7AA35" },
              { key: "sandhom_proj", color: "#C8102E" },
              { key: "sandhom_mem",  color: "#C8102E" },
              { key: "impact_2030",  color: "#2E9E6B" },
            ].map(({ key, color }) => {
              const s = stats.find(st => st.key === key);
              return s ? <KpiCard key={key} value={s.value} unit={s.unit} label={s.label} color={color} /> : null;
            })}
          </div>

          {/* مخطط */}
          <div
            className="rounded-2xl p-8"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <h3 className="text-white font-bold text-base mb-1 text-center">
              توزيع مشاريع ساندهم على المراحل
            </h3>
            <p className="text-white/40 text-xs text-center mb-6">73 مشروعًا إنشائيًا</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={STAGE_DATA} barSize={36} barCategoryGap="30%">
                <XAxis
                  dataKey="name"
                  tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: "#0f2540",
                    border: "1px solid #D7AA35",
                    borderRadius: 10,
                    color: "#fff",
                    fontSize: 13,
                  }}
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {STAGE_DATA.map((e, i) => <Cell key={i} fill={e.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          6 — آخر الأخبار
      ════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          {/* رأس */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#D7AA35" }}>
                المركز الإعلامي
              </p>
              <h2 className="text-4xl font-bold text-[#1F3A5F]">آخر الأخبار</h2>
            </div>
            <Link
              to="/media"
              className="text-sm font-bold text-[#1F3A5F] pb-0.5"
              style={{ borderBottom: "2px solid #D7AA35" }}
            >
              عرض الكل ←
            </Link>
          </div>

          {/* البطاقات */}
          {news.length === 0 ? (
            <p className="text-center text-gray-400 py-12">لا توجد أخبار منشورة حالياً</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {news.map(n => (
                <article
                  key={n.id}
                  className="rounded-2xl overflow-hidden bg-white"
                  style={{
                    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                    border: "1px solid #f0ece4",
                  }}
                >
                  {/* صورة */}
                  <div
                    className="relative overflow-hidden"
                    style={{ height: 180, background: "linear-gradient(135deg,#1F3A5F,#2E8BA8)" }}
                  >
                    {n.image ? (
                      <img src={n.image} alt={n.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1">
                          <rect x="2" y="2" width="20" height="20" rx="3"/>
                          <path d="M7 8h10M7 12h10M7 16h6"/>
                        </svg>
                      </div>
                    )}
                    {/* تصنيف */}
                    <span
                      className="absolute top-3 end-3 text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "#D7AA35", color: "#1F3A5F" }}
                    >
                      {n.category}
                    </span>
                  </div>

                  {/* نص */}
                  <div className="p-5">
                    <h3
                      className="font-bold text-[#1F3A5F] text-sm leading-snug mb-2"
                      style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                    >
                      {n.title}
                    </h3>
                    <p
                      className="text-gray-500 text-xs leading-relaxed"
                      style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                    >
                      {n.body}
                    </p>
                    <p className="text-gray-400 text-xs mt-4">
                      {new Date(n.createdAt).toLocaleDateString("ar-KW", {
                        year: "numeric", month: "long", day: "numeric"
                      })}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════
          7 — الخطة الاستراتيجية
      ════════════════════════════════════════ */}
      <section style={{ background: "#F5F2EC" }} className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* النص */}
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#D7AA35" }}>
                الخطة الاستراتيجية 2026 — 2030
              </p>
              <h2 className="text-4xl font-bold text-[#1F3A5F] leading-tight mb-4">
                من الخدمة<br />
                <span style={{ color: "#D7AA35" }}>إلى المرجعية</span>
              </h2>
              <div style={{ width: 48, height: 3, background: "#D7AA35", borderRadius: 2, marginBottom: 20 }} />
              <p className="text-gray-500 text-sm leading-relaxed">
                خطة تعيد تصميم مسارات الحياة وتربط كل تدخل بقياس أثر ومعرفة تطبيقية وشراكات تضمن الاستدامة.
              </p>
            </div>

            {/* الخط الزمني */}
            <div className="flex flex-col gap-0">
              {STRATEGY_STEPS.map((s, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start py-5"
                  style={{ borderBottom: i < STRATEGY_STEPS.length - 1 ? "1px solid #E2DDD4" : "none" }}
                >
                  <div
                    className="flex items-center justify-center text-white font-bold text-sm shrink-0 rounded-full"
                    style={{ width: 40, height: 40, background: s.color }}
                  >
                    {s.num}
                  </div>
                  <div className="pt-1.5">
                    <h4 className="font-bold text-[#1F3A5F] text-sm">{s.title}</h4>
                    <p className="text-gray-500 text-xs mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          8 — شريط التسجيل CTA
      ════════════════════════════════════════ */}
      <section style={{ background: "#D7AA35" }} className="py-14">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#1F3A5F] mb-3">هل أنت مستعد للانضمام؟</h2>
          <p className="text-[#1F3A5F]/70 text-sm mb-8 max-w-md mx-auto">
            سجّل في إحدى المبادرات الوطنية وانضم إلى مسار التمكين والاندماج.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { slug: "shurakaa", label: "شركاء لتوظيفهم", bg: "#1F3A5F" },
              { slug: "sanedhom", label: "ساندهم",          bg: "#C8102E" },
              { slug: "taafee",   label: "تعافي",            bg: "#2E9E6B" },
              { slug: "amal",     label: "أمل",              bg: "#7A4B8F" },
            ].map(item => (
              <Link
                key={item.slug}
                to={`/register/${item.slug}`}
                className="font-bold px-6 py-3 rounded-full text-sm text-white"
                style={{ background: item.bg }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

