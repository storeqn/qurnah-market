import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Browse from "./Browse";
import StorePage from "./StorePage";
import ProductPage from "./ProductPage";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";
function render(path: string) {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/stores/:id" element={<StorePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/merchant" element={<Dashboard role="merchant" />} />
        <Route path="/admin" element={<Dashboard role="admin" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MemoryRouter>,
  );
}
describe("page rendering", () => {
  it("renders all four categories and store ownership on home", () => {
    const html = render("/");
    for (const text of [
      "الهواتف",
      "الكوزمتك",
      "الملابس",
      "الأجهزة المنزلية",
      "/stores/firdaws",
      "/products/phone",
    ])
      expect(html).toContain(text);
  });
  it("isolates store products", () => {
    const html = render("/stores/ameer");
    expect(html).toContain("عطر أمبر");
    expect(html).not.toContain("هاتف ذكي برو");
  });
  it("renders stock and gallery for product detail", () => {
    const html = render("/products/phone");
    expect(html).toContain("8 قطع");
    expect(html).toContain("/stores/firdaws");
    expect(html).toContain("phone-back.webp");
  });
  it("shows out-of-stock without purchase action", () => {
    const html = render("/products/cream");
    expect(html).toContain("نفدت الكمية");
    expect(html).not.toContain("إضافة للسلة");
  });
  it("searches with combined query filters", () => {
    const html = render("/browse?q=الفردوس&category=beauty");
    expect(html).toContain("ما لقينا منتجات مطابقة");
  });
  it("renders safe missing-resource pages", () => {
    for (const path of ["/products/missing", "/stores/missing", "/missing"])
      expect(render(path)).toContain("هذه الصفحة غير موجودة");
  });
  it("labels dashboards as demos without authentication", () => {
    for (const path of ["/merchant", "/admin"])
      expect(render(path)).toContain("لا توجد مصادقة");
  });
  it("initially limits product loading", () => {
    const html = render("/browse");
    expect((html.match(/class="product-card"/g) || []).length).toBe(4);
    expect(html).toContain("تحميل المزيد");
  });
});
