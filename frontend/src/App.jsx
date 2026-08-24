import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Impact from "./pages/Impact.jsx";
import Media from "./pages/Media.jsx";
import Register from "./pages/Register.jsx";
import AdminLogin from "./pages/admin/Login.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AdminNews from "./pages/admin/AdminNews.jsx";
import AdminStats from "./pages/admin/AdminStats.jsx";
import AdminInitiatives from "./pages/admin/AdminInitiatives.jsx";
import AdminRegistrations from "./pages/admin/AdminRegistrations.jsx";

function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center min-h-screen text-gray-400">جاري التحميل...</div>;
  if (!admin) return <Navigate to="/admin/login" replace />;
  return children;
}

function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Site */}
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/impact" element={<PublicLayout><Impact /></PublicLayout>} />
          <Route path="/media" element={<PublicLayout><Media /></PublicLayout>} />
          <Route path="/register/:slug" element={<PublicLayout><Register /></PublicLayout>} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="news" element={<AdminNews />} />
            <Route path="stats" element={<AdminStats />} />
            <Route path="initiatives" element={<AdminInitiatives />} />
            <Route path="registrations" element={<AdminRegistrations />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<PublicLayout><div className="py-32 text-center text-gray-400"><h2 className="text-4xl font-bold text-[#1F3A5F] mb-4">404</h2><p>الصفحة غير موجودة</p><a href="/" className="btn-primary mt-6 inline-block">العودة للرئيسية</a></div></PublicLayout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
