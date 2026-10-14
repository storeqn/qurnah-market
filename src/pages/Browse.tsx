import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { categories, stores } from "../data/catalog";
import { filterProducts } from "../lib/catalog";
import { ProductCard, StoreCard } from "../components/Cards";
export default function Browse() {
  const [params, setParams] = useSearchParams();
  const [count, setCount] = useState(4);
  const query = params.get("q") ?? "";
  const category = params.get("category") ?? "all";
  const view = params.get("view");
  const found = filterProducts(query, category);
  return (
    <>
      <div className="page-heading">
        <span className="eyebrow">اكتشف سوق القرنة</span>
        <h1>
          {view === "stores"
            ? "متاجر السوق"
            : query
              ? `نتائج البحث عن «${query}»`
              : "اختيارات من متاجر مدينتك"}
        </h1>
        <p>المنتجات والمتاجر المعروضة تجريبية.</p>
      </div>
      <div className="filter-bar" aria-label="فلترة الأقسام">
        {[{ id: "all", name: "كل الأقسام" }, ...categories].map((c) => (
          <button
            key={c.id}
            className={category === c.id ? "active" : ""}
            onClick={() => {
              const next = new URLSearchParams(params);
              next.set("category", c.id);
              setParams(next);
              setCount(4);
            }}
          >
            {c.name}
          </button>
        ))}
      </div>
      {view === "stores" ? (
        <div className="store-grid">
          {stores
            .filter((s) => category === "all" || s.category === category)
            .map((s) => (
              <StoreCard key={s.id} store={s} />
            ))}
        </div>
      ) : (
        <>
          <p className="result-count">{found.length} منتجات</p>
          {found.length ? (
            <div className="product-grid">
              {found.slice(0, count).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>ما لقينا منتجات مطابقة</h2>
              <p>جرّب اسم منتج أو متجر آخر، أو غيّر القسم.</p>
            </div>
          )}
          {count < found.length && (
            <button className="load-more" onClick={() => setCount(count + 4)}>
              تحميل المزيد
            </button>
          )}
        </>
      )}
    </>
  );
}
