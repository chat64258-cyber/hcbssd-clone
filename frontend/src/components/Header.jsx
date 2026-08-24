import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const NAV = [
  { to: "/about",   label: "من نحن" },
  { to: "/#initiatives", label: "مبادراتنا" },
  { to: "/impact",  label: "الأثر بالأرقام" },
  { to: "/media",   label: "المركز الإعلامي" },
  { to: "/#contact", label: "تواصل معنا" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* ── شريط أعلى ──────────────────────────── */}
      <div className="bg-[#1F3A5F]">
        <div className="container px-6 py-2 flex justify-between items-center text-xs text-white/70">
          <span>جمعية نفع عام كويتية • القرار الوزاري 155/أ لسنة 2022</span>
          <div className="hidden md:flex items-center gap-4">
            <a href="/#contact" className="hover:text-[#D7AA35] transition-colors">تواصل معنا</a>
            <span className="opacity-30">|</span>
            <Link to="/media" className="hover:text-[#D7AA35] transition-colors">المركز الإعلامي</Link>
          </div>
        </div>
      </div>

      {/* ── شريط التنقل ──────────────────────────── */}
      <div className="container px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* الشعار */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-[#1F3A5F] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-base">ب</span>
            </div>
            <div className="leading-tight">
              <div className="font-bold text-[#1F3A5F] text-sm">جمعية البناء البشري</div>
              <div className="text-gray-400 text-xs">للتنمية الاجتماعية</div>
            </div>
          </Link>

          {/* روابط رئيسية */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className="text-sm font-medium text-gray-600 hover:text-[#1F3A5F] transition-colors whitespace-nowrap"
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          {/* أزرار التسجيل */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/register/shurakaa"
              className="text-xs font-bold bg-[#1F3A5F] text-white px-3 py-1.5 rounded-full hover:bg-[#162c4a] transition-colors whitespace-nowrap"
            >
              شركاء لتوظيفهم
            </Link>
            <Link
              to="/register/sanedhom"
              className="text-xs font-bold bg-[#C8102E] text-white px-3 py-1.5 rounded-full hover:bg-[#a00e26] transition-colors whitespace-nowrap"
            >
              ساندهم
            </Link>
          </div>

          {/* زر القائمة للجوال */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-gray-600 hover:text-[#1F3A5F] transition-colors"
            aria-label="القائمة"
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 5h16M4 12h16M4 19h16"/>
              </svg>
            )}
          </button>
        </div>

        {/* قائمة الجوال */}
        {open && (
          <div className="lg:hidden mt-3 pt-3 border-t border-gray-100 flex flex-col gap-1 pb-2">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-gray-700 py-2.5 px-2 rounded-lg hover:bg-gray-50 hover:text-[#1F3A5F] transition-colors"
              >
                {n.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-3 mt-1 border-t border-gray-100">
              <Link to="/register/shurakaa" className="flex-1 text-center text-xs font-bold bg-[#1F3A5F] text-white py-2 rounded-full">
                شركاء لتوظيفهم
              </Link>
              <Link to="/register/sanedhom" className="flex-1 text-center text-xs font-bold bg-[#C8102E] text-white py-2 rounded-full">
                ساندهم
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
