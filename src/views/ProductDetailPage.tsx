"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Heart,
  PencilLine,
  Play,
  Trash2,
  X,
} from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "@/lib/router";
import { useTranslation } from "react-i18next";
import { formatDate } from "../utils/formatDate";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import ProductCard from "../components/sections/ProductCard";
import SeoSectionsAccordion from "../components/sections/SeoSectionsAccordion";
import ringSizeGuideImage from "../assets/image/Ring-Size-Guide.jpeg";
import earringsCategoryImage from "../assets/categories/Earrings.jpg";
import necklaceCategoryImage from "../assets/categories/Necklace.jpg";
import braceletCategoryImage from "../assets/categories/Bracelet.png";
import ringsCategoryImage from "../assets/categories/Rings.jpg";
import collectionsCategoryImage from "../assets/about-us/collections.jpg.jpeg";
import { useAuth } from "../context/AuthContext";
import { useCurrency } from "../context/CurrencyContext";
import {
  createProductReview,
  deleteProductReview,
  getProductBySlug,
  getProductReviews,
  getProducts,
  updateProductReview,
} from "../services/productService";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToCart } from "../store/cartSlice";
import { addToWishlist, removeWishlistItem } from "../store/wishlistSlice";
import type {
  Product,
  ProductDetail,
  ProductImage,
  ProductReview,
  ProductReviewsPagination,
  ProductReviewsResult,
  ProductVariant,
  ReviewPayload,
} from "../types/product";
import {
  formatReviewCount,
  getDetailPageGallery,
  getMetalSwatchImage,
  getMetalToneClass,
  getVariantImage,
} from "../utils/productUtils";
import { formatPrice } from "../utils/price";
import { setSingleCheckoutDraft } from "../utils/checkoutStorage";

const categoryCards: Array<{ label: string; image: string; href: string }> = [
  {
    label: "Earrings",
    image: earringsCategoryImage.src,
    href: "/products?category=Earrings",
  },
  {
    label: "Necklaces",
    image: necklaceCategoryImage.src,
    href: "/products?category=Necklace",
  },
  {
    label: "Bracelet",
    image: braceletCategoryImage.src,
    href: "/products?category=Bracelets",
  },
  {
    label: "Rings",
    image: ringsCategoryImage.src,
    href: "/products?category=Rings",
  },
  {
    label: "Collection",
    image: collectionsCategoryImage.src,
    href: "/products?collection=Concetta",
  },
];

function StarRating({ rating }: { rating: number }) {
  const filledStars = Math.round(rating);

  return (
    <div className="flex items-center gap-1 text-pink-500">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} aria-hidden="true" className="text-base leading-none">
          {index < filledStars ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

function PaymentIcon({
  type,
}: {
  type: "visa" | "mastercard" | "rupay" | "amex" | "upi" | "card";
}) {
  const { t } = useTranslation();

  if (type === "visa") {
    return (
      <svg
        viewBox="0 0 72 40"
        className="h-8 w-full"
        role="img"
        aria-label="Visa"
      >
        <rect
          x="1"
          y="1"
          width="70"
          height="38"
          fill="#ffffff"
          stroke="#d8d8d8"
        />
        <text
          x="36"
          y="26"
          textAnchor="middle"
          fill="#1a4ec7"
          fontSize="16"
          fontWeight="700"
          fontStyle="italic"
        >
          VISA
        </text>
      </svg>
    );
  }

  if (type === "mastercard") {
    return (
      <svg
        viewBox="0 0 72 40"
        className="h-8 w-full"
        role="img"
        aria-label="MasterCard"
      >
        <rect
          x="1"
          y="1"
          width="70"
          height="38"
          fill="#ffffff"
          stroke="#d8d8d8"
        />
        <circle cx="30" cy="20" r="10" fill="#eb001b" />
        <circle cx="42" cy="20" r="10" fill="#f79e1b" fillOpacity="0.95" />
      </svg>
    );
  }

  if (type === "rupay") {
    return (
      <svg
        viewBox="0 0 72 40"
        className="h-8 w-full"
        role="img"
        aria-label="RuPay"
      >
        <rect
          x="1"
          y="1"
          width="70"
          height="38"
          fill="#ffffff"
          stroke="#d8d8d8"
        />
        <polygon points="12,28 42,28 50,22 20,22" fill="#128b3d" />
        <polygon points="18,22 48,22 56,16 26,16" fill="#f08c23" />
        <text
          x="48"
          y="28"
          textAnchor="middle"
          fill="#1746a2"
          fontSize="10"
          fontWeight="700"
        >
          RuPay
        </text>
      </svg>
    );
  }

  if (type === "amex") {
    return (
      <svg
        viewBox="0 0 72 40"
        className="h-8 w-full"
        role="img"
        aria-label="Amex"
      >
        <rect
          x="1"
          y="1"
          width="70"
          height="38"
          fill="#ffffff"
          stroke="#d8d8d8"
        />
        <rect x="10" y="9" width="52" height="22" fill="#1f7acb" />
        <text
          x="36"
          y="24"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="10"
          fontWeight="700"
        >
          AMEX
        </text>
      </svg>
    );
  }

  if (type === "upi") {
    return (
      <svg
        viewBox="0 0 72 40"
        className="h-8 w-full"
        role="img"
        aria-label="UPI"
      >
        <rect
          x="1"
          y="1"
          width="70"
          height="38"
          fill="#ffffff"
          stroke="#d8d8d8"
        />
        <text
          x="28"
          y="25"
          textAnchor="middle"
          fill="#222222"
          fontSize="14"
          fontWeight="700"
        >
          UPI
        </text>
        <polygon points="44,13 56,20 44,27" fill="#f08c23" />
        <polygon points="49,13 61,20 49,27" fill="#21a453" fillOpacity="0.95" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 72 40"
      className="h-8 w-full"
      role="img"
      aria-label={t("productDetail.paymentCard")}
    >
      <rect
        x="1"
        y="1"
        width="70"
        height="38"
        fill="#ffffff"
        stroke="#d8d8d8"
      />
      <rect x="1" y="11" width="70" height="8" fill="#2d2d2d" />
      <rect x="10" y="24" width="14" height="7" fill="#f0b45b" />
      <rect x="29" y="24" width="26" height="4" fill="#8b8b8b" />
    </svg>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-[1480px] px-6 py-10 lg:px-10">
      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6 lg:grid-cols-[160px_minmax(0,1fr)]">
          <div className="space-y-4">
            <div className="shimmer-surface h-28" />
            <div className="shimmer-surface h-28" />
          </div>
          <div className="shimmer-surface min-h-[520px]" />
        </div>
        <div className="space-y-5 border border-zinc-200 bg-white p-8">
          <div className="shimmer-surface h-8 w-1/2" />
          <div className="shimmer-surface h-5 w-1/3" />
          <div className="shimmer-surface h-10 w-32" />
          <div className="shimmer-surface h-5 w-40" />
          <div className="flex gap-2">
            <div className="shimmer-surface h-6 w-6 rounded-full" />
            <div className="shimmer-surface h-6 w-6 rounded-full" />
            <div className="shimmer-surface h-6 w-6 rounded-full" />
          </div>
          <div className="shimmer-surface h-32" />
          <div className="shimmer-surface h-12" />
          <div className="shimmer-surface h-12" />
        </div>
      </div>
    </div>
  );
}

function formatReviewDate(value: string, locale: string): string {
  return formatDate(value, locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function getReviewHeadline(comment: string, fallback: string): string {
  const trimmedComment = comment.trim();

  if (!trimmedComment) {
    return fallback;
  }

  return trimmedComment.length > 52
    ? `${trimmedComment.slice(0, 52)}...`
    : trimmedComment;
}

function getInitialVariantId(product: ProductDetail | null): string {
  return product?.variants[0]?.id ?? "";
}

function getInitialImageId(product: ProductDetail | null): string {
  const firstVariant = product?.variants[0];

  // Prefer the first video on the first variant — videos render before
  // images in the gallery and autoplay on page load.
  const firstVideoKey = firstVariant?.videos?.[0]?.key;
  if (firstVideoKey) return firstVideoKey;

  const firstImage = firstVariant
    ? getDetailPageGallery(firstVariant)[0]
    : undefined;

  return firstImage?.id ?? "";
}

const initialReviewForm: ReviewPayload = {
  rating: 5,
  comment: "",
};

const reviewRatingOptions = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5];

type ProductDetailPageProps = {
  initialProduct?: ProductDetail | null;
  initialReviewsData?: ProductReviewsResult | null;
};

export default function ProductDetailPage({
  initialProduct = null,
  initialReviewsData = null,
}: ProductDetailPageProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{
    slug?: string | string[];
    productId?: string | string[];
  }>();
  const slugParam = typeof params.slug === "string" ? params.slug : "";
  const legacyProductIdParam =
    typeof params.productId === "string" ? params.productId : "";
  const productIdentifier = slugParam || legacyProductIdParam;
  const { isAuthenticated, session } = useAuth();
  const { currency } = useCurrency();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<ProductDetail | null>(initialProduct);
  const resolvedProductId = product?.id ?? initialProduct?.id ?? "";
  const shouldSkipInitialFetchRef = useRef(
    Boolean(initialReviewsData) &&
      Boolean(initialProduct) &&
      (initialProduct?.slug === slugParam ||
        initialProduct?.id === productIdentifier),
  );
  const wishlistItem = useAppSelector((state) =>
    state.wishlist.wishlist?.items.find(
      (item) => item.productId === resolvedProductId,
    ),
  );
  const [reviews, setReviews] = useState<ProductReview[]>(
    initialReviewsData?.reviews ?? [],
  );
  const [reviewsPagination, setReviewsPagination] =
    useState<ProductReviewsPagination | null>(
      initialReviewsData?.pagination ?? null,
    );
  const [isLoading, setIsLoading] = useState(!initialProduct);
  const [error, setError] = useState("");
  const [selectedVariantId, setSelectedVariantId] = useState(
    getInitialVariantId(initialProduct),
  );
  const [selectedImageId, setSelectedImageId] = useState(
    getInitialImageId(initialProduct),
  );
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number | null>(
    null,
  );
  const [quantity, setQuantity] = useState(1);
  const [giftRecipientEmail, setGiftRecipientEmail] = useState("");
  const [giftRecipientName, setGiftRecipientName] = useState("");
  const [giftSenderName, setGiftSenderName] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [cartFeedback, setCartFeedback] = useState("");
  const [wishlistFeedback, setWishlistFeedback] = useState("");
  const [reviewFeedback, setReviewFeedback] = useState("");
  const [reviewForm, setReviewForm] =
    useState<ReviewPayload>(initialReviewForm);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [openFaqIndexes, setOpenFaqIndexes] = useState<number[]>([0]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [collectionProducts, setCollectionProducts] = useState<Product[]>([]);

  async function loadReviews(targetProductId: string) {
    const reviewsResponse = await getProductReviews(targetProductId);

    setReviews(reviewsResponse.reviews);
    setReviewsPagination(reviewsResponse.pagination);
  }

  useEffect(() => {
    let isMounted = true;

    if (
      shouldSkipInitialFetchRef.current &&
      (initialProduct?.slug === slugParam ||
        initialProduct?.id === productIdentifier)
    ) {
      shouldSkipInitialFetchRef.current = false;
      return () => {
        isMounted = false;
      };
    }

    async function loadProduct() {
      setIsLoading(true);

      try {
        const productResponse = await getProductBySlug(
          productIdentifier,
          i18n.language,
        );
        const reviewsResponse = await getProductReviews(productResponse.id);

        if (!isMounted) {
          return;
        }

        const firstVariant = productResponse.variants[0];
        const firstImage = firstVariant
          ? getDetailPageGallery(firstVariant)[0]
          : undefined;
        const firstVideoKey = firstVariant?.videos?.[0]?.key;

        setProduct(productResponse);
        setReviews(reviewsResponse.reviews);
        setReviewsPagination(reviewsResponse.pagination);
        setSelectedVariantId(firstVariant?.id ?? "");
        setSelectedImageId(firstVideoKey ?? firstImage?.id ?? "");
        setQuantity(1);
        setReviewForm(initialReviewForm);
        setReviewFeedback("");
        setIsReviewFormOpen(false);
        setError("");
      } catch {
        if (!isMounted) {
          return;
        }

        setProduct(null);
        setReviews([]);
        setReviewsPagination(null);
        setError(t("productDetail.loadError"));
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (productIdentifier) {
      void loadProduct();
    }

    return () => {
      isMounted = false;
    };
    // `i18n.language` is a dependency: switching language must refetch the
    // product so its copy matches the rest of the page.
  }, [initialProduct?.id, initialProduct?.slug, productIdentifier, slugParam, i18n.language]);

  useEffect(() => {
    if (!isSizeGuideOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSizeGuideOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isSizeGuideOpen]);

  useEffect(() => {
    if (!product) {
      return;
    }

    setOpenFaqIndexes([0].filter((index) => index < product.faqs.length));
  }, [product]);

  useEffect(() => {
    const collectionName = product?.collectionName?.trim();
    if (!product || !collectionName) {
      setCollectionProducts([]);
      return;
    }

    let isMounted = true;

    (async () => {
      try {
        const result = await getProducts({
          collection: collectionName,
          limit: 12,
        });
        if (!isMounted) return;
        setCollectionProducts(
          result.products.filter((item) => item.id !== product.id),
        );
      } catch {
        if (isMounted) setCollectionProducts([]);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [product?.id, product?.collectionName]);

  const selectedVariant = useMemo<ProductVariant | undefined>(() => {
    if (!product) {
      return undefined;
    }

    return (
      product.variants.find((variant) => variant.id === selectedVariantId) ??
      product.variants[0]
    );
  }, [product, selectedVariantId]);

  const isGiftCardProduct = product?.productType === "GIFT_CARD";

  // True only when sizes is in the NEW `[{size, stock}]` shape; legacy
  // number-array data should be ignored until backend migration runs.
  const variantHasSizes = !!(
    selectedVariant?.sizes &&
    selectedVariant.sizes.length > 0 &&
    selectedVariant.sizes.every(
      (s) => typeof s?.size === "number" && typeof s?.stock === "number",
    )
  );

  // When the variant changes, default-pick the first in-stock size (or null if none).
  useEffect(() => {
    if (!variantHasSizes) {
      setSelectedSizeIndex(null);
      return;
    }
    const firstInStock = selectedVariant!.sizes!.findIndex((s) => s.stock > 0);
    setSelectedSizeIndex(firstInStock >= 0 ? firstInStock : 0);
  }, [selectedVariant, variantHasSizes]);

  const galleryImages = useMemo<ProductImage[]>(() => {
    if (!selectedVariant) {
      return [];
    }

    return getDetailPageGallery(selectedVariant);
  }, [selectedVariant]);

  // Videos live on the selected variant and render before images in the
  // gallery, so the first one is the default selection and autoplays.
  // Switching variants swaps the video set.
  type GalleryItem =
    | { kind: "video"; id: string; url: string }
    | { kind: "image"; id: string; src: string; position: number };

  const galleryItems = useMemo<GalleryItem[]>(() => {
    const videoItems: GalleryItem[] = (selectedVariant?.videos ?? []).map(
      (v) => ({
        kind: "video",
        id: v.key,
        url: v.url,
      }),
    );
    const imageItems: GalleryItem[] = galleryImages.map((img) => ({
      kind: "image",
      id: img.id,
      src: img.src,
      position: img.position,
    }));
    return [...videoItems, ...imageItems];
  }, [selectedVariant, galleryImages]);

  const selectedGalleryItem =
    galleryItems.find((item) => item.id === selectedImageId) ?? galleryItems[0];

  const selectedImage =
    galleryImages.find((image) => image.id === selectedImageId) ??
    galleryImages[0];

  // Poster image for the main video render — first available product image.
  const videoPosterSrc = galleryImages[0]?.src;

  // Vertical thumbnail strip — button-driven scroll, no autoplay, no loop.
  // Step matches one thumbnail (h-24 = 96px) plus the gap-3 between items (12px).
  const THUMB_SCROLL_STEP = 108;
  const thumbScrollRef = useRef<HTMLDivElement | null>(null);
  const [thumbScrollState, setThumbScrollState] = useState({
    atTop: true,
    atBottom: true,
  });

  function updateThumbScrollState() {
    const el = thumbScrollRef.current;
    if (!el) return;
    const atTop = el.scrollTop <= 0;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
    setThumbScrollState((prev) =>
      prev.atTop === atTop && prev.atBottom === atBottom
        ? prev
        : { atTop, atBottom },
    );
  }

  useEffect(() => {
    // Recompute reachability whenever the item set changes (variant swap
    // can grow or shrink the list).
    updateThumbScrollState();
  }, [galleryItems]);

  function scrollThumbs(direction: "up" | "down") {
    const el = thumbScrollRef.current;
    if (!el) return;
    el.scrollBy({
      top: direction === "down" ? THUMB_SCROLL_STEP : -THUMB_SCROLL_STEP,
      behavior: "smooth",
    });
  }

  // Horizontal "You May Also Like" carousel — scrolls ~80% of the visible
  // width per arrow click rather than wrapping onto a second row.
  const recoScrollRef = useRef<HTMLDivElement | null>(null);
  const collectionScrollRef = useRef<HTMLDivElement | null>(null);

  function scrollReco(direction: "left" | "right") {
    const el = recoScrollRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "right" ? step : -step,
      behavior: "smooth",
    });
  }

  function scrollCollection(direction: "left" | "right") {
    const el = collectionScrollRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "right" ? step : -step,
      behavior: "smooth",
    });
  }

  const currentUserReview = useMemo(() => {
    if (!session) {
      return undefined;
    }

    return reviews.find(
      (review) =>
        review.isEditable ||
        review.userEmail === session.email ||
        review.reviewerEmail === session.email ||
        review.username === session.username,
    );
  }, [reviews, session]);

  const totalReviewCount =
    reviewsPagination?.totalReviews ?? product?.reviewsCount ?? 0;
  const averageReviewRating =
    reviews.length > 0
      ? reviews.reduce((total, review) => total + review.rating, 0) /
        reviews.length
      : (product?.rating ?? 0);
  const normalizedCategory = (product?.category ?? "").trim().toLowerCase();
  const isRingCategory =
    normalizedCategory === "ring" || normalizedCategory === "rings";
  // Prefer the chosen size's price override when a size is selected; fall
  // back to the variant's base price. Kept in one place so the price shown
  // in the right rail, the buy-now draft, and the cart snapshot all agree.
  const chosenSizeEntry =
    selectedVariant?.sizes && selectedSizeIndex !== null
      ? selectedVariant.sizes[selectedSizeIndex]
      : undefined;
  const basePrice = chosenSizeEntry?.price ?? selectedVariant?.price;
  // Per-size spec overrides (Cadenza-style). When absent, product-level
  // values apply so legacy products render exactly as before.
  const displayedDiamondWeight =
    chosenSizeEntry?.totalDiamondWeight ?? product?.totalDiamondWeight ?? 0;
  const displayedMeasurement =
    chosenSizeEntry?.measurement ?? product?.measurement ?? "";
  // Prefer the chosen size's SKU; fall back to the variant's base SKU.
  const displayedSku = chosenSizeEntry?.sku ?? selectedVariant?.sku ?? "N/A";

  const reviewBreakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter(
      (review) => Math.round(review.rating) === star,
    ).length;
    const width = totalReviewCount > 0 ? (count / totalReviewCount) * 100 : 0;

    return { star, count, width };
  });

  function toggleFaq(index: number) {
    setOpenFaqIndexes((currentIndexes) =>
      currentIndexes.includes(index)
        ? currentIndexes.filter((currentIndex) => currentIndex !== index)
        : [...currentIndexes, index],
    );
  }

  function handleVariantChange(variant: ProductVariant) {
    const nextGallery = getDetailPageGallery(variant);

    setSelectedVariantId(variant.id);
    // Videos are variant-scoped — pick the new variant's first video as
    // the default selection. Fall back to the new variant's first image
    // if it has no videos.
    const firstVideoKey = variant.videos?.[0]?.key;
    setSelectedImageId(firstVideoKey ?? nextGallery[0]?.id ?? "");
  }

  async function handleAddToCart() {
    if (!product || !selectedVariant) {
      return;
    }

    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    const isGiftCardProduct = product.productType === "GIFT_CARD";

    setIsAddingToCart(true);
    setCartFeedback("");

    try {
      const chosenSize =
        variantHasSizes && selectedSizeIndex !== null
          ? selectedVariant.sizes![selectedSizeIndex]?.size
          : undefined;
      if (variantHasSizes && chosenSize === undefined) {
        setCartFeedback(t("productDetail.feedbackChooseSizeCart"));
        setIsAddingToCart(false);
        return;
      }

      await dispatch(
        addToCart({
          productId: product.id,
          quantity,
          variantId: selectedVariant.id,
          ...(chosenSize !== undefined ? { size: chosenSize } : {}),
          ...(isGiftCardProduct
            ? {
                giftCard: {
                  recipientEmail: giftRecipientEmail.trim() || undefined,
                  recipientName: giftRecipientName.trim() || undefined,
                  senderName: giftSenderName.trim() || undefined,
                  message: giftMessage.trim() || undefined,
                },
              }
            : {}),
        }),
      ).unwrap();

      setCartFeedback(
        isGiftCardProduct
          ? "Gift card added to cart. Pay online at checkout to send it."
          : "Item added to cart successfully.",
      );
    } catch {
      setCartFeedback(t("productDetail.feedbackAddToCartError"));
    } finally {
      setIsAddingToCart(false);
    }
  }

  function handleBuyNow() {
    if (!product || !selectedVariant) {
      return;
    }

    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    const chosenSize =
      variantHasSizes && selectedSizeIndex !== null
        ? selectedVariant.sizes![selectedSizeIndex]?.size
        : undefined;
    if (variantHasSizes && chosenSize === undefined) {
      setCartFeedback(t("productDetail.feedbackChooseSizeBuy"));
      return;
    }

    const draft = {
      item: {
        id: `${product.id}-${selectedVariant.id}${chosenSize !== undefined ? `-${chosenSize}` : ""}`,
        productId: product.id,
        variantId: selectedVariant.id,
        title: product.title,
        variantTitle: selectedVariant.title,
        thumbnail: getVariantImage(selectedVariant),
        price: basePrice ?? selectedVariant.price,
        quantity,
        ...(chosenSize !== undefined ? { size: chosenSize } : {}),
        ...(selectedVariant.sizeMeasurement
          ? { sizeMeasurement: selectedVariant.sizeMeasurement }
          : {}),
      },
      returnPath: location.pathname,
    };

    setSingleCheckoutDraft(draft);
    navigate("/checkout?source=single", {
      state: {
        source: "single",
        draft,
      },
    });
  }

  async function handleWishlistAction() {
    if (!product) {
      return;
    }

    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    setIsUpdatingWishlist(true);
    setWishlistFeedback("");

    try {
      if (wishlistItem) {
        await dispatch(removeWishlistItem(wishlistItem.id)).unwrap();
        setWishlistFeedback(t("productDetail.feedbackWishlistRemoved"));
        return;
      }

      await dispatch(addToWishlist(product.id)).unwrap();
      setWishlistFeedback(t("productDetail.feedbackWishlistSaved"));
    } catch {
      setWishlistFeedback(t("productDetail.feedbackWishlistError"));
    } finally {
      setIsUpdatingWishlist(false);
    }
  }

  function openReviewForm() {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (currentUserReview) {
      setReviewForm({
        rating: currentUserReview.rating,
        comment: currentUserReview.comment,
      });
    } else {
      setReviewForm(initialReviewForm);
    }

    setReviewFeedback("");
    setIsReviewFormOpen(true);
  }

  async function handleReviewSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!product) {
      return;
    }

    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (!reviewForm.comment.trim()) {
      setReviewFeedback(t("productDetail.reviewCommentRequired"));
      return;
    }

    setIsSubmittingReview(true);
    setReviewFeedback("");

    try {
      if (currentUserReview) {
        await updateProductReview(currentUserReview.id, {
          rating: reviewForm.rating,
          comment: reviewForm.comment.trim(),
        });
        setReviewFeedback(t("productDetail.reviewUpdated"));
      } else {
        await createProductReview(product.id, {
          rating: reviewForm.rating,
          comment: reviewForm.comment.trim(),
        });
        setReviewFeedback(t("productDetail.reviewAdded"));
      }

      await loadReviews(product.id);
      setIsReviewFormOpen(false);
      setReviewForm(initialReviewForm);
    } catch {
      setReviewFeedback(t("productDetail.reviewSaveError"));
    } finally {
      setIsSubmittingReview(false);
    }
  }

  async function handleDeleteReview() {
    if (!product || !currentUserReview) {
      return;
    }

    setIsSubmittingReview(true);
    setReviewFeedback("");

    try {
      await deleteProductReview(currentUserReview.id);
      await loadReviews(product.id);
      setReviewForm(initialReviewForm);
      setIsReviewFormOpen(false);
      setReviewFeedback(t("productDetail.reviewDeleted"));
    } catch {
      setReviewFeedback(t("productDetail.reviewDeleteError"));
    } finally {
      setIsSubmittingReview(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-poppins">
      <Header />
      <main className="pb-16">
        {isLoading ? <ProductDetailSkeleton /> : null}

        {!isLoading && error ? (
          <div className="mx-auto max-w-[1480px] px-6 py-10 lg:px-10">
            <div className="border border-rose-200 bg-rose-50 px-6 py-8 text-[13px] uppercase tracking-[0.16em] text-rose-700">
              {error}
            </div>
          </div>
        ) : null}

        {!isLoading && product && selectedVariant ? (
          <div className="mx-auto max-w-[1480px] px-6 py-10 lg:px-10">
            <nav className="mb-8 text-[12px] uppercase tracking-[0.18em] text-zinc-500">
              <Link to="/" className="transition hover:text-zinc-900">
                {t("productDetail.home")}
              </Link>{" "}
              /{" "}
              <Link to="/products" className="transition hover:text-zinc-900">
                {t("productDetail.shop")}
              </Link>{" "}
              / <span className="text-zinc-900">{product.title}</span>
            </nav>

            <section className="grid gap-12 xl:grid-cols-[1.08fr_0.92fr]">
              <div className="space-y-6 xl:sticky xl:top-24 xl:self-start">
                <div className="grid gap-5 lg:grid-cols-[120px_minmax(0,1fr)]">
                  <div className="order-2 flex flex-col lg:order-1 lg:max-h-[540px] lg:gap-2">
                    <button
                      type="button"
                      onClick={() => scrollThumbs("up")}
                      disabled={thumbScrollState.atTop}
                      aria-label={t("productDetail.scrollThumbnailsUp")}
                      className="hidden h-8 w-full items-center justify-center border border-zinc-200 bg-white text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-30 lg:flex"
                    >
                      <ChevronUp className="h-4 w-4" strokeWidth={2} />
                    </button>
                    <div
                      ref={thumbScrollRef}
                      onScroll={updateThumbScrollState}
                      className="flex gap-3 overflow-x-auto pb-2 lg:flex-1 lg:flex-col lg:overflow-x-visible lg:overflow-y-auto lg:pb-0 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] max-md:max-w-[calc(100vw-48px)]"
                    >
                      {galleryItems.map((item, itemIdx) => {
                        const isSelected = selectedGalleryItem?.id === item.id;
                        const thumbBorder = isSelected
                          ? "border-zinc-900"
                          : "border-zinc-200 hover:border-zinc-500";

                        return (
                          <button
                            key={`${item.id}-${itemIdx}`}
                            type="button"
                            onClick={() => setSelectedImageId(item.id)}
                            className={`relative min-w-[100px] shrink-0 overflow-hidden border bg-white transition lg:min-w-0 ${thumbBorder}`}
                          >
                            {item.kind === "video" ? (
                              <>
                                <img
                                  src={
                                    videoPosterSrc ??
                                    getVariantImage(selectedVariant)
                                  }
                                  alt={`${product.title} video`}
                                  className="block h-24 w-full object-cover"
                                />
                                <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                                  <Play
                                    className="h-6 w-6 text-white"
                                    strokeWidth={2}
                                    fill="white"
                                  />
                                </span>
                              </>
                            ) : (
                              <img
                                src={item.src}
                                alt={product.title}
                                className="block h-24 w-full object-cover"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      type="button"
                      onClick={() => scrollThumbs("down")}
                      disabled={thumbScrollState.atBottom}
                      aria-label={t("productDetail.scrollThumbnailsDown")}
                      className="hidden h-8 w-full items-center justify-center border border-zinc-200 bg-white text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-30 lg:flex"
                    >
                      <ChevronDown className="h-4 w-4" strokeWidth={2} />
                    </button>
                  </div>

                  <div className="order-1 relative overflow-hidden bg-zinc-50 lg:order-2">
                    <button
                      type="button"
                      onClick={() => void handleWishlistAction()}
                      disabled={isUpdatingWishlist}
                      className={`absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center border bg-white transition disabled:opacity-60 ${
                        wishlistItem
                          ? "border-pink-500 text-pink-500"
                          : "border-zinc-300 text-zinc-700 hover:border-pink-500 hover:text-pink-500"
                      }`}
                      aria-label={
                        wishlistItem
                          ? t("common.removeFromWishlist")
                          : t("common.addToWishlist")
                      }
                    >
                      <Heart
                        className={`h-4 w-4 ${wishlistItem ? "fill-current" : ""}`}
                        strokeWidth={1.8}
                      />
                    </button>
                    {selectedGalleryItem?.kind === "video" ? (
                      <video
                        key={selectedGalleryItem.id}
                        src={selectedGalleryItem.url}
                        poster={videoPosterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        // controls
                        className="block h-[540px] w-full bg-white border border-zinc-300 object-contain"
                      />
                    ) : (
                      <img
                        src={
                          selectedImage?.src ?? getVariantImage(selectedVariant)
                        }
                        alt={product.title}
                        className="block h-[540px] w-full object-contain"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6 font-poppins">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h1 className="font-play text-[24px] font-bold leading-tight tracking-[-0.01em] text-zinc-900 sm:text-[28px] lg:text-[32px]">
                      {product.title}
                    </h1>
                    {product.h2 ? (
                      <h2 className="mt-2 text-[12px] uppercase tracking-[0.14em] text-zinc-500">
                        {product.h2}
                      </h2>
                    ) : null}
                  </div>
                  <p className="font-play shrink-0 whitespace-nowrap text-[20px] font-medium text-zinc-900 sm:text-[24px]">
                    {formatPrice(basePrice, currency)}
                  </p>
                </div>

                {!isGiftCardProduct ? (
                  <div className="border-t border-zinc-200 pt-5">
                    <p className="font-play text-[13px] font-medium uppercase tracking-[0.18em] text-zinc-900">
                      {t("productDetail.metal")}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
                      {product.variants.map((variant) => {
                        const swatchImage = getMetalSwatchImage(variant.title);
                        const isSelected = selectedVariant.id === variant.id;
                        const metalLabel =
                          variant.title.split("/")[0]?.trim() || variant.title;

                        return (
                          <button
                            key={variant.id}
                            type="button"
                            onClick={() => handleVariantChange(variant)}
                            title={variant.title}
                            className="flex items-center gap-2.5 text-left"
                          >
                            <span
                              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition ${
                                isSelected
                                  ? "border-zinc-900"
                                  : "border-zinc-200"
                              }`}
                            >
                              {swatchImage ? (
                                <img
                                  src={swatchImage}
                                  alt=""
                                  aria-hidden="true"
                                  className="block h-6 w-6 rounded-full object-cover"
                                />
                              ) : (
                                <span
                                  className={`block h-6 w-6 rounded-full ${getMetalToneClass(variant.title)}`}
                                />
                              )}
                            </span>
                            <span
                              className={`text-[12px] ${
                                isSelected ? "text-zinc-900" : "text-zinc-500"
                              }`}
                            >
                              {metalLabel}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {isRingCategory ? (
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() => setIsSizeGuideOpen(true)}
                          className="text-[12px] font-medium uppercase tracking-[0.18em] text-pink-500 underline-offset-4 hover:underline"
                        >
                          {t("productDetail.sizeGuide")}
                        </button>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                <div>
                  {variantHasSizes ? (
                    <div className="mt-5">
                      <p className="font-play text-[13px] font-medium uppercase tracking-[0.18em] text-zinc-900">
                        {t("productDetail.size")}
                        {selectedVariant.sizeMeasurement
                          ? ` (${selectedVariant.sizeMeasurement})`
                          : ""}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedVariant.sizes!.map((sizeEntry, idx) => {
                          const isSelected = selectedSizeIndex === idx;
                          const isOutOfStock = sizeEntry.stock <= 0;
                          const hasPerSizePrice = !!sizeEntry.price;
                          return (
                            <button
                              key={`${sizeEntry.size}-${idx}`}
                              type="button"
                              disabled={isOutOfStock}
                              onClick={() => setSelectedSizeIndex(idx)}
                              title={
                                isOutOfStock
                                  ? "Out of stock"
                                  : `${sizeEntry.stock} in stock`
                              }
                              className={`flex ${hasPerSizePrice ? "h-14 min-w-[72px] flex-col" : "h-11 min-w-[44px] items-center"} justify-center border px-3 text-sm font-medium transition ${
                                isOutOfStock
                                  ? "cursor-not-allowed border-zinc-200 text-zinc-300 line-through"
                                  : isSelected
                                    ? "border-zinc-900 bg-zinc-900 text-white"
                                    : "border-zinc-300 text-zinc-900 hover:border-zinc-900"
                              }`}
                            >
                              <span className="leading-none">
                                {sizeEntry.size}
                              </span>
                              {hasPerSizePrice ? (
                                <span
                                  className={`mt-1 text-[11px] font-normal leading-none ${
                                    isSelected
                                      ? "text-white/80"
                                      : "text-zinc-500"
                                  }`}
                                >
                                  {formatPrice(sizeEntry.price!, currency)}
                                </span>
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}

                  {isGiftCardProduct ? (
                    <div className="mt-6 space-y-3 border border-zinc-200 bg-zinc-50 p-4">
                      <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-zinc-900">
                        Send this gift card
                      </p>
                      <p className="text-[12px] text-zinc-500">
                        Leave the email blank to keep it for yourself. Gift
                        cards require online payment.
                      </p>
                      <input
                        type="email"
                        value={giftRecipientEmail}
                        onChange={(e) => setGiftRecipientEmail(e.target.value)}
                        placeholder={t("productDetail.giftRecipientEmailPlaceholder")}
                        className="h-[46px] w-full border border-zinc-300 px-3 text-[13px] outline-none focus:border-zinc-800"
                      />
                      <input
                        type="text"
                        value={giftRecipientName}
                        onChange={(event) =>
                          setGiftRecipientName(event.target.value)
                        }
                        placeholder={t("productDetail.giftRecipientNamePlaceholder")}
                        className="h-[46px] w-full border border-zinc-300 px-3 text-[13px] outline-none focus:border-zinc-800"
                      />
                      <input
                        type="text"
                        value={giftSenderName}
                        onChange={(event) =>
                          setGiftSenderName(event.target.value)
                        }
                        placeholder={t("productDetail.giftSenderNamePlaceholder")}
                        className="h-[46px] w-full border border-zinc-300 px-3 text-[13px] outline-none focus:border-zinc-800"
                      />
                      <textarea
                        value={giftMessage}
                        onChange={(event) => setGiftMessage(event.target.value)}
                        placeholder={t("productDetail.giftMessagePlaceholder")}
                        className="min-h-[80px] w-full border border-zinc-300 px-3 py-2 text-[13px] outline-none focus:border-zinc-800"
                      />
                    </div>
                  ) : null}

                  <div className="mt-2">
                    <p className="mb-2 font-play text-[12px] font-medium uppercase tracking-[0.18em] text-zinc-900">
                      {isGiftCardProduct
                        ? "Quantity (codes)"
                        : t("productDetail.quantity")}
                    </p>
                    <div className="flex h-[46px] w-[130px] items-center border border-zinc-800">
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity((value) => Math.max(1, value - 1))
                        }
                        className="flex h-full w-1/3 items-center justify-center text-base text-zinc-800 transition hover:bg-zinc-100"
                      >
                        −
                      </button>
                      <span className="flex h-full w-1/3 items-center justify-center border-x border-zinc-800 text-[13px] font-medium">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((value) => value + 1)}
                        className="flex h-full w-1/3 items-center justify-center text-base text-zinc-800 transition hover:bg-zinc-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div
                    className={`mt-5 grid gap-3 ${
                      isGiftCardProduct ? "" : "grid-cols-2"
                    }`}
                  >
                    {isGiftCardProduct ? null : (
                      <button
                        type="button"
                        onClick={handleBuyNow}
                        className="h-[50px] bg-zinc-900 px-4 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition hover:bg-zinc-700 sm:text-[13px]"
                      >
                        {t("productDetail.buyNow")}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => void handleAddToCart()}
                      disabled={isAddingToCart}
                      className="h-[50px] border border-zinc-900 bg-white px-4 text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-900 transition hover:bg-zinc-900 hover:text-white disabled:opacity-60 sm:text-[13px]"
                    >
                      {isAddingToCart
                        ? t("productDetail.adding")
                        : t("productDetail.addCart")}
                    </button>
                  </div>
                </div>

                <div className="border-t border-zinc-200 pt-5">
                  <p className="text-[14px] leading-7 text-zinc-600">
                    {product.description}
                  </p>
                </div>

                <div className="border-t border-zinc-200">
                  <button
                    type="button"
                    onClick={() => setIsDetailsOpen((value) => !value)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                    aria-expanded={isDetailsOpen}
                  >
                    <span className="font-play text-[14px] font-medium uppercase tracking-[0.18em] text-zinc-900">
                      {t("productDetail.details")}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-zinc-600 transition-transform ${
                        isDetailsOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={1.6}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isDetailsOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-1.5 pb-5 text-[12px] uppercase tracking-[0.14em] text-zinc-600">
                        <p>
                          <span className="text-zinc-900">
                            {t("productDetail.sku")}:
                          </span>{" "}
                          {displayedSku}
                        </p>
                        {product.style ? (
                          <p>
                            <span className="text-zinc-900">
                              {t("productDetail.style")}:
                            </span>{" "}
                            {product.style}
                          </p>
                        ) : null}
                        {product.metal ? (
                          <p>
                            <span className="text-zinc-900">
                              {t("productDetail.metal")}:
                            </span>{" "}
                            {product.metal}
                          </p>
                        ) : null}
                        {product.finish ? (
                          <p>
                            <span className="text-zinc-900">
                              {t("productDetail.finish")}:
                            </span>{" "}
                            {product.finish}
                          </p>
                        ) : null}
                        {displayedDiamondWeight > 0 ? (
                          <p>
                            <span className="text-zinc-900">
                              {t("productDetail.diamondWeight")}:
                            </span>{" "}
                            {displayedDiamondWeight} {t("productDetail.carats")}
                          </p>
                        ) : null}
                        {displayedMeasurement ? (
                          <p>
                            <span className="text-zinc-900">
                              {t("productDetail.measurement")}:
                            </span>{" "}
                            {displayedMeasurement}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-200 pt-5">
                  <h3 className="font-play text-[15px] font-medium uppercase tracking-[0.18em] text-zinc-900">
                    {t("productDetail.aboutProduct")}
                  </h3>
                  {product.bulletPoints.length > 0 ? (
                    <ul className="mt-4 space-y-2.5 text-[14px] leading-7 text-zinc-600">
                      {product.bulletPoints.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-3 block h-1.5 w-1.5 shrink-0 rounded-full bg-pink-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-[14px] leading-7 text-zinc-600">
                      No product highlights available.
                    </p>
                  )}
                </div>

                {cartFeedback ? (
                  <p className="text-[12px] uppercase tracking-[0.14em] text-zinc-600">
                    {cartFeedback}
                  </p>
                ) : null}
                {wishlistFeedback ? (
                  <p className="text-[12px] uppercase tracking-[0.14em] text-zinc-600">
                    {wishlistFeedback}
                  </p>
                ) : null}
              </div>
            </section>

            {product.collectionName && collectionProducts.length > 0 ? (
              <section className="mt-16 border-t border-zinc-200 pt-12">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-play text-[18px] font-medium uppercase tracking-[0.18em] text-zinc-900 sm:text-[22px]">
                    {t("productDetail.moreFrom", {
                      collection: product.collectionName,
                    })}
                  </h2>
                  <div className="hidden items-center gap-2 sm:flex">
                    <button
                      type="button"
                      onClick={() => scrollCollection("left")}
                      aria-label={t("productDetail.scrollCollectionLeft")}
                      className="flex h-9 w-9 items-center justify-center border border-zinc-300 text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900"
                    >
                      <ChevronLeft className="h-4 w-4" strokeWidth={2} />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollCollection("right")}
                      aria-label={t("productDetail.scrollCollectionRight")}
                      className="flex h-9 w-9 items-center justify-center border border-zinc-300 text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900"
                    >
                      <ChevronRight className="h-4 w-4" strokeWidth={2} />
                    </button>
                  </div>
                </div>

                <div
                  ref={collectionScrollRef}
                  className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 sm:gap-6 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
                >
                  {collectionProducts.map((collectionProduct) => (
                    <div
                      key={collectionProduct.id}
                      className="w-[62%] min-w-[200px] max-w-[280px] shrink-0 snap-start sm:w-[280px]"
                    >
                      <ProductCard item={collectionProduct} />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {product.recommendedProducts.length > 0 ? (
              <section className="mt-16 border-t border-zinc-200 pt-12">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-play text-[18px] font-medium uppercase tracking-[0.18em] text-zinc-900 sm:text-[22px]">
                    {t("productDetail.youMayAlsoLike")}
                  </h2>
                  <div className="hidden items-center gap-2 sm:flex">
                    <button
                      type="button"
                      onClick={() => scrollReco("left")}
                      aria-label={t("productDetail.scrollProductsLeft")}
                      className="flex h-9 w-9 items-center justify-center border border-zinc-300 text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900"
                    >
                      <ChevronLeft className="h-4 w-4" strokeWidth={2} />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollReco("right")}
                      aria-label={t("productDetail.scrollProductsRight")}
                      className="flex h-9 w-9 items-center justify-center border border-zinc-300 text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900"
                    >
                      <ChevronRight className="h-4 w-4" strokeWidth={2} />
                    </button>
                  </div>
                </div>

                <div
                  ref={recoScrollRef}
                  className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 sm:gap-6 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
                >
                  {product.recommendedProducts.map((recommendedProduct) => (
                    <div
                      key={recommendedProduct.id}
                      className="w-[62%] min-w-[200px] max-w-[280px] shrink-0 snap-start sm:w-[280px]"
                    >
                      <ProductCard item={recommendedProduct} />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {/* Customer Reviews — hidden for now, preserved for later
                        <section className="mt-16 border-t border-zinc-200 pt-12">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <h2 className="text-[14px] font-medium uppercase tracking-[0.22em] text-zinc-600 sm:text-xl">
                                    Customer Reviews
                                </h2>
                                <button
                                    type="button"
                                    onClick={openReviewForm}
                                    className="flex items-center gap-2 border border-zinc-800 bg-white px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-800 transition hover:bg-zinc-900 hover:text-white sm:text-[13px]"
                                >
                                    <PencilLine className="h-4 w-4" />
                                    {currentUserReview
                                        ? "Edit Review"
                                        : "Write Review"}
                                </button>
                            </div>

                            <div className="mt-8 grid gap-8 border-b border-zinc-200 pb-8 lg:grid-cols-[220px_minmax(0,1fr)]">
                                <div>
                                    <p className="text-[44px] font-medium leading-none text-zinc-900">
                                        {averageReviewRating.toFixed(1)}
                                    </p>
                                    <div className="mt-2">
                                        <StarRating
                                            rating={averageReviewRating}
                                        />
                                    </div>
                                    <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                                        ({formatReviewCount(totalReviewCount)})
                                        Rating
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    {reviewBreakdown.map((item) => (
                                        <div
                                            key={item.star}
                                            className="grid grid-cols-[24px_1fr_36px] items-center gap-3 text-[12px] tracking-[0.08em] text-zinc-500"
                                        >
                                            <span>{item.star}</span>
                                            <div className="h-1.5 overflow-hidden bg-zinc-200">
                                                <div
                                                    className="h-full bg-pink-500"
                                                    style={{
                                                        width: `${item.width}%`,
                                                    }}
                                                />
                                            </div>
                                            <span>{item.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {isReviewFormOpen ? (
                                <form
                                    onSubmit={(event) =>
                                        void handleReviewSubmit(event)
                                    }
                                    className="mt-8 border border-zinc-200 bg-white p-6 text-left"
                                >
                                    <div className="grid gap-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-start">
                                        <label className="text-[12px] font-medium uppercase tracking-[0.18em] text-zinc-900">
                                            Rating
                                            <select
                                                value={reviewForm.rating}
                                                onChange={(event) =>
                                                    setReviewForm(
                                                        (current) => ({
                                                            ...current,
                                                            rating: Number(
                                                                event.target
                                                                    .value,
                                                            ),
                                                        }),
                                                    )
                                                }
                                                className="mt-2 h-12 w-full border border-zinc-300 bg-white px-4 text-[13px] text-zinc-800 outline-none transition focus:border-zinc-900"
                                            >
                                                {reviewRatingOptions.map(
                                                    (rating) => (
                                                        <option
                                                            key={rating}
                                                            value={rating}
                                                        >
                                                            {rating} / 5
                                                        </option>
                                                    ),
                                                )}
                                            </select>
                                        </label>

                                        <label className="text-[12px] font-medium uppercase tracking-[0.18em] text-zinc-900">
                                            Comment
                                            <textarea
                                                value={reviewForm.comment}
                                                onChange={(event) =>
                                                    setReviewForm(
                                                        (current) => ({
                                                            ...current,
                                                            comment:
                                                                event.target
                                                                    .value,
                                                        }),
                                                    )
                                                }
                                                rows={5}
                                                className="mt-2 w-full border border-zinc-300 bg-white px-4 py-3 text-[13px] text-zinc-800 outline-none transition focus:border-zinc-900"
                                                placeholder={t("productDetail.reviewCommentPlaceholder")}
                                            />
                                        </label>
                                    </div>

                                    <div className="mt-5 flex flex-wrap gap-3">
                                        <button
                                            type="submit"
                                            disabled={isSubmittingReview}
                                            className="flex items-center gap-2 bg-pink-500 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition hover:bg-pink-600 disabled:opacity-60"
                                        >
                                            <PencilLine className="h-4 w-4" />
                                            {isSubmittingReview
                                                ? "Saving..."
                                                : currentUserReview
                                                  ? "Update Review"
                                                  : "Submit Review"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsReviewFormOpen(false);
                                                setReviewFeedback("");
                                                setReviewForm(
                                                    initialReviewForm,
                                                );
                                            }}
                                            className="border border-zinc-800 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-800 transition hover:bg-zinc-900 hover:text-white"
                                        >
                                            Cancel
                                        </button>
                                        {currentUserReview ? (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    void handleDeleteReview()
                                                }
                                                disabled={isSubmittingReview}
                                                className="flex items-center gap-2 border border-rose-400 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.22em] text-rose-600 transition hover:bg-rose-600 hover:text-white disabled:opacity-60"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                Delete Review
                                            </button>
                                        ) : null}
                                    </div>
                                </form>
                            ) : null}

                            {reviewFeedback ? (
                                <p className="mt-6 text-center text-[12px] uppercase tracking-[0.14em] text-zinc-600">
                                    {reviewFeedback}
                                </p>
                            ) : null}

                            <div className="mt-8 space-y-6">
                                {reviews.length === 0 ? (
                                    <div className="border border-dashed border-zinc-300 bg-white px-6 py-10 text-center">
                                        <h3 className="text-[14px] font-medium uppercase tracking-[0.18em] text-zinc-800">
                                            No reviews yet
                                        </h3>
                                        <p className="mt-2 text-[12px] uppercase tracking-[0.16em] text-zinc-500">
                                            Be the first to share feedback about
                                            this product.
                                        </p>
                                    </div>
                                ) : null}

                                {reviews.map((review) => (
                                    <article
                                        key={review.id}
                                        className="border-b border-zinc-200 pb-6 last:border-b-0 last:pb-0"
                                    >
                                        <div className="grid gap-4 sm:grid-cols-[72px_minmax(0,1fr)]">
                                            <div className="space-y-2">
                                                <div className="h-10 w-10 bg-zinc-200" />
                                                <div className="h-2.5 w-10 bg-zinc-200" />
                                                <div className="h-2.5 w-10 bg-zinc-200" />
                                            </div>
                                            <div>
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <StarRating
                                                        rating={review.rating}
                                                    />
                                                    <span className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                                                        {formatReviewDate(
                                                            review.createdAt,
                                                            i18n.language,
                                                        )}
                                                    </span>
                                                </div>
                                                <h3 className="mt-2 text-[14px] font-medium uppercase tracking-[0.06em] text-zinc-900">
                                                    {getReviewHeadline(
                                                        review.comment,
                                                        t("productDetail.customerReview"),
                                                    )}
                                                </h3>
                                                <p className="mt-2 text-[14px] leading-7 text-zinc-600">
                                                    {review.comment}
                                                </p>
                                                <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                                                    By{" "}
                                                    {review.reviewerName ||
                                                        review.username}
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                        */}

            <section className="mt-16 border-t border-zinc-200 pt-12">
              <SeoSectionsAccordion
                sections={product.seoExtended}
                fallbackTitle={product.title}
                fallbackOpeningParagraph={
                  product.additionalSeoContent ||
                  product.details ||
                  product.description
                }
              />
            </section>

            <section className="pt-12 font-poppins">
              <h2 className="font-play text-[14px] font-medium uppercase tracking-[0.22em] text-zinc-600 sm:text-xl">
                {t("productDetail.exploreCategories")}
              </h2>
              <div className="mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:gap-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {categoryCards.map((item, index) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="iwj-category-card group block w-[260px] flex-shrink-0 snap-start sm:w-[320px] lg:w-[340px]"
                    style={{
                      animationDelay: `${120 + index * 130}ms`,
                    }}
                  >
                    <div className="overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.label}
                        className="iwj-category-card-image block h-[420px] w-full object-cover object-center sm:h-[460px] lg:h-[500px]"
                      />
                    </div>
                    <p className="iwj-category-card-label mt-4 text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-600 sm:text-[13px]">
                      {t(
                        `productDetail.${item.label.toLowerCase()}`,
                        item.label,
                      )}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            {product.faqs.length > 0 ? (
              <section className="mt-16 border-t border-zinc-100 pt-14 font-poppins">
                {/* Header — mirrors the resource-page FAQ style */}
                <div className="mb-10 text-center">
                  <p className="text-[12px] font-medium uppercase tracking-[0.26em] text-pink-400">
                    {t("productDetail.gotQuestions")}
                  </p>
                  <h2 className="mt-2 font-play text-[24px] font-semibold text-[#1f2732] md:text-[30px]">
                    {t("productDetail.faqFor", { title: product.title })}
                  </h2>
                  <div className="mx-auto mt-4 h-px w-16 bg-pink-400" />
                </div>

                {/* Accordion list */}
                <div className="mx-auto flex w-full container flex-col gap-3">
                  {product.faqs.map((faq, index) => {
                    const isOpen = openFaqIndexes.includes(index);

                    return (
                      <div
                        key={`${faq.question}-${index}`}
                        className="overflow-hidden border border-zinc-200 bg-white"
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(index)}
                          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-zinc-50"
                          aria-expanded={isOpen}
                        >
                          <span className="font-poppins text-[16px] font-medium text-[#1f2732]">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 flex-shrink-0 text-[#1f2732] transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            strokeWidth={2}
                          />
                        </button>

                        {isOpen ? (
                          <div className="border-t border-zinc-100 bg-[#fafaf8] px-5 py-4">
                            <p className="font-poppins text-[15px] leading-7 text-[#344256]">
                              {faq.answer}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : null}
          </div>
        ) : null}
      </main>
      {isSizeGuideOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-2 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="size-guide-title"
          onClick={() => setIsSizeGuideOpen(false)}
        >
          <div
            className="relative flex max-h-full w-auto max-w-full items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={ringSizeGuideImage.src}
              alt="Ring size guide"
              width={755}
              height={1068}
              className="block h-auto max-h-[92vh] w-[755px] max-w-[96vw] object-contain"
              style={{ aspectRatio: "755 / 1068" }}
            />

            <button
              type="button"
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute right-2 top-2 z-20 flex h-9 w-9 items-center justify-center bg-white text-zinc-900 shadow-lg transition hover:scale-105 sm:right-3 sm:top-3 sm:h-10 sm:w-10"
              aria-label={t("productDetail.closeSizeGuide")}
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      ) : null}
      <Footer />
    </div>
  );
}
