import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import PwaNotice from "./PwaNotice";
import {
  Store,
  Search,
  House,
  Grid2X2,
  LayoutDashboard,
  MapPin,
} from "lucide-react";
export default function Layout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
    setQuery(new URLSearchParams(location.search).get("q") ?? "");
  }, [location.pathname, location.search]);
  return (
    <>
      <div className="topline">
        <span>
          <MapPin size={13} /> من القرنة… لكل أهل القرنة
        </span>
        <span>نسخة تجريبية • لا تستقبل طلبات فعلية</span>
      </div>
      <header>
        <div className="header-inner">
          <Link to="/" className="brand">
            <span className="brand-icon">
              <Store />
            </span>
            <span>
              سوق القرنة<small>QURNAH MARKET</small>
            </span>
          </Link>
          <form
            className="search"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/browse?q=${encodeURIComponent(query)}`);
            }}
          >
            <Search size={20} />
            <input
              aria-label="البحث عن منتج أو متجر"
              placeholder="عن شنو تدور اليوم؟"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">بحث</button>
          </form>
          <Link className="merchant-link" to="/merchant">
            <LayoutDashboard size={18} /> لوحة التاجر
          </Link>
        </div>
        <nav className="desktop-nav" aria-label="التنقل الرئيسي">
          <NavLink to="/" end>
            الرئيسية
          </NavLink>
          <NavLink to="/browse">تسوّق الأقسام</NavLink>
          <Link to="/browse?view=stores">كل المتاجر</Link>
          <NavLink to="/admin">لوحة المدير</NavLink>
          <span>متاجر محلية. خيارات أكثر.</span>
        </nav>
      </header>
      <PwaNotice />
      <main className="container">{children}</main>
      <footer>
        <Link className="brand" to="/">
          سوق القرنة
        </Link>
        <p>متاجر مدينتك في مكان واحد.</p>
        <small>
          جميع المتاجر والأسعار والمخزون بيانات توضيحية • المرحلة الأولى
        </small>
      </footer>
      <nav className="bottom-nav" aria-label="التنقل على الهاتف">
        <NavLink to="/" end>
          <House size={21} />
          الرئيسية
        </NavLink>
        <NavLink to="/browse">
          <Grid2X2 size={21} />
          الأقسام
        </NavLink>
        <NavLink to="/merchant">
          <Store size={21} />
          التاجر
        </NavLink>
        <NavLink to="/admin">
          <LayoutDashboard size={21} />
          الإدارة
        </NavLink>
      </nav>
    </>
  );
}
