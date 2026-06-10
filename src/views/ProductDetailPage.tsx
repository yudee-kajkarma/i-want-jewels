"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
    Headset,
    Heart,
    Package,
    PencilLine,
    Play,
    ShieldCheck,
    Trash2,
    Truck,
    X,
} from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "@/lib/router";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import ProductCard from "../components/sections/ProductCard";
import ringSizeGuideImage from "../assets/image/Ring-Size-Guide.jpeg";
import { useAuth } from "../context/AuthContext";
import { useCurrency } from "../context/CurrencyContext";
import {
    createProductReview,
    deleteProductReview,
    getProductBySlug,
    getProductReviews,
    updateProductReview,
} from "../services/productService";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToCart } from "../store/cartSlice";
import { addToWishlist, removeWishlistItem } from "../store/wishlistSlice";
import type {
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
    getMetalSwatchImage,
    getMetalToneClass,
    getVariantGallery,
    getVariantImage,
} from "../utils/productUtils";
import { formatPrice } from "../utils/price";
import { setSingleCheckoutDraft } from "../utils/checkoutStorage";

const productFeatureItems = [
    {
        title: "Shipping Faster",
        description:
            "Carefully packed and dispatched within 1–2 business days from our Antwerp boutique.",
    },
    {
        title: "Cost Material",
        description:
            "Lab-grown diamonds and sterling silver crafted at fair, considered pricing.",
    },
    {
        title: "High Quality",
        description:
            "Every piece is QC-checked twice before shipping to keep the finish flawless.",
    },
    {
        title: "Highly Compatible",
        description:
            "Hypoallergenic finishes designed for daily wear and gentle on sensitive skin.",
    },
];

function StarRating({ rating }: { rating: number }) {
    const filledStars = Math.round(rating);

    return (
        <div className="flex items-center gap-1 text-pink-500">
            {Array.from({ length: 5 }, (_, index) => (
                <span
                    key={index}
                    aria-hidden="true"
                    className="text-base leading-none"
                >
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
                <circle
                    cx="42"
                    cy="20"
                    r="10"
                    fill="#f79e1b"
                    fillOpacity="0.95"
                />
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
                <polygon
                    points="49,13 61,20 49,27"
                    fill="#21a453"
                    fillOpacity="0.95"
                />
            </svg>
        );
    }

    return (
        <svg
            viewBox="0 0 72 40"
            className="h-8 w-full"
            role="img"
            aria-label="Card"
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

function ProductFeatureGrid() {
    const featureIcons = [Truck, Package, ShieldCheck, Headset];

    return (
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {productFeatureItems.map((item, index) => {
                const FeatureIcon = featureIcons[index] ?? ShieldCheck;

                return (
                    <article key={item.title} className="space-y-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center bg-pink-500 text-white">
                            <FeatureIcon
                                strokeWidth={1.6}
                                className="h-5 w-5"
                            />
                        </span>
                        <h4 className="text-[14px] font-medium uppercase tracking-[0.18em] text-zinc-900">
                            {item.title}
                        </h4>
                        <p className="max-w-[18rem] text-[13px] leading-7 text-zinc-600">
                            {item.description}
                        </p>
                    </article>
                );
            })}
        </div>
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

function formatReviewDate(value: string): string {
    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(new Date(value));
}

function getReviewHeadline(comment: string): string {
    const trimmedComment = comment.trim();

    if (!trimmedComment) {
        return "Customer Review";
    }

    return trimmedComment.length > 52
        ? `${trimmedComment.slice(0, 52)}...`
        : trimmedComment;
}

function getInitialVariantId(product: ProductDetail | null): string {
    return product?.variants[0]?.id ?? "";
}

function getInitialImageId(product: ProductDetail | null): string {
    // Prefer the first video — videos render before images in the gallery and
    // should be the default selection so they autoplay on page load.
    const firstVideoKey = product?.videos?.[0]?.key;
    if (firstVideoKey) return firstVideoKey;

    const firstVariant = product?.variants[0];
    const firstImage = firstVariant
        ? getVariantGallery(firstVariant)[0]
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
    const [product, setProduct] = useState<ProductDetail | null>(
        initialProduct,
    );
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
                const productResponse =
                    await getProductBySlug(productIdentifier);
                const reviewsResponse = await getProductReviews(
                    productResponse.id,
                );

                if (!isMounted) {
                    return;
                }

                const firstVariant = productResponse.variants[0];
                const firstImage = firstVariant
                    ? getVariantGallery(firstVariant)[0]
                    : undefined;
                const firstVideoKey = productResponse.videos?.[0]?.key;

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
                setError("Unable to load this product right now.");
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
    }, [
        initialProduct?.id,
        initialProduct?.slug,
        productIdentifier,
        slugParam,
    ]);

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

    const selectedVariant = useMemo<ProductVariant | undefined>(() => {
        if (!product) {
            return undefined;
        }

        return (
            product.variants.find(
                (variant) => variant.id === selectedVariantId,
            ) ?? product.variants[0]
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
        const firstInStock = selectedVariant!.sizes!.findIndex(
            (s) => s.stock > 0,
        );
        setSelectedSizeIndex(firstInStock >= 0 ? firstInStock : 0);
    }, [selectedVariant, variantHasSizes]);

    const galleryImages = useMemo<ProductImage[]>(() => {
        if (!selectedVariant) {
            return [];
        }

        return getVariantGallery(selectedVariant);
    }, [selectedVariant]);

    // Videos are product-level (not variant-scoped) and render before images in
    // the gallery so the first one is the default selection and autoplays.
    type GalleryItem =
        | { kind: "video"; id: string; url: string }
        | { kind: "image"; id: string; src: string; position: number };

    const galleryItems = useMemo<GalleryItem[]>(() => {
        const videoItems: GalleryItem[] = (product?.videos ?? []).map((v) => ({
            kind: "video",
            id: v.key,
            url: v.url,
        }));
        const imageItems: GalleryItem[] = galleryImages.map((img) => ({
            kind: "image",
            id: img.id,
            src: img.src,
            position: img.position,
        }));
        return [...videoItems, ...imageItems];
    }, [product?.videos, galleryImages]);

    const selectedGalleryItem =
        galleryItems.find((item) => item.id === selectedImageId) ??
        galleryItems[0];

    const selectedImage =
        galleryImages.find((image) => image.id === selectedImageId) ??
        galleryImages[0];

    // Poster image for the main video render — first available product image.
    const videoPosterSrc = galleryImages[0]?.src;

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
    const basePrice = selectedVariant?.price;

    const reviewBreakdown = [5, 4, 3, 2, 1].map((star) => {
        const count = reviews.filter(
            (review) => Math.round(review.rating) === star,
        ).length;
        const width =
            totalReviewCount > 0 ? (count / totalReviewCount) * 100 : 0;

        return { star, count, width };
    });

    function toggleFaq(index: number) {
        setOpenFaqIndexes((currentIndexes) =>
            currentIndexes.includes(index)
                ? currentIndexes.filter(
                      (currentIndex) => currentIndex !== index,
                  )
                : [...currentIndexes, index],
        );
    }

    function handleVariantChange(variant: ProductVariant) {
        const nextGallery = getVariantGallery(variant);

        setSelectedVariantId(variant.id);
        // Videos are product-level — keep the first one selected on variant
        // change so it stays the default. Fall back to the new variant's
        // first image if there are no videos.
        const firstVideoKey = product?.videos?.[0]?.key;
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
                setCartFeedback("Please choose a size before adding to cart.");
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
                                  recipientEmail:
                                      giftRecipientEmail.trim() || undefined,
                                  recipientName:
                                      giftRecipientName.trim() || undefined,
                                  senderName:
                                      giftSenderName.trim() || undefined,
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
            setCartFeedback("Unable to add this item to cart right now.");
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
            setCartFeedback("Please choose a size before buying.");
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
                price: selectedVariant.price,
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
                setWishlistFeedback("Item removed from wishlist.");
                return;
            }

            await dispatch(addToWishlist(product.id)).unwrap();
            setWishlistFeedback("Item saved to wishlist.");
        } catch {
            setWishlistFeedback("Unable to update wishlist right now.");
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
            setReviewFeedback("Review comment is required.");
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
                setReviewFeedback("Review updated successfully.");
            } else {
                await createProductReview(product.id, {
                    rating: reviewForm.rating,
                    comment: reviewForm.comment.trim(),
                });
                setReviewFeedback("Review added successfully.");
            }

            await loadReviews(product.id);
            setIsReviewFormOpen(false);
            setReviewForm(initialReviewForm);
        } catch {
            setReviewFeedback("Unable to save review right now.");
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
            setReviewFeedback(
                "Review deleted successfully. You can add a new review now.",
            );
        } catch {
            setReviewFeedback("Unable to delete review right now.");
        } finally {
            setIsSubmittingReview(false);
        }
    }

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-parsi">
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
                            <Link
                                to="/"
                                className="transition hover:text-zinc-900"
                            >
                                Home
                            </Link>{" "}
                            /{" "}
                            <Link
                                to="/products"
                                className="transition hover:text-zinc-900"
                            >
                                Shop
                            </Link>{" "}
                            /{" "}
                            <span className="text-zinc-900">
                                {product.title}
                            </span>
                        </nav>

                        <section className="grid gap-12 xl:grid-cols-[1.08fr_0.92fr]">
                            <div className="space-y-6 xl:sticky xl:top-24 xl:self-start">
                                <div className="grid gap-5 lg:grid-cols-[120px_minmax(0,1fr)]">
                                    <div className="order-2 flex gap-3 overflow-x-auto pb-2 lg:order-1 lg:flex-col lg:overflow-visible">
                                        {galleryItems.map((item, itemIdx) => {
                                            const isSelected =
                                                selectedGalleryItem?.id === item.id;
                                            const thumbBorder = isSelected
                                                ? "border-zinc-900"
                                                : "border-zinc-200 hover:border-zinc-500";

                                            return (
                                                <button
                                                    key={`${item.id}-${itemIdx}`}
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedImageId(item.id)
                                                    }
                                                    className={`relative min-w-[100px] overflow-hidden border bg-white transition lg:min-w-0 ${thumbBorder}`}
                                                >
                                                    {item.kind === "video" ? (
                                                        <>
                                                            <img
                                                                src={
                                                                    videoPosterSrc ??
                                                                    getVariantImage(
                                                                        selectedVariant,
                                                                    )
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

                                    <div className="order-1 relative overflow-hidden bg-zinc-50 lg:order-2">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                void handleWishlistAction()
                                            }
                                            disabled={isUpdatingWishlist}
                                            className={`absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center border bg-white transition disabled:opacity-60 ${
                                                wishlistItem
                                                    ? "border-pink-500 text-pink-500"
                                                    : "border-zinc-300 text-zinc-700 hover:border-pink-500 hover:text-pink-500"
                                            }`}
                                            aria-label={
                                                wishlistItem
                                                    ? "Remove from wishlist"
                                                    : "Add to wishlist"
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
                                                controls
                                                className="block h-[540px] w-full bg-black object-contain"
                                            />
                                        ) : (
                                            <img
                                                src={
                                                    selectedImage?.src ??
                                                    getVariantImage(selectedVariant)
                                                }
                                                alt={product.title}
                                                className="block h-[540px] w-full object-contain"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-[28px] font-medium leading-tight tracking-[-0.01em] text-zinc-900 sm:text-[32px] lg:text-[36px]">
                                        {(() => {
                                            const match = product.title.match(
                                                /^(.*?)\s*(lab grown.*)$/i,
                                            );
                                            if (match) {
                                                return (
                                                    <>
                                                        <span className="font-bold">
                                                            {match[1]}
                                                        </span>{" "}
                                                        {match[2]}
                                                    </>
                                                );
                                            }
                                            return (
                                                <span className="font-bold">
                                                    {product.title}
                                                </span>
                                            );
                                        })()}
                                    </h1>
                                    {product.h2 ? (
                                        <h2 className="mt-2 text-[13px] uppercase tracking-[0.14em] text-zinc-600">
                                            {product.h2}
                                        </h2>
                                    ) : null}
                                    <div className="mt-3 flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-zinc-500">
                                        <StarRating
                                            rating={averageReviewRating}
                                        />
                                        <span>
                                            (
                                            {formatReviewCount(
                                                totalReviewCount,
                                            )}{" "}
                                            reviews)
                                        </span>
                                    </div>
                                </div>

                                <div className="border-t border-zinc-200 pt-5">
                                    <p className="text-[28px] font-medium tracking-[-0.01em] text-zinc-900 sm:text-[32px]">
                                        {formatPrice(basePrice, currency)}
                                    </p>
                                    <p className="mt-4 max-w-[36rem] text-[14px] leading-7 text-zinc-600">
                                        {product.description}
                                    </p>
                                    <div className="mt-4 space-y-1.5 text-[12px] uppercase tracking-[0.14em] text-zinc-600">
                                        <p>
                                            <span className="text-zinc-900">
                                                SKU:
                                            </span>{" "}
                                            {selectedVariant.sku ?? "N/A"}
                                        </p>
                                        {product.style ? (
                                            <p>
                                                <span className="text-zinc-900">
                                                    Style:
                                                </span>{" "}
                                                {product.style}
                                            </p>
                                        ) : null}
                                        {product.metal ? (
                                            <p>
                                                <span className="text-zinc-900">
                                                    Metal:
                                                </span>{" "}
                                                {product.metal}
                                            </p>
                                        ) : null}
                                        {product.finish ? (
                                            <p>
                                                <span className="text-zinc-900">
                                                    Finish:
                                                </span>{" "}
                                                {product.finish}
                                            </p>
                                        ) : null}
                                        {product.totalDiamondWeight > 0 ? (
                                            <p>
                                                <span className="text-zinc-900">
                                                    Total Diamond Weight:
                                                </span>{" "}
                                                {product.totalDiamondWeight}{" "}
                                                carats
                                            </p>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="border-t border-zinc-200 py-5">
                                    {!isGiftCardProduct ? (
                                        <>
                                            <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-zinc-900">
                                                Color
                                            </p>
                                            <div className="mt-3 flex items-center gap-3">
                                                {product.variants.map((variant) => {
                                                    const swatchImage =
                                                        getMetalSwatchImage(
                                                            variant.title,
                                                        );

                                                    return (
                                                        <button
                                                            key={variant.id}
                                                            type="button"
                                                            onClick={() =>
                                                                handleVariantChange(
                                                                    variant,
                                                                )
                                                            }
                                                            title={variant.title}
                                                            className={`h-7 w-7 rounded-full border-2 transition ${
                                                                selectedVariant.id ===
                                                                variant.id
                                                                    ? "border-zinc-900"
                                                                    : "border-transparent hover:border-zinc-300"
                                                            }`}
                                                        >
                                                            {swatchImage ? (
                                                                <img
                                                                    src={swatchImage}
                                                                    alt=""
                                                                    aria-hidden="true"
                                                                    className="block h-full w-full rounded-full object-cover"
                                                                />
                                                            ) : (
                                                                <span
                                                                    className={`block h-full w-full rounded-full ${getMetalToneClass(variant.title)}`}
                                                                />
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            {isRingCategory ? (
                                                <div className="mt-4 flex items-center text-sm">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setIsSizeGuideOpen(true)
                                                        }
                                                        className="text-[12px] font-medium uppercase tracking-[0.18em] text-pink-500 underline-offset-4 hover:underline"
                                                    >
                                                        View Size Guide
                                                    </button>
                                                </div>
                                            ) : null}
                                        </>
                                    ) : null}

                                    {/* {variantHasSizes ? (
                                        <div className="mt-5">
                                            <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-zinc-900">
                                                Size{selectedVariant.sizeMeasurement ? ` (${selectedVariant.sizeMeasurement})` : ''}
                                            </p>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {selectedVariant.sizes!.map((sizeEntry, idx) => {
                                                    const isSelected = selectedSizeIndex === idx;
                                                    const isOutOfStock = sizeEntry.stock <= 0;
                                                    return (
                                                        <button
                                                            key={`${sizeEntry.size}-${idx}`}
                                                            type="button"
                                                            disabled={isOutOfStock}
                                                            onClick={() => setSelectedSizeIndex(idx)}
                                                            title={isOutOfStock ? 'Out of stock' : `${sizeEntry.stock} in stock`}
                                                            className={`flex h-11 min-w-[44px] items-center justify-center border px-3 text-sm font-medium transition ${
                                                                isOutOfStock
                                                                    ? 'cursor-not-allowed border-zinc-200 text-zinc-300 line-through'
                                                                    : isSelected
                                                                        ? 'border-zinc-900 bg-zinc-900 text-white'
                                                                        : 'border-zinc-300 text-zinc-900 hover:border-zinc-900'
                                                            }`}
                                                        >
                                                            {sizeEntry.size}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ) : null} */}

                                    {isGiftCardProduct ? (
                                        <div className="mt-6 space-y-3 border border-zinc-200 bg-zinc-50 p-4">
                                            <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-zinc-900">
                                                Send this gift card
                                            </p>
                                            <p className="text-[12px] text-zinc-500">
                                                Leave the email blank to keep it
                                                for yourself. Gift cards require
                                                online payment.
                                            </p>
                                            <input
                                                type="email"
                                                value={giftRecipientEmail}
                                                onChange={(e) =>
                                                    setGiftRecipientEmail(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Recipient email (optional)"
                                                className="h-[46px] w-full border border-zinc-300 px-3 text-[13px] outline-none focus:border-zinc-800"
                                            />
                                            <input
                                                type="text"
                                                value={giftRecipientName}
                                                onChange={(event) =>
                                                    setGiftRecipientName(
                                                        event.target.value,
                                                    )
                                                }
                                                placeholder="Recipient name (optional)"
                                                className="h-[46px] w-full border border-zinc-300 px-3 text-[13px] outline-none focus:border-zinc-800"
                                            />
                                            <input
                                                type="text"
                                                value={giftSenderName}
                                                onChange={(event) =>
                                                    setGiftSenderName(
                                                        event.target.value,
                                                    )
                                                }
                                                placeholder="Your name (optional)"
                                                className="h-[46px] w-full border border-zinc-300 px-3 text-[13px] outline-none focus:border-zinc-800"
                                            />
                                            <textarea
                                                value={giftMessage}
                                                onChange={(event) =>
                                                    setGiftMessage(
                                                        event.target.value,
                                                    )
                                                }
                                                placeholder="Personal message (optional)"
                                                className="min-h-[80px] w-full border border-zinc-300 px-3 py-2 text-[13px] outline-none focus:border-zinc-800"
                                            />
                                        </div>
                                    ) : null}

                                    <div className="mt-6">
                                        <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.18em] text-zinc-900">
                                            {isGiftCardProduct
                                                ? "Quantity (codes)"
                                                : "Quantity"}
                                        </p>

                                        <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-3 items-stretch">
                                            <div className="flex h-[46px] items-center border border-zinc-800">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setQuantity((value) =>
                                                            Math.max(
                                                                1,
                                                                value - 1,
                                                            ),
                                                        )
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
                                                    onClick={() =>
                                                        setQuantity(
                                                            (value) =>
                                                                value + 1,
                                                        )
                                                    }
                                                    className="flex h-full w-1/3 items-center justify-center text-base text-zinc-800 transition hover:bg-zinc-100"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    void handleAddToCart()
                                                }
                                                disabled={isAddingToCart}
                                                className="h-[46px] w-full border border-zinc-800 bg-white px-4 text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-800 transition hover:bg-zinc-900 hover:text-white disabled:opacity-60 sm:text-[13px]"
                                            >
                                                {isAddingToCart
                                                    ? "Adding..."
                                                    : "Add to Cart"}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {isGiftCardProduct ? null : (
                                    <button
                                        type="button"
                                        onClick={handleBuyNow}
                                        className="block w-full bg-pink-500 px-4 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition hover:bg-pink-600 disabled:opacity-60 sm:text-[13px]"
                                    >
                                        Buy It Now
                                    </button>
                                )}

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

                        <section className="mt-16 border-t border-zinc-200 pt-12">
                            <div className="grid gap-14 md:grid-cols-2">
                                <div>
                                    <h3 className="text-[14px] font-medium uppercase tracking-[0.22em] text-zinc-600 sm:text-xl">
                                        Description
                                    </h3>
                                    <p className="mt-4 whitespace-pre-line text-[14px] leading-7 text-zinc-600">
                                        {product.additionalSeoContent ||
                                            product.details ||
                                            product.description}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-[14px] font-medium uppercase tracking-[0.22em] text-zinc-600 sm:text-xl">
                                        About This Product
                                    </h3>
                                    {product.bulletPoints.length > 0 ? (
                                        <ul className="mt-4 space-y-2 text-[14px] leading-7 text-zinc-600">
                                            {product.bulletPoints.map(
                                                (item) => (
                                                    <li
                                                        key={item}
                                                        className="flex items-start gap-3"
                                                    >
                                                        <span className="mt-3 block h-1 w-1 rounded-full bg-pink-500" />
                                                        <span>{item}</span>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    ) : (
                                        <p className="mt-4 text-[14px] leading-7 text-zinc-600">
                                            No product highlights available.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <ProductFeatureGrid />

                            {product.faqs.length > 0 ? (
                                <section className="mt-16">
                                    <h3 className="text-[14px] font-medium uppercase tracking-[0.22em] text-zinc-600 sm:text-xl">
                                        FAQ
                                    </h3>

                                    <div className="mt-6 border-t border-zinc-200">
                                        {product.faqs.map((faq, index) => {
                                            const isOpen =
                                                openFaqIndexes.includes(index);

                                            return (
                                                <article
                                                    key={`${faq.question}-${index}`}
                                                    className="border-b border-zinc-200"
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            toggleFaq(index)
                                                        }
                                                        className="flex w-full items-center justify-between gap-4 py-5 text-left transition hover:text-pink-500"
                                                        aria-expanded={isOpen}
                                                    >
                                                        <span className="pr-3 text-[14px] font-medium uppercase tracking-[0.08em] text-zinc-900 sm:text-[15px]">
                                                            {index + 1}.{" "}
                                                            {faq.question}
                                                        </span>
                                                        <span className="text-xl font-light leading-none">
                                                            {isOpen ? "−" : "+"}
                                                        </span>
                                                    </button>

                                                    {isOpen ? (
                                                        <div className="pb-5">
                                                            <p className="max-w-[860px] text-[14px] leading-7 text-zinc-600">
                                                                {faq.answer}
                                                            </p>
                                                        </div>
                                                    ) : null}
                                                </article>
                                            );
                                        })}
                                    </div>
                                </section>
                            ) : null}
                        </section>

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
                                                placeholder="Share your experience with this product."
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
                                                        )}
                                                    </span>
                                                </div>
                                                <h3 className="mt-2 text-[14px] font-medium uppercase tracking-[0.06em] text-zinc-900">
                                                    {getReviewHeadline(
                                                        review.comment,
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

                        {product.recommendedProducts.length > 0 ? (
                            <section className="mt-16 border-t border-zinc-200 pt-12">
                                <h2 className="text-[14px] font-medium uppercase tracking-[0.22em] text-zinc-600 sm:text-xl">
                                    Related Products
                                </h2>

                                <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
                                    {product.recommendedProducts.map(
                                        (recommendedProduct) => (
                                            <ProductCard
                                                key={recommendedProduct.id}
                                                item={recommendedProduct}
                                            />
                                        ),
                                    )}
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
                            aria-label="Close size guide"
                        >
                            <X
                                className="h-4 w-4 sm:h-5 sm:w-5"
                                strokeWidth={2.2}
                            />
                        </button>
                    </div>
                </div>
            ) : null}
            <Footer />
        </div>
    );
}
