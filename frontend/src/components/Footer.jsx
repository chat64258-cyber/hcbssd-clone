import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#1F3A5F] text-white">
      {/* ── القسم الرئيسي ─────────────────────── */}
      <div className="container px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* الهوية */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">ب</span>
              </div>
              <div>
                <div className="font-bold text-white">جمعية البناء البشري</div>
                <div className="text-white/50 text-xs">للتنمية الاجتماعية</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-5">
              جمعية نفع عام كويتية تبني قدرات فئات الرعاية الاجتماعية عبر مبادرات وطنية متخصصة، تجمع بين التدخل المهني والتمكين الحقيقي والاندماج المستدام.
            </p>
            <div className="text-white/30 text-xs">القرار الوزاري 155/أ لسنة 2022</div>
          </div>

          {/* روابط سريعة */}
          <div>
            <h4 className="font-bold text-[#D7AA35] mb-5 text-sm">روابط سريعة</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { to: "/about",              label: "من نحن" },
                { to: "/impact",             label: "الأثر بالأرقام" },
                { to: "/media",              label: "المركز الإعلامي" },
                { to: "/register/shurakaa",  label: "سجّل — شركاء لتوظيفهم" },
                { to: "/register/sanedhom",  label: "سجّل — ساندهم" },
                { to: "/admin",              label: "لوحة الإدارة" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-white/60 text-xs hover:text-[#D7AA35] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* تواصل */}
          <div>
            <h4 className="font-bold text-[#D7AA35] mb-5 text-sm">تواصل معنا</h4>
            <div className="flex flex-col gap-4">
              {[
                { icon: "📞", text: "+965 XXXX XXXX" },
                { icon: "✉️", text: "info@hcbssd-kw.com" },
                { icon: "📍", text: "دولة الكويت" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-3 text-white/60 text-xs">
                  <span>{c.icon}</span>
                  <span>{c.text}</span>
                </div>
              ))}
            </div>

            {/* المبادرات */}
            <div className="mt-6">
              <h4 className="text-white/40 text-xs mb-3">المبادرات الأربع</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { slug: "shurakaa", label: "شركاء", color: "#1F3A5F" },
                  { slug: "sanedhom", label: "ساندهم", color: "#C8102E" },
                  { slug: "taafee",   label: "تعافي",  color: "#2E9E6B" },
                  { slug: "amal",     label: "أمل",    color: "#7A4B8F" },
                ].map((i) => (
                  <Link
                    key={i.slug}
                    to={`/register/${i.slug}`}
                    className="text-xs font-bold text-white px-3 py-1 rounded-full hover:opacity-80 transition-opacity"
                    style={{ background: i.color }}
                  >
                    {i.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── شريط أسفل ────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="container px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <span>© {new Date().getFullYear()} جمعية البناء البشري للتنمية الاجتماعية. جميع الحقوق محفوظة.</span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D7AA35] inline-block" />
            <span>نبني الإنسان</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
