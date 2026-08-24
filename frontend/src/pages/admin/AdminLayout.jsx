import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const NAV = [
  { to: "/admin", label: "نظرة عامة", icon: "📊", end: true },
  { to: "/admin/news", label: "الأخبار", icon: "📰" },
  { to: "/admin/stats", label: "الإحصائيات", icon: "📈" },
  { to: "/admin/initiatives", label: "المبادرات", icon: "🎯" },
  { to: "/admin/registrations", label: "التسجيلات", icon: "📋" },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate("/admin/login"); };

  return (
    <div dir="rtl" className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-[#1F3A5F] text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-white/10">
          <div className="font-bold text-sm">لوحة الإدارة</div>
          <div className="text-white/50 text-xs mt-0.5">مرحباً، {admin?.username}</div>
        </div>
        <nav className="flex-1 p-3">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 transition-colors ${isActive ? "bg-[#D7AA35] text-[#1F3A5F] font-bold" : "text-white/70 hover:text-white hover:bg-white/10"}`}>
              <span>{n.icon}</span> {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <a href="/" target="_blank" className="flex items-center gap-2 text-white/60 hover:text-white text-xs mb-3 transition-colors">
            🌐 <span>عرض الموقع</span>
          </a>
          <button onClick={handleLogout} className="w-full text-right text-white/60 hover:text-red-400 text-xs transition-colors">تسجيل الخروج ↗</button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
