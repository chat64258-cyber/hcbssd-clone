import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Component } from "react";
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

/* ── Error Boundary ─────────────────────────────── */
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error("App error:", error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div dir="rtl" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", background: "#F5F2EC" }}>
          <div style={{ maxWidth: 400, textAlign: "center", padding: 32 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <h2 style={{ color: "#1F3A5F", marginBottom: 8 }}>حدث خطأ في الصفحة</h2>
            <p style={{ color: "#666", fontSize: 14, marginBottom: 24 }}>يرجى إعادة تحميل الصفحة أو المحاولة لاحقاً</p>
            <button
              onClick={() => window.location.reload()}
              style={{ background: "#1F3A5F", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 999, cursor: "pointer", fontFamily: "inherit", fontSize: 14 }}
            >
              إعادة التحميل
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ── Protected Route ────────────────────────────── */
function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();
  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", color: "#1F3A5F" }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div>
        <p style={{ fontFamily: "sans-serif" }}>جاري التحميل...</p>
      </div>
    </div>
  );
  if (!admin) return <Navigate to="/admin/login" replace />;
  return children;
}

/* ── Public layout wrapper ──────────────────────── */
function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

/* ── App ────────────────────────────────────────── */
export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<PublicLayout><ErrorBoundary><HomePage /></ErrorBoundary></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><ErrorBoundary><About /></ErrorBoundary></PublicLayout>} />
            <Route path="/impact" element={<PublicLayout><ErrorBoundary><Impact /></ErrorBoundary></PublicLayout>} />
            <Route path="/media" element={<PublicLayout><ErrorBoundary><Media /></ErrorBoundary></PublicLayout>} />
            <Route path="/register/:slug" element={<PublicLayout><ErrorBoundary><Register /></ErrorBoundary></PublicLayout>} />
            {/* Admin */}
            <Route path="/admin/login" element={<ErrorBoundary><AdminLogin /></ErrorBoundary>} />
            <Route path="/admin" element={<ProtectedRoute><ErrorBoundary><AdminLayout /></ErrorBoundary></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="stats" element={<AdminStats />} />
              <Route path="initiatives" element={<AdminInitiatives />} />
              <Route path="registrations" element={<AdminRegistrations />} />
            </Route>
            {/* 404 */}
            <Route path="*" element={
              <PublicLayout>
                <div dir="rtl" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 32 }}>
                  <h1 style={{ fontSize: 80, fontWeight: 800, color: "#1F3A5F", margin: 0 }}>404</h1>
                  <p style={{ color: "#666", margin: "12px 0 24px" }}>الصفحة غير موجودة</p>
                  <a href="/" style={{ background: "#1F3A5F", color: "#fff", padding: "10px 24px", borderRadius: 999, textDecoration: "none", fontSize: 14 }}>العودة للرئيسية</a>
                </div>
              </PublicLayout>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}