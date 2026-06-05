import type { Product, ProductImage, ProductVariant } from "../types/product";
import goldSwatchImage from "../assets/colors/gold.jpeg";
import rosePinkSwatchImage from "../assets/colors/rose-pink.jpeg";
import silverSwatchImage from "../assets/colors/silver.jpeg";

const euroFormatter = new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
});

const metalClasses: Record<string, string> = {
    "Yellow Gold": "bg-[#FFD700]",
    Gold: "bg-[#FFD700]",
    "Rose Gold": "bg-[#cd8b93]",
    "White Gold": "bg-[#d6d1d1]",
    Silver: "bg-[#d6d1d1]",
    "gift card": "bg-[#de5aa1]",
    "Gift Card": "bg-[#de5aa1]",
};

// Photographic swatch images shared with the product filters, keyed by the
// lowercased metal name. The single source of truth so every colour swatch
// across the app (filters + product detail) shows the same artwork.
const metalSwatchImageMap: Record<string, string> = {
    gold: goldSwatchImage.src,
    "yellow gold": goldSwatchImage.src,
    "rose gold": rosePinkSwatchImage.src,
    "rose pink": rosePinkSwatchImage.src,
    pink: rosePinkSwatchImage.src,
    silver: silverSwatchImage.src,
    "white gold": silverSwatchImage.src,
};

export function formatEuro(value: number): string {
    return euroFormatter.format(value);
}

export function getPrimaryVariant(
    product: Product,
): ProductVariant | undefined {
    return (
        product.variants.find((variant) => variant.available) ??
        product.variants[0]
    );
}

export function getProductImage(product: Product): string {
    return (
        getPrimaryVariant(product)?.thumbnail ||
        product.primaryImage ||
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80"
    );
}

export function getProductHoverImage(product: Product): string | null {
    const primaryVariant = getPrimaryVariant(product);

    if (!primaryVariant) {
        return null;
    }

    if (
        primaryVariant.previewImage &&
        primaryVariant.previewImage !== primaryVariant.thumbnail
    ) {
        return primaryVariant.previewImage;
    }

    const gallery = getVariantGallery(primaryVariant);
    const primaryImage = gallery[0]?.src || getProductImage(product);
    const secondImage = gallery.find(
        (image) => image.src && image.src !== primaryImage,
    )?.src;

    return secondImage ?? null;
}

export function getVariantImage(variant: ProductVariant): string {
    return (
        variant.images?.[0]?.src ||
        variant.thumbnail ||
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80"
    );
}

export function getVariantGallery(variant: ProductVariant): ProductImage[] {
    if (variant.images && variant.images.length > 0) {
        return variant.images;
    }

    return [
        {
            id: `${variant.id}-fallback`,
            src: getVariantImage(variant),
            position: 0,
        },
    ];
}

export function getMetalToneClass(metal: string): string {
    return metalClasses[metal] ?? "bg-[#d6d1d1]";
}

// Returns the swatch image for a metal/colour (matching the product filters),
// or undefined when there is no artwork for it (caller falls back to a tone).
export function getMetalSwatchImage(metal: string): string | undefined {
    if (!metal) {
        return undefined;
    }

    const label = (metal.split("/")[0] ?? "").trim().toLowerCase();
    return metalSwatchImageMap[label];
}

const metalAliasMap: Record<string, string[]> = {
    "yellow gold": ["yellow gold", "gold"],
    gold: ["gold", "yellow gold"],
    "white gold": ["white gold", "silver"],
    silver: ["silver", "white gold"],
    "rose gold": ["rose gold", "pink gold", "pink", "rose"],
    "pink gold": ["pink gold", "rose gold", "pink", "rose"],
    pink: ["pink", "rose gold", "pink gold", "rose"],
    rose: ["rose", "rose gold", "pink gold", "pink"],
};

function getMetalAliases(metal: string): string[] {
    const normalized = metal.trim().toLowerCase();
    return metalAliasMap[normalized] ?? [normalized];
}

export function findVariantByMetal(
    variants: ProductVariant[],
    metal: string,
): ProductVariant | undefined {
    if (!metal) {
        return undefined;
    }

    const aliases = getMetalAliases(metal);

    return variants.find((variant) => {
        const variantName = (variant.variantName ?? "").trim().toLowerCase();
        const variantTitle = (variant.title ?? "").toLowerCase();
        return aliases.some(
            (alias) =>
                variantName === alias ||
                variantTitle.split("/")[0]?.trim() === alias ||
                variantTitle.includes(alias),
        );
    });
}

export function findVariantByMetals(
    variants: ProductVariant[],
    metals: string[],
): ProductVariant | undefined {
    for (const metal of metals) {
        const matched = findVariantByMetal(variants, metal);
        if (matched) {
            return matched;
        }
    }
    return undefined;
}

export function getProductCaption(product: Product): string {
    const visibleTags = product.tags.filter(
        (tag) => tag !== product.category && tag !== "Trending Products",
    );

    if (visibleTags.length > 0) {
        return visibleTags.slice(0, 3).join(" | ");
    }

    return product.vendor;
}

export function formatReviewCount(value: number): string {
    return `${value} review${value === 1 ? "" : "s"}`;
}
