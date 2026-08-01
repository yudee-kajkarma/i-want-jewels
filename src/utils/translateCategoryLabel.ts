import type { TFunction } from "i18next";

const CATEGORY_LABEL_KEYS: Record<string, string> = {
  all: "home.all",
  earring: "productDetail.earrings",
  earrings: "productDetail.earrings",
  necklace: "productDetail.necklaces",
  necklaces: "productDetail.necklaces",
  bracelet: "productDetail.bracelet",
  bracelets: "productDetail.bracelet",
  ring: "productDetail.rings",
  rings: "productDetail.rings",
  collection: "productDetail.collection",
};

function normalizeCategoryValue(value: string): string {
  return value.trim().toLowerCase().replace(/ies$/, "y").replace(/s$/, "");
}

/** Display label for a product category while keeping the API value unchanged. */
export function translateCategoryLabel(category: string, t: TFunction): string {
  if (category === "All") {
    return t("home.all");
  }

  const normalized = normalizeCategoryValue(category);
  const key =
    CATEGORY_LABEL_KEYS[normalized] ??
    CATEGORY_LABEL_KEYS[category.trim().toLowerCase()];

  return key ? t(key) : category;
}
