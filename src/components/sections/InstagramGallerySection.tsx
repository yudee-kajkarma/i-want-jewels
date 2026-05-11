"use client";

import { useEffect, useState } from "react";
import { getReels, type Reel } from "../../services/reelsService";

type InstagramGallerySectionProps = {
    title?: string;
    subtitle?: string;
};

export default function InstagramGallerySection({
    title = "I Want Jewels On Instagram",
    subtitle = "#Atvoguetheme",
}: InstagramGallerySectionProps) {
    const [videos, setVideos] = useState<Reel[]>([]);
    const [loading, setLoading] = useState(true);

    const [mobileIndex, setMobileIndex] = useState(0);
    const [desktopIndex, setDesktopIndex] = useState(0);
    const [isDesktopTransitionEnabled, setIsDesktopTransitionEnabled] =
        useState(true);

    const [loadedVideos, setLoadedVideos] = useState<Record<number, boolean>>(
        {},
    );

    const visibleDesktop = 6;
    const instaLink = "https://www.instagram.com/iwantjewels/";

    //  Keep your logic
    const desktopSlides =
        videos.length > visibleDesktop
            ? [...videos, ...videos.slice(0, videos.length)]
            : videos;

    // fetch videos
    useEffect(() => {
        async function loadVideos() {
            try {
                const response = await getReels();
                setVideos(response);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        loadVideos();
    }, []);

    // reset indexes when videos change
    useEffect(() => {
        setMobileIndex(0);
        setDesktopIndex(0);
        setIsDesktopTransitionEnabled(true);
    }, [videos.length]);

    //  Mobile auto slide
    useEffect(() => {
        if (videos.length <= 1) return;

        const timer = setInterval(() => {
            setMobileIndex((prev) => (prev + 1) % videos.length);
        }, 2500);

        return () => clearInterval(timer);
    }, [videos.length]);

    //  Desktop auto slide
    useEffect(() => {
        if (videos.length <= visibleDesktop) return;

        const timer = setInterval(() => {
            setDesktopIndex((prev) => prev + 1);
        }, 8000);

        return () => clearInterval(timer);
    }, [videos.length]);

    //  seamless infinite reset (NO JUMP)
    useEffect(() => {
        if (videos.length <= visibleDesktop) return;

        if (desktopIndex === videos.length) {
            const resetTimer = setTimeout(() => {
                setIsDesktopTransitionEnabled(false);
                setDesktopIndex(0);

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setIsDesktopTransitionEnabled(true);
                    });
                });
            }, 700);

            return () => clearTimeout(resetTimer);
        }
    }, [desktopIndex, videos.length]);

    const openInstagram = () => {
        window.open(instaLink, "_blank");
    };

    return (
        <section className="overflow-hidden font-parsi">
            {/* Heading */}
            <div className="mx-auto max-w-6xl px-4 py-10 text-center">
                <h2 className="text-3xl font-semibold md:text-4xl">{title}</h2>
                <p className="mt-3 text-sm text-zinc-500 md:text-base">
                    {subtitle}
                </p>
            </div>

            {/* Loading */}
            {loading && (
                <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 lg:grid-cols-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-[300px] animate-pulse  bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-200"
                        />
                    ))}
                </div>
            )}

            {/* Mobile View */}
            {!loading && videos.length > 0 && (
                <div className="sm:hidden px-3">
                    <button
                        onClick={openInstagram}
                        className="relative block h-[80vh] w-full overflow-hidden "
                    >
                        {!loadedVideos[mobileIndex] && (
                            <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-r from-zinc-300 via-zinc-100 to-zinc-300" />
                        )}

                        <video
                            src={videos[mobileIndex].url}
                            muted
                            autoPlay
                            loop
                            playsInline
                            onLoadedData={() =>
                                setLoadedVideos((prev) => ({
                                    ...prev,
                                    [mobileIndex]: true,
                                }))
                            }
                            className={`h-full w-full object-cover transition-opacity duration-700 ${
                                loadedVideos[mobileIndex]
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl shadow-xl">
                                ▶
                            </div>
                        </div>
                    </button>
                </div>
            )}

            {/* Desktop View */}
            {!loading && videos.length > 0 && (
                <div className="hidden sm:block py-6">
                    <div
                        className={`flex gap-4 px-4 ${
                            isDesktopTransitionEnabled
                                ? "transition-transform duration-700 ease-in-out"
                                : ""
                        }`}
                        style={{
                            transform: `translateX(-${desktopIndex * (100 / visibleDesktop)}%)`,
                            width: `${(desktopSlides.length / 12) * 100}%`,
                        }}
                    >
                        {desktopSlides.map((video, index) => {
                            const sourceIndex = index % videos.length;

                            return (
                                <button
                                    key={index}
                                    onClick={openInstagram}
                                    onMouseEnter={(event) => {
                                        const videoElement =
                                            event.currentTarget.querySelector(
                                                "video",
                                            );
                                        videoElement?.play().catch(() => {});
                                    }}
                                    onMouseLeave={(event) => {
                                        const videoElement =
                                            event.currentTarget.querySelector(
                                                "video",
                                            );
                                        videoElement?.pause();
                                    }}
                                    className="group relative h-[55vh] w-auto flex-shrink-0 overflow-hidden "
                                >
                                    {/* shimmer */}
                                    {!loadedVideos[sourceIndex] && (
                                        <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-r from-zinc-300 via-zinc-100 to-zinc-300" />
                                    )}

                                    <div className="h-full w-full overflow-hidden ">
                                        <video
                                            src={video.url}
                                            muted
                                            loop
                                            playsInline
                                            preload="metadata"
                                            onLoadedData={() =>
                                                setLoadedVideos((prev) => ({
                                                    ...prev,
                                                    [sourceIndex]: true,
                                                }))
                                            }
                                            className={`h-full w-full object-fill transition duration-500 group-hover:scale-110 ${
                                                loadedVideos[sourceIndex]
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            }`}
                                        />
                                    </div>

                                    {/* overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-100 transition group-hover:opacity-0">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl shadow-xl">
                                            ▶
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </section>
    );
}
