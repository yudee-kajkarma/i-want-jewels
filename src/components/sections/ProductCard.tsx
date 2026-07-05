"use client";

import { Eye, Heart, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "@/lib/router";
import { useAuth } from "../../context/AuthContext";
import { useCurrency } from "../../context/CurrencyContext";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addToCart } from "../../store/cartSlice";
import { addToWishlist, removeWishlistItem } from "../../store/wishlistSlice";
import { setSingleCheckoutDraft } from "../../utils/checkoutStorage";
import type { Product } from "../../types/product";
import {
    findVariantByMetals,
    getMetalSwatchImage,
    getMetalToneClass,
    getVariantGallery,
    getVariantImage,
} from "../../utils/productUtils";
import { formatPrice, getPriceAmount } from "../../utils/price";
import { cn } from "@/lib/utils";

type ProductCardProps = {
    item: Product;
    layout?: "grid" | "list";
    className?: string;
    selectedMetals?: string[];
};

function buildListSummary(item: Product): string {
    const categoryLabel = item.category
        ? item.category.toLowerCase()
        : "jewellery";

    if (item.vendor) {
        return `Keep your look refined with this ${categoryLabel} design from ${item.vendor}, made for effortless everyday styling.`;
    }

    return `Keep your look refined with this ${categoryLabel} design, made for effortless everyday styling.`;
}

export default function ProductCard({
    item,
    layout = "grid",
    className,
    selectedMetals,
}: ProductCardProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAuth();
    const { currency } = useCurrency();
    const wishlistItem = useAppSelector((state) =>
        state.wishlist.wishlist?.items.find(
            (wishlistEntry) => wishlistEntry.productId === item.id,
        ),
    );
    const [selectedVariantId, setSelectedVariantId] = useState(() => {
        const metalMatchedVariant = selectedMetals
            ? findVariantByMetals(item.variants, selectedMetals)
            : undefined;
        return metalMatchedVariant?.id ?? item.variants[0]?.id ?? "";
    });
    const [isAdding, setIsAdding] = useState(false);
    const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);
    const [sizePickerOpen, setSizePickerOpen] = useState(false);
    const [pickerSizeIdx, setPickerSizeIdx] = useState<number | null>(null);
    const [isWishlistWaveActive, setIsWishlistWaveActive] = useState(false);
    const wishlistWaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );
    const selectedVariant =
        item.variants.find((variant) => variant.id === selectedVariantId) ??
        item.variants[0];
    const primaryImage = selectedVariant
        ? getVariantImage(selectedVariant)
        : "";
    const variantGallery = selectedVariant
        ? getVariantGallery(selectedVariant)
        : [];
    const hoverImage =
        (selectedVariant?.previewImage &&
        selectedVariant.previewImage !== primaryImage
            ? selectedVariant.previewImage
            : null) ??
        variantGallery.find((image) => image.src && image.src !== primaryImage)
            ?.src ??
        item.variants.find(
            (variant) =>
                variant.previewImage && variant.previewImage !== primaryImage,
        )?.previewImage ??
        item.variants
            .flatMap((variant) => getVariantGallery(variant))
            .find((image) => image.src && image.src !== primaryImage)?.src ??
        null;
    const basePrice = selectedVariant?.price ?? item.minPrice;
    const basePriceAmount = getPriceAmount(basePrice, currency);
    const comparePriceAmount = Math.round(basePriceAmount / 0.8);
    const hasDiscount = comparePriceAmount > basePriceAmount;
    const discountPercent = hasDiscount
        ? Math.round(
              ((comparePriceAmount - basePriceAmount) / comparePriceAmount) *
                  100,
          )
        : 0;
    const productDetailUrl = `/products/${item.slug || item.id}`;
    const isNewArrival =
        item.tags.some((tag) => tag.toLowerCase().includes("new")) ||
        hasDiscount;
    const listSummary = buildListSummary(item);

    useEffect(() => {
        const metalMatchedVariant = selectedMetals
            ? findVariantByMetals(item.variants, selectedMetals)
            : undefined;
        setSelectedVariantId(
            metalMatchedVariant?.id ?? item.variants[0]?.id ?? "",
        );
    }, [item.id, item.variants, selectedMetals]);

    useEffect(() => {
        return () => {
            if (wishlistWaveTimeoutRef.current) {
                clearTimeout(wishlistWaveTimeoutRef.current);
            }
        };
    }, []);

    async function handleWishlistClick(
        event: React.MouseEvent<HTMLButtonElement>,
    ) {
        event.preventDefault();
        event.stopPropagation();

        if (!isAuthenticated) {
            navigate("/login", { state: { from: location.pathname } });
            return;
        }

        setIsUpdatingWishlist(true);

        try {
            if (wishlistItem) {
                await dispatch(removeWishlistItem(wishlistItem.id)).unwrap();
                return;
            }

            await dispatch(addToWishlist(item.id)).unwrap();
            setIsWishlistWaveActive(true);

            if (wishlistWaveTimeoutRef.current) {
                clearTimeout(wishlistWaveTimeoutRef.current);
            }

            wishlistWaveTimeoutRef.current = setTimeout(() => {
                setIsWishlistWaveActive(false);
                wishlistWaveTimeoutRef.current = null;
            }, 520);
        } finally {
            setIsUpdatingWishlist(false);
        }
    }

    async function handleAddToCart(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        event.stopPropagation();

        const variant = selectedVariant ?? item.variants[0];

        if (!variant) {
            return;
        }

        if (!isAuthenticated) {
            navigate("/login", { state: { from: location.pathname } });
            return;
        }

        setIsAdding(true);

        try {
            await dispatch(
                addToCart({
                    productId: item.id,
                    quantity: 1,
                    variantId: variant.id,
                }),
            ).unwrap();
        } finally {
            setIsAdding(false);
        }
    }

    function variantHasNewShapeSizes(v: typeof selectedVariant): boolean {
        return !!(
            v?.sizes &&
            v.sizes.length > 0 &&
            v.sizes.every(
                (s) =>
                    typeof s?.size === "number" && typeof s?.stock === "number",
            )
        );
    }

    function commitBuyNow(
        variant: NonNullable<typeof selectedVariant>,
        chosenSize?: number,
    ) {
        // Prefer per-size price when a specific size was picked; else fall back
        // to the variant's base price. Backend re-verifies on order creation.
        const sizeEntry =
            chosenSize !== undefined && Array.isArray(variant.sizes)
                ? variant.sizes.find((s) => s.size === chosenSize)
                : undefined;
        const resolvedPrice = sizeEntry?.price ?? variant.price;
        const draft = {
            item: {
                id: `${item.id}-${variant.id}${chosenSize !== undefined ? `-${chosenSize}` : ""}`,
                productId: item.id,
                variantId: variant.id,
                title: item.title,
                variantTitle: variant.title,
                thumbnail: getVariantImage(variant),
                price: resolvedPrice,
                quantity: 1,
                ...(chosenSize !== undefined ? { size: chosenSize } : {}),
                ...(variant.sizeMeasurement
                    ? { sizeMeasurement: variant.sizeMeasurement }
                    : {}),
            },
            returnPath: location.pathname,
        };
        setSingleCheckoutDraft(draft);
        navigate("/checkout?source=single", {
            state: { source: "single", draft },
        });
    }

    function handleBuyNow(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        event.stopPropagation();

        const variant = selectedVariant ?? item.variants[0];
        if (!variant) return;

        if (!isAuthenticated) {
            navigate("/login", { state: { from: location.pathname } });
            return;
        }

        if (variantHasNewShapeSizes(variant)) {
            const firstInStock = variant.sizes!.findIndex((s) => s.stock > 0);
            setPickerSizeIdx(firstInStock >= 0 ? firstInStock : 0);
            setSizePickerOpen(true);
            return;
        }

        commitBuyNow(variant);
    }

    function handleConfirmPickerBuyNow() {
        const variant = selectedVariant ?? item.variants[0];
        if (!variant || pickerSizeIdx === null) return;
        const sizeEntry = variant.sizes?.[pickerSizeIdx];
        if (!sizeEntry || sizeEntry.stock <= 0) return;
        setSizePickerOpen(false);
        commitBuyNow(variant, sizeEntry.size);
    }

    async function handleDrawerAddToCart() {
        const variant = selectedVariant ?? item.variants[0];
        if (!variant || pickerSizeIdx === null) return;
        const sizeEntry = variant.sizes?.[pickerSizeIdx];
        if (!sizeEntry || sizeEntry.stock <= 0) return;

        setIsAdding(true);
        try {
            await dispatch(
                addToCart({
                    productId: item.id,
                    quantity: 1,
                    variantId: variant.id,
                    size: sizeEntry.size,
                }),
            ).unwrap();
        } finally {
            setIsAdding(false);
        }
    }

    const sizePickerDrawer =
        sizePickerOpen && selectedVariant
            ? createPortal(
                  <div
                      className="fixed inset-0 z-[60] flex justify-end bg-black/40"
                      onClick={(e) => {
                          if (e.target === e.currentTarget)
                              setSizePickerOpen(false);
                      }}
                  >
                      <div
                          className="flex h-full w-full max-w-sm flex-col bg-white p-6 shadow-2xl"
                          onClick={(e) => e.stopPropagation()}
                      >
                          <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                                      Choose a size
                                  </p>
                                  <h3 className="mt-1 text-lg font-semibold text-[#17110d]">
                                      {item.title}
                                  </h3>
                                  <p className="mt-1 text-sm text-zinc-500">
                                      {selectedVariant.title}
                                  </p>
                                  <p className="mt-2 text-xl font-semibold text-[#17110d]">
                                      {formatPrice(basePrice, currency)}
                                  </p>
                              </div>
                              <button
                                  type="button"
                                  onClick={() => setSizePickerOpen(false)}
                                  className="rounded-full px-3 py-1 text-sm text-zinc-500 hover:bg-zinc-100"
                              >
                                  ✕
                              </button>
                          </div>
                          <div className="mt-4 overflow-hidden bg-[linear-gradient(180deg,#fcfaf7_0%,#f6f0ea_100%)] p-4">
                              <img
                                  src={primaryImage}
                                  alt={item.title}
                                  className="mx-auto h-40 w-auto object-contain"
                              />
                          </div>
                          {item.vendor ? (
                              <p className="mt-3 text-sm text-zinc-600">
                                  <span className="font-semibold">Vendor:</span>{" "}
                                  {item.vendor}
                              </p>
                          ) : null}
                          {item.category ? (
                              <p className="mt-2 text-sm text-zinc-600">
                                  <span className="font-semibold">
                                      Category:
                                  </span>{" "}
                                  {item.category}
                              </p>
                          ) : null}
                          <p className="mt-5 text-[12px] font-medium uppercase tracking-[0.18em] text-zinc-900">
                              Size
                              {selectedVariant.sizeMeasurement
                                  ? ` (${selectedVariant.sizeMeasurement})`
                                  : ""}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                              {(selectedVariant.sizes ?? []).map((s, idx) => {
                                  const isSel = pickerSizeIdx === idx;
                                  const out = s.stock <= 0;
                                  return (
                                      <button
                                          key={`${s.size}-${idx}`}
                                          type="button"
                                          disabled={out}
                                          onClick={() => setPickerSizeIdx(idx)}
                                          title={
                                              out
                                                  ? "Out of stock"
                                                  : `${s.stock} in stock`
                                          }
                                          className={`flex h-11 min-w-[44px] items-center justify-center border px-3 text-sm font-medium transition ${
                                              out
                                                  ? "cursor-not-allowed border-zinc-200 text-zinc-300 line-through"
                                                  : isSel
                                                    ? "border-zinc-900 bg-zinc-900 text-white"
                                                    : "border-zinc-300 text-zinc-900 hover:border-zinc-900"
                                          }`}
                                      >
                                          {s.size}
                                      </button>
                                  );
                              })}
                          </div>
                          <div className="mt-auto flex flex-col gap-2 pt-6">
                              <button
                                  type="button"
                                  onClick={handleConfirmPickerBuyNow}
                                  disabled={
                                      pickerSizeIdx === null ||
                                      (selectedVariant.sizes?.[pickerSizeIdx]
                                          ?.stock ?? 0) <= 0
                                  }
                                  className="h-12 bg-[#17110d] text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#2a201a] disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                  Buy It Now
                              </button>
                              <button
                                  type="button"
                                  onClick={handleDrawerAddToCart}
                                  disabled={
                                      pickerSizeIdx === null ||
                                      (selectedVariant.sizes?.[pickerSizeIdx]
                                          ?.stock ?? 0) <= 0 ||
                                      isAdding
                                  }
                                  className="h-12 border border-[#17110d] bg-white text-sm font-bold uppercase tracking-[0.08em] text-[#17110d] transition hover:bg-[#f5f5f5] disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                  {isAdding ? "ADDING..." : "Add to Cart"}
                              </button>
                              <button
                                  type="button"
                                  onClick={() => setSizePickerOpen(false)}
                                  className="h-12 border border-zinc-300 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
                              >
                                  Cancel
                              </button>
                          </div>
                      </div>
                  </div>,
                  document.body,
              )
            : null;

    if (layout === "list") {
        return (
            <article className="group grid items-start gap-6 border-b border-[#efe7de] py-5 lg:grid-cols-[300px_minmax(0,1fr)_180px] lg:gap-8">
                <Link
                    to={productDetailUrl}
                    className="relative block overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#fcfaf7_0%,#f6f0ea_100%)]"
                >
                    {/* {isNewArrival ? (
                        <span className="absolute left-4 top-4 z-20 rounded-full bg-[#f23ea9] px-3 py-1 text-[10px] font-bold leading-none text-white shadow-[0_10px_20px_rgba(242,62,169,0.22)]">
                            NEW
                        </span>
                    ) : null} */}

                    <div className="relative h-[20rem] w-full overflow-hidden">
                        <img
                            src={primaryImage}
                            alt={item.title}
                            className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${
                                hoverImage
                                    ? "opacity-100 group-hover:opacity-0"
                                    : "opacity-100 group-hover:scale-[1.03]"
                            }`}
                        />
                        {hoverImage ? (
                            <img
                                src={hoverImage}
                                alt={`${item.title} alternate view`}
                                className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                            />
                        ) : null}
                    </div>
                </Link>

                <div className="min-w-0">
                    <Link to={productDetailUrl} className="block">
                        <h3 className="text-[0.9rem] font-semibold tracking-[-0.04em] text-[#201915] transition hover:text-[#f23ea9]">
                            {item.title}
                        </h3>
                    </Link>

                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[#26221f]">
                        <p className="text-[1.9rem] font-semibold leading-none tracking-[-0.04em]">
                            {formatPrice(basePrice, currency)}
                        </p>
                        {/* {hasDiscount ? (
                            <p className="text-lg text-zinc-400 line-through">
                                {formatPrice(comparePriceAmount, currency)}
                            </p>
                        ) : null}
                        {hasDiscount ? (
                            <span className="inline-flex rounded-full bg-[#f23ea9] px-3 py-1 text-[12px] font-bold leading-none text-white">
                                -{discountPercent}%
                            </span>
                        ) : null} */}
                    </div>

                    <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-500">
                        {listSummary}
                    </p>

                    <div className="mt-5 flex items-center gap-2.5">
                        {item.variants.map((variant) => {
                            const metalLabel =
                                variant.title.split("/")[0]?.trim() ||
                                variant.title;
                            const isActive = variant.id === selectedVariant?.id;
                            const swatchImageSrc =
                                getMetalSwatchImage(metalLabel);

                            return (
                                <button
                                    key={variant.id}
                                    type="button"
                                    title={variant.title}
                                    onClick={() =>
                                        setSelectedVariantId(variant.id)
                                    }
                                    className={`h-5 w-5 overflow-hidden rounded-full border-2 border-white shadow-sm transition ${swatchImageSrc ? "" : getMetalToneClass(metalLabel)} ${
                                        isActive
                                            ? "ring-1 ring-[#3b342f] ring-offset-2"
                                            : "ring-0"
                                    }`}
                                >
                                    {swatchImageSrc ? (
                                        <img
                                            src={swatchImageSrc}
                                            alt=""
                                            aria-hidden="true"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : null}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col items-start gap-5 lg:items-end">
                    <button
                        type="button"
                        onClick={handleBuyNow}
                        className="inline-flex h-12 min-w-[152px] items-center justify-center rounded-full border border-[#2c2622] px-6 text-sm font-semibold text-[#161311] transition hover:bg-[#161311] hover:text-white"
                    >
                        QUICK SHOP
                    </button>

                    <div className="flex items-center gap-5 text-[#2b2724]">
                        <button
                            type="button"
                            onClick={(event) => void handleWishlistClick(event)}
                            disabled={isUpdatingWishlist}
                            aria-label={
                                wishlistItem
                                    ? "Remove from wishlist"
                                    : "Add to wishlist"
                            }
                            className={`transition hover:text-[#f23ea9] ${wishlistItem ? "text-[#f23ea9]" : ""} disabled:opacity-60`}
                        >
                            <Heart
                                className={`h-5 w-5 ${wishlistItem ? "fill-current" : ""}`}
                                aria-hidden="true"
                            />
                        </button>

                        <button
                            type="button"
                            onClick={(event) => void handleAddToCart(event)}
                            disabled={isAdding}
                            aria-label="Add to cart"
                            className="transition hover:text-[#f23ea9] disabled:opacity-60"
                        >
                            <ShoppingBag
                                className="h-5 w-5"
                                strokeWidth={1.8}
                                aria-hidden="true"
                            />
                        </button>

                        <Link
                            to={productDetailUrl}
                            className="transition hover:text-[#f23ea9]"
                            aria-label="Quick view"
                        >
                            <Eye
                                className="h-5 w-5"
                                strokeWidth={1.8}
                                aria-hidden="true"
                            />
                        </Link>
                    </div>
                </div>
                {sizePickerDrawer}
            </article>
        );
    }

    return (
        <article className="group flex h-full flex-col bg-transparent transition-transform duration-300 hover:-translate-y-1 group">
            <div className="relative overflow-hidden  bg-[linear-gradient(180deg,#fcfaf7_0%,#f6f0ea_100%)] pt-0">
                {/* {isNewArrival ? (
                    <span className="absolute left-4 top-4 z-20   px-3 py-1 text-[10px] font-bold leading-none group-hover:text-white text-black/70  ">
                        NEW
                    </span>
                ) : null} */}

                <div className="absolute right-4 top-4 z-20 flex translate-x-4 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <button
                        type="button"
                        onClick={(event) => void handleWishlistClick(event)}
                        disabled={isUpdatingWishlist}
                        aria-label={
                            wishlistItem
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                        }
                        className={`flex h-10 w-10 items-center justify-center rounded-full  text-[#ffffff]  transition hover:text-[#2d2926] ${
                            wishlistItem ? "text-[#f23ea9]" : ""
                        } disabled:opacity-60`}
                    >
                        <span
                            className={
                                isWishlistWaveActive ? "wishlist-wave" : ""
                            }
                        >
                            <Heart
                                className={`h-4 w-4 ${wishlistItem ? "fill-current" : ""}`}
                                aria-hidden="true"
                            />
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={(event) => void handleBuyNow(event)}
                        disabled={isAdding}
                        aria-label="Add to cart"
                        className="flex h-10 w-10 items-center justify-center rounded-full  text-[#fff]  transition hover:text-[#2d2926] disabled:opacity-60"
                    >
                        <ShoppingBag
                            className="h-4 w-4"
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />
                    </button>

                    {/* <Link
                        to={productDetailUrl}
                        className="flex h-10 w-10 items-center justify-center rounded-full  text-[#2d2926] shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition hover:text-[#f23ea9]"
                        aria-label="Quick view"
                    >
                        <Eye
                            className="h-4 w-4"
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />
                    </Link> */}
                </div>

                <Link to={productDetailUrl} className="block">
                    <div
                        className={cn(
                            "relative h-[20rem] w-full overflow-hidden",
                            className,
                        )}
                    >
                        <img
                            src={primaryImage}
                            alt={item.title}
                            className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${
                                hoverImage
                                    ? "opacity-100 group-hover:opacity-0"
                                    : "opacity-100 group-hover:scale-[1.03]"
                            }`}
                        />
                        {hoverImage ? (
                            <img
                                src={hoverImage}
                                alt={`${item.title} alternate view`}
                                className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                            />
                        ) : null}
                    </div>
                </Link>

                <div className="pointer-events-none absolute inset-x-4 bottom-4 z-20 translate-y-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="md:grid grid-cols-2 gap-2 pointer-events-auto hidden">
                        <button
                            type="button"
                            onClick={(event) => {
                                if (
                                    variantHasNewShapeSizes(
                                        selectedVariant ?? item.variants[0],
                                    )
                                ) {
                                    void handleBuyNow(event);
                                } else {
                                    void handleAddToCart(event);
                                }
                            }}
                            disabled={isAdding}
                            className="inline-flex h-8 items-center justify-center  bg-white px-1 text-[12px] font-semibold text-[#22201d] shadow-[0_10px_30px_rgba(0,0,0,0.14)] transition hover:bg-[#f4f1ee] disabled:opacity-60"
                        >
                            {isAdding ? "ADDING..." : "ADD CART"}
                        </button>
                        <button
                            type="button"
                            onClick={handleBuyNow}
                            className="inline-flex h-8 items-center justify-center  bg-[#151515] px-1 text-[12px] font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:bg-black"
                        >
                            BUY NOW
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 px-2 pb-2 pt-4">
                <Link to={productDetailUrl} className="block">
                    <h3 className="text-[1rem] font-medium leading-none tracking-[-0.03em] text-[#26221f] transition hover:text-[#f23ea9]">
                        {/* {item.title.split(" ")[0]?.trim() || item.title}
                        {item.productType !== "GIFT_CARD" &&
                        item.category &&
                        item.category.toLowerCase() !== "jewellery"
                            ? ` ${item.category}`
                            : ""} */}
                        {item.title}
                    </h3>
                </Link>

                <div className="flex items-center gap-2.5 transition-all duration-300 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    {item.variants.map((variant) => {
                        const metalLabel =
                            variant.title.split("/")[0]?.trim() ||
                            variant.title;
                        const isActive = variant.id === selectedVariant?.id;
                        const swatchImageSrc = getMetalSwatchImage(metalLabel);

                        return (
                            <button
                                key={variant.id}
                                type="button"
                                title={variant.title}
                                onClick={() => setSelectedVariantId(variant.id)}
                                className={`h-5 w-5 overflow-hidden rounded-full border-2 border-white shadow-sm transition ${swatchImageSrc ? "" : getMetalToneClass(metalLabel)} ${
                                    isActive
                                        ? "ring-1 ring-[#3b342f] ring-offset-2"
                                        : "ring-0"
                                }`}
                            >
                                {swatchImageSrc ? (
                                    <img
                                        src={swatchImageSrc}
                                        alt=""
                                        aria-hidden="true"
                                        className="h-full w-full object-cover"
                                    />
                                ) : null}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-[#26221f]">
                    <p className="text-sm md:text-[1.2rem] font-semibold leading-none tracking-[-0.04em]">
                        {formatPrice(basePrice, currency)}
                    </p>
                    {/* {hasDiscount ? <p className="text-sm text-zinc-400 line-through">{formatPrice(comparePriceAmount, currency)}</p> : null}
          {hasDiscount ? (
            <span className="inline-flex rounded-full bg-[#f23ea9] px-3 py-1 text-[12px] font-bold leading-none text-white">
              -{discountPercent}%
            </span>
          ) : null} */}
                </div>
            </div>
            {sizePickerDrawer}
        </article>
    );
}
