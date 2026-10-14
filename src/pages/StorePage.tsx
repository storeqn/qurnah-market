import { useParams, Link } from "react-router-dom";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { stores } from "../data/catalog";
import { filterProducts } from "../lib/catalog";
import { ProductCard } from "../components/Cards";
import NotFound from "./NotFound";
export default function StorePage() {
  const { id } = useParams();
  const s = stores.find((s) => s.id === id);
  if (!s) return <NotFound />;
  const items = filterProducts("", "all", s.id);
  return (
    <>
      <Link className="back" to="/browse?view=stores">
        <ArrowRight size={16} />
        كل المتاجر
      </Link>
      <section className="store-profile">
        <span
          className="store-logo large"
          style={{ background: s.color }}
          aria-label={`شعار ${s.name}`}
        >
          {s.logo}
        </span>
        <div>
          <span className="eyebrow">متجر تجريبي</span>
          <h1>{s.name}</h1>
          <p>{s.tagline}</p>
          <div className="store-meta">
            <span>
              <MapPin size={16} />
              {s.address}
            </span>
            <span>
              <Clock size={16} />
              {s.hours}
            </span>
          </div>
        </div>
      </section>
      <div className="section-heading">
        <h2>منتجات المتجر</h2>
        <span>{items.length} منتجات</span>
      </div>
      <div className="product-grid">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
