import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Smartphone,
  Sparkles,
  Shirt,
  House,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { categories, products, stores } from "../data/catalog";
import { ProductCard, StoreCard } from "../components/Cards";
const icons = [Smartphone, Sparkles, Shirt, House];
const slides = [
  {
    eyebrow: "أهلاً بيك بسوق القرنة",
    title: "كل متاجر مدينتك،",
    accent: "بمكان واحد.",
    text: "هواتف، عناية، أزياء وأجهزة… اكتشف اللي تحتاجه من أهل مدينتك.",
    image: "/images/hero.webp",
    link: "/browse",
    button: "ابدأ التسوّق",
  },
  {
    eyebrow: "تقنية تناسب يومك",
    title: "اكتشف الجديد،",
    accent: "واختار على راحتك.",
    text: "تصفّح الهواتف والإكسسوارات، وشوف تفاصيل كل منتج ومتجره.",
    image: "/images/phone.webp",
    link: "/browse?category=phones",
    button: "اكتشف الهواتف",
  },
  {
    eyebrow: "تفاصيل صغيرة، فرق كبير",
    title: "عناية وإطلالة،",
    accent: "على ذوقك.",
    text: "اكتشف منتجات العناية والعطور من متاجر السوق التجريبية.",
    image: "/images/perfume.webp",
    link: "/browse?category=beauty",
    button: "تصفّح الكوزمتك",
  },
];
export default function Home() {
  const [slide, setSlide] = useState(0);
  const s = slides[slide];
  return (
    <>
      <section
        className="hero"
        aria-roledescription="سلايدر إعلاني"
        aria-label="عروض السوق"
      >
        <div className="hero-copy">
          <span className="eyebrow">{s.eyebrow}</span>
          <h1>
            {s.title}
            <br />
            <em>{s.accent}</em>
          </h1>
          <p>{s.text}</p>
          <Link className="primary-button" to={s.link}>
            {s.button}
            <ArrowLeft size={18} />
          </Link>
          <small>اكتشاف محلي • تجربة تسوّق أبسط</small>
        </div>
        <img
          className="hero-art"
          src={s.image}
          alt="رسم توضيحي لمنتجات السوق"
          width="720"
          height="480"
          fetchPriority="high"
        />
        <div className="slider-controls">
          <button
            aria-label="الإعلان السابق"
            onClick={() => setSlide((slide + 2) % 3)}
          >
            <ChevronRight size={17} />
          </button>
          {slides.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === slide ? "selected" : ""}`}
              aria-label={`الإعلان ${i + 1}`}
              aria-pressed={i === slide}
              onClick={() => setSlide(i)}
            />
          ))}
          <button
            aria-label="الإعلان التالي"
            onClick={() => setSlide((slide + 1) % 3)}
          >
            <ChevronLeft size={17} />
          </button>
        </div>
      </section>
      <section>
        <div className="section-heading">
          <div>
            <span className="eyebrow">اختار اللي يناسبك</span>
            <h2>تسوّق حسب القسم</h2>
          </div>
          <Link to="/browse">
            عرض الكل <ArrowLeft size={16} />
          </Link>
        </div>
        <div className="category-grid">
          {categories.map((c, i) => {
            const Icon = icons[i];
            return (
              <Link
                className={`category category-${c.id}`}
                key={c.id}
                to={`/browse?category=${c.id}`}
              >
                <span>
                  <Icon size={28} />
                </span>
                <div>
                  <h3>{c.name}</h3>
                  <p>{c.subtitle}</p>
                </div>
                <ArrowLeft size={17} />
              </Link>
            );
          })}
        </div>
      </section>
      <section>
        <div className="section-heading">
          <div>
            <span className="eyebrow">من أهل مدينتك</span>
            <h2>متاجر تستحق زيارتك</h2>
          </div>
          <Link to="/browse?view=stores">
            كل المتاجر <ArrowLeft size={16} />
          </Link>
        </div>
        <div className="store-grid">
          {stores.map((s) => (
            <StoreCard key={s.id} store={s} />
          ))}
        </div>
      </section>
      <section>
        <div className="section-heading">
          <div>
            <span className="eyebrow">جديد السوق</span>
            <h2>أحدث المنتجات</h2>
          </div>
          <Link to="/browse">
            كل المنتجات <ArrowLeft size={16} />
          </Link>
        </div>
        <div className="product-grid">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <section className="join-banner">
        <div>
          <span className="eyebrow">عندك محل بالقرنة؟</span>
          <h2>خلّي متجرك أقرب لزبائنك.</h2>
          <p>تعرّف على لوحة التاجر في نسختنا التجريبية.</p>
        </div>
        <Link className="primary-button" to="/merchant">
          استكشف لوحة التاجر <ArrowLeft size={18} />
        </Link>
      </section>
    </>
  );
}
