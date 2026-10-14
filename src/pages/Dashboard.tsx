import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Store,
  ShoppingBag,
  Settings,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { products, stores, categories } from "../data/catalog";
import { formatPrice } from "../lib/catalog";
export default function Dashboard({ role }: { role: "merchant" | "admin" }) {
  const [tab, setTab] = useState("overview");
  const admin = role === "admin";
  const items = admin
    ? products
    : products.filter((p) => p.storeId === "firdaws");
  const tabs = [
    { id: "overview", name: "نظرة عامة", icon: LayoutDashboard },
    {
      id: admin ? "stores" : "products",
      name: admin ? "المتاجر" : "المنتجات",
      icon: admin ? Store : Package,
    },
    {
      id: admin ? "categories" : "orders",
      name: admin ? "الأقسام" : "الطلبات",
      icon: admin ? Users : ShoppingBag,
    },
    { id: "settings", name: "الإعدادات", icon: Settings },
  ];
  return (
    <>
      <div className="page-heading">
        <span className="eyebrow">مساحة العمل</span>
        <h1>{admin ? "لوحة مدير السوق" : "لوحة التاجر"}</h1>
        <p>
          {admin
            ? "نظرة على متاجر وأقسام السوق"
            : "متجر الفردوس • حساب تاجر توضيحي"}
        </p>
      </div>
      <div className="demo-notice">
        <span>
          هيكل تجريبي للعرض فقط؛ لا توجد مصادقة أو صلاحيات فعلية أو حفظ على
          خادم. عزل التجار وإدارة الحسابات سيُنفّذان عند ربط Supabase.
        </span>
      </div>
      <div className="dashboard">
        <aside aria-label="أقسام لوحة التحكم">
          {tabs.map((t) => (
            <button
              className={tab === t.id ? "active" : ""}
              key={t.id}
              onClick={() => setTab(t.id)}
            >
              <t.icon size={19} />
              {t.name}
            </button>
          ))}
        </aside>
        <section className="dashboard-panel">
          {tab === "overview" ? (
            <>
              <h2>مرحباً، يوم جديد في السوق</h2>
              <p>ملخص البيانات المحلية التجريبية</p>
              <div className="stats">
                <div>
                  <small>المنتجات</small>
                  <strong>{items.length}</strong>
                </div>
                <div>
                  <small>{admin ? "المتاجر" : "القطع المتوفرة"}</small>
                  <strong>
                    {admin
                      ? stores.length
                      : items.reduce((sum, p) => sum + p.stock, 0)}
                  </strong>
                </div>
                <div>
                  <small>طلبات فعلية</small>
                  <strong>0</strong>
                </div>
              </div>
              <h3>المنتجات والمخزون</h3>
              <ProductTable items={items} />
            </>
          ) : tab === "products" ? (
            <>
              <h2>منتجات المتجر</h2>
              <p>
                عرض المخزون. إضافة وتعديل المنتجات قيد التطوير للمرحلة التالية.
              </p>
              <ProductTable items={items} />
            </>
          ) : tab === "stores" ? (
            <>
              <h2>المتاجر</h2>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>المتجر</th>
                      <th>الموقع</th>
                      <th>الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stores.map((s) => (
                      <tr key={s.id}>
                        <td>
                          <Link to={`/stores/${s.id}`}>{s.name}</Link>
                        </td>
                        <td>{s.address}</td>
                        <td>تجريبي</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : tab === "categories" ? (
            <>
              <h2>أقسام السوق</h2>
              {categories.map((c) => (
                <div className="category-line" key={c.id}>
                  {c.name}
                  <span>
                    {products.filter((p) => p.category === c.id).length} منتجات
                  </span>
                </div>
              ))}
            </>
          ) : tab === "orders" ? (
            <div className="empty">
              <ShoppingBag size={38} />
              <h2>لا توجد طلبات فعلية</h2>
              <p>إدارة الطلبات ستُفعّل بعد ربط قاعدة البيانات.</p>
            </div>
          ) : (
            <>
              <h2>إعدادات {admin ? "السوق" : "المتجر"}</h2>
              <p>
                إعدادات الحساب ورفع الشعار وبيانات الاتصال ستتوفر بعد ربط
                المصادقة والتخزين.
              </p>
              <dl>
                <div>
                  <dt>مصدر البيانات</dt>
                  <dd>ملفات تجريبية محلية</dd>
                </div>
                <div>
                  <dt>حالة الاتصال</dt>
                  <dd>Supabase غير مربوط</dd>
                </div>
              </dl>
            </>
          )}
        </section>
      </div>
    </>
  );
}
function ProductTable({ items }: { items: typeof products }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>المنتج</th>
            <th>السعر</th>
            <th>المخزون</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id}>
              <td>
                <Link to={`/products/${p.id}`}>{p.name}</Link>
              </td>
              <td>{formatPrice(p.price)}</td>
              <td>{p.stock || "نفدت الكمية"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
