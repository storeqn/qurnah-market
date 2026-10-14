import { Link } from "react-router-dom";
import { ArrowUpLeft, MapPin } from "lucide-react";
import type { Product, Store } from "../types";
import { stores } from "../data/catalog";
import { formatPrice } from "../lib/catalog";
export function ProductCard({ product: p }: { product: Product }) {
  const store = stores.find((s) => s.id === p.storeId)!;
  return (
    <article className="product-card">
      <Link className="product-image" to={`/products/${p.id}`}>
        <img
          src={p.images[0]}
          alt={p.name}
          width="400"
          height="360"
          loading="lazy"
          decoding="async"
        />
        {p.oldPrice && <span className="badge">عرض تجريبي</span>}
        {p.stock === 0 && <span className="sold-out">نفدت الكمية</span>}
      </Link>
      <div className="product-info">
        <Link className="store-label" to={`/stores/${store.id}`}>
          {store.name}
        </Link>
        <h3>
          <Link to={`/products/${p.id}`}>{p.name}</Link>
        </h3>
        <div className="price-row">
          <strong>{formatPrice(p.price)}</strong>
          {p.oldPrice && <del>{formatPrice(p.oldPrice)}</del>}
          <Link
            className="arrow-button"
            to={`/products/${p.id}`}
            aria-label={`تفاصيل ${p.name}`}
          >
            <ArrowUpLeft size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
export function StoreCard({ store: s }: { store: Store }) {
  return (
    <Link className="store-card" to={`/stores/${s.id}`}>
      <span
        className="store-logo"
        style={{ background: s.color }}
        aria-label={`شعار ${s.name}`}
      >
        {s.logo}
      </span>
      <div>
        <h3>{s.name}</h3>
        <p>{s.tagline}</p>
        <small>
          <MapPin size={12} />
          {s.address}
        </small>
      </div>
      <ArrowUpLeft size={19} />
    </Link>
  );
}
