import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Store, PackageCheck, Info } from "lucide-react";
import { products, stores } from "../data/catalog";
import { formatPrice } from "../lib/catalog";
import { ProductCard } from "../components/Cards";
import NotFound from "./NotFound";
export default function ProductPage() {
  const { id } = useParams();
  const p = products.find((p) => p.id === id);
  const [selected, setSelected] = useState(0);
  if (!p) return <NotFound />;
  const s = stores.find((s) => s.id === p.storeId)!;
  const image = p.images[selected] ?? p.images[0];
  return (
    <>
      <Link to="/browse" className="back">
        <ArrowRight size={16} />
        المنتجات
      </Link>
      <section className="product-detail">
        <div>
          <div className="gallery-main">
            <img src={image} alt={p.name} width="600" height="540" />
          </div>
          {p.images.length > 1 && (
            <div className="thumbnails">
              {p.images.map((src, i) => (
                <button
                  key={src}
                  className={image === src ? "active" : ""}
                  onClick={() => setSelected(i)}
                  aria-label={`صورة المنتج ${i + 1}`}
                  aria-pressed={image === src}
                >
                  <img src={src} alt="" width="80" height="72" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="detail-copy">
          <span className="eyebrow">منتج توضيحي • نسخة تجريبية</span>
          <h1>{p.name}</h1>
          <Link className="detail-store" to={`/stores/${s.id}`}>
            <Store size={19} />
            {s.name}
            <span>زيارة المتجر ←</span>
          </Link>
          <div className="detail-price">
            <strong>{formatPrice(p.price)}</strong>
            {p.oldPrice && <del>{formatPrice(p.oldPrice)}</del>}
          </div>
          <p className={p.stock ? "stock available" : "stock"}>
            <PackageCheck size={18} />
            {p.stock
              ? `متوفر • ${p.stock} قطع في المخزون التجريبي`
              : "نفدت الكمية"}
          </p>
          <p>{p.description}</p>
          <dl>
            {Object.entries(p.specs).map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="demo-notice">
            <Info size={20} />
            <span>
              التصفح متاح. السلة والطلبات والدفع ستُضاف في مرحلة لاحقة. لا توجد
              عملية شراء فعلية هنا.
            </span>
          </div>
        </div>
      </section>
      <div className="section-heading">
        <h2>من نفس المتجر</h2>
      </div>
      <div className="product-grid">
        {products
          .filter((x) => x.storeId === p.storeId && x.id !== p.id)
          .map((x) => (
            <ProductCard key={x.id} product={x} />
          ))}
      </div>
    </>
  );
}
