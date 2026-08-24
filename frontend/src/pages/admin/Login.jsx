import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await login(form.username, form.password);
      navigate("/admin");
    } catch {
      setError("اسم المستخدم أو كلمة السر غير صحيحة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#1F3A5F] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center mb-4">
            <span className="text-[#1F3A5F] font-bold text-2xl">ب</span>
          </div>
          <h1 className="text-white font-bold text-2xl">لوحة الإدارة</h1>
          <p className="text-white/60 text-sm mt-1">جمعية البناء البشري للتنمية الاجتماعية</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 flex flex-col gap-4 shadow-2xl">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">اسم المستخدم</label>
            <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })}
              required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1F3A5F]" placeholder="admin" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">كلمة السر</label>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
              required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1F3A5F]" placeholder="••••••••" />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-[#1F3A5F] text-white py-3 rounded-lg font-bold disabled:opacity-50 hover:bg-[#162c4a] transition-colors">
            {loading ? "جاري الدخول..." : "تسجيل الدخول"}
          </button>
        </form>
        <p className="text-center text-white/40 text-xs mt-6">admin / admin123</p>
      </div>
    </div>
  );
}
