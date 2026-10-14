import { products, stores } from "../data/catalog";
export const formatPrice = (price: number) =>
  `${new Intl.NumberFormat("en-US").format(price)} د.ع`;
export function filterProducts(query = "", category = "all", storeId?: string) {
  const term = query.trim().normalize("NFKC").toLocaleLowerCase("ar");
  return products.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      (!storeId || p.storeId === storeId) &&
      (!term ||
        `${p.name} ${p.description} ${stores.find((s) => s.id === p.storeId)?.name ?? ""}`
          .normalize("NFKC")
          .toLocaleLowerCase("ar")
          .includes(term)),
  );
}
