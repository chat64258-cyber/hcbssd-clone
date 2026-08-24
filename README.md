# جمعية البناء البشري للتنمية الاجتماعية — HCBSSD Clone

موقع ويب كامل مع داشبورد إدارة لجمعية البناء البشري للتنمية الاجتماعية.

## 🚀 كيفية التشغيل

### الخطوة 1: تشغيل الباك إند (Backend)
```bash
cd backend
node server.js
```
سيعمل على: http://localhost:5000

### الخطوة 2: تشغيل الفرونت إند (Frontend)
```bash
cd frontend
npm run dev
```
سيعمل على: http://localhost:5173

## 🔐 بيانات تسجيل الدخول للأدمن
- **الرابط:** http://localhost:5173/admin
- **المستخدم:** admin
- **كلمة السر:** admin123

## 📄 صفحات الموقع

| الصفحة | الرابط |
|--------|--------|
| الرئيسية | / |
| من نحن | /about |
| الأثر بالأرقام | /impact |
| المركز الإعلامي | /media |
| تسجيل شركاء | /register/shurakaa |
| تسجيل ساندهم | /register/sanedhom |
| تسجيل تعافي | /register/taafee |
| تسجيل أمل | /register/amal |

## 🛠 داشبورد الأدمن

| الصفحة | الرابط |
|--------|--------|
| تسجيل الدخول | /admin/login |
| نظرة عامة | /admin |
| إدارة الأخبار | /admin/news |
| إدارة الإحصائيات | /admin/stats |
| إدارة المبادرات | /admin/initiatives |
| إدارة التسجيلات | /admin/registrations |

## ⚙️ التقنيات المستخدمة

- **Frontend:** React 18 + Vite + Tailwind CSS + Recharts
- **Backend:** Node.js + Express + lowdb (JSON database)
- **Auth:** JWT tokens
- **Uploads:** Multer
