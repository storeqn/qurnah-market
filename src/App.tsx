import { Component, lazy, Suspense, type ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
const Home = lazy(() => import("./pages/Home"));
const Browse = lazy(() => import("./pages/Browse"));
const StorePage = lazy(() => import("./pages/StorePage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="empty">
        <h1>تعذّر تحميل الصفحة</h1>
        <p>تحقق من اتصالك ثم أعد المحاولة.</p>
        <button onClick={() => window.location.reload()}>إعادة التحميل</button>
      </div>
    ) : (
      this.props.children
    );
  }
}
export default function App() {
  return (
    <Layout>
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="loading" role="status">
              جارٍ تحميل السوق…
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/stores/:id" element={<StorePage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/merchant" element={<Dashboard role="merchant" />} />
            <Route path="/admin" element={<Dashboard role="admin" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}
