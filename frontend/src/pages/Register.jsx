import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api.js";

const INIT_INFO = {
  shurakaa: { name: "شركاء لتوظيفهم", color: "#1F3A5F", desc: "برنامج تدريب وتوظيف للأشخاص ذوي الإعاقة" },
  sanedhom: { name: "ساندهم", color: "#C8102E", desc: "مسار تأهيل للمفرج عنهم من المؤسسات الإصلاحية" },
  taafee:   { name: "تعافي", color: "#2E9E6B", desc: "برنامج دعم صحي ونفسي واجتماعي" },
  amal:     { name: "أمل", color: "#7A4B8F", desc: "دعم الأطفال والنساء وكبار السن والأسر المحتاجة" },
};

export default function Register() {
  const { slug } = useParams();
  const info = INIT_INFO[slug] || { name: slug, color: "#1F3A5F", desc: "" };
  const [form, setForm] = useState({ fullName: "", civilId: "", phone: "", email: "", gender: "", notes: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/registrations", { ...form, initiativeSlug: slug });
      setStatus("success");
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  if (status === "success") return (
    <div dir="rtl" className="py-20">
      <div className="container max-w-lg mx-auto text-center">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-[#2E9E6B] mb-3">تم تسجيل طلبك بنجاح!</h2>
        <p className="text-gray-600">سيتواصل معك فريق الجمعية قريباً على رقم الهاتف المسجّل.</p>
        <a href="/" className="btn-primary mt-6 inline-block">العودة للرئيسية</a>
      </div>
    </div>
  );

  return (
    <div dir="rtl" className="py-16 bg-[#F8F5EE] min-h-screen">
      <div className="container max-w-xl mx-auto">
        <div className="h-1.5 rounded-full mb-6" style={{ background: info.color }} />
        <h1 className="text-3xl font-bold mb-1" style={{ color: info.color }}>التسجيل في {info.name}</h1>
        <p className="text-gray-500 mb-8 text-sm">{info.desc}</p>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm flex flex-col gap-5">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">الاسم الكامل *</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1F3A5F]" placeholder="اسمك الكامل" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">الرقم المدني</label>
              <input name="civilId" value={form.civilId} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1F3A5F]" placeholder="12 رقمًا" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">رقم الهاتف *</label>
              <input name="phone" value={form.phone} onChange={handleChange} required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1F3A5F]" placeholder="+965..." />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">البريد الإلكتروني</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1F3A5F]" placeholder="example@email.com" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">الجنس</label>
            <div className="flex gap-4">
              {["ذكر", "أنثى"].map((g) => (
                <label key={g} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={handleChange} className="accent-[#1F3A5F]" /> {g}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">ملاحظات إضافية</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1F3A5F] resize-none" placeholder="أي معلومات إضافية..." />
          </div>
          {status === "error" && <p className="text-red-600 text-sm">حدث خطأ، يرجى المحاولة مجدداً.</p>}
          <button type="submit" disabled={loading} className="w-full py-3 rounded-lg text-white font-bold text-base disabled:opacity-50 hover:opacity-90 transition-opacity" style={{ background: info.color }}>
            {loading ? "جاري الإرسال..." : "إرسال الطلب"}
          </button>
        </form>
      </div>
    </div>
  );
}
