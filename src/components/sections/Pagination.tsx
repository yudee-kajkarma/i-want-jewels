"use client";

type PaginationModel = {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    recordsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
};

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
    return (
        <svg
            viewBox="0 0 20 20"
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            {direction === "left" ? (
                <path
                    d="m12 5-5 5 5 5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            ) : (
                <path
                    d="m8 5 5 5-5 5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            )}
        </svg>
    );
}

function getVisiblePages(
    currentPage: number,
    totalPages: number,
): Array<number | "ellipsis"> {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 4) {
        return [1, 2, 3, 4, 5, "ellipsis", totalPages];
    }

    if (currentPage >= totalPages - 3) {
        return [
            1,
            "ellipsis",
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
        ];
    }

    return [
        1,
        "ellipsis",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "ellipsis",
        totalPages,
    ];
}

type PaginationProps = {
    pagination: PaginationModel;
    currentItemCount?: number;
    disabled?: boolean;
    onPageChange: (pageNumber: number) => void;
};

export default function Pagination({
    pagination,
    currentItemCount,
    disabled = false,
    onPageChange,
}: PaginationProps) {
    const shouldHideForShortResult =
        typeof currentItemCount === "number" &&
        currentItemCount > 0 &&
        currentItemCount < pagination.recordsPerPage &&
        pagination.currentPage === 1;

    if (pagination.totalPages <= 1) {
        return null;
    }

    if (shouldHideForShortResult) {
        return null;
    }

    const visiblePages = getVisiblePages(
        pagination.currentPage,
        pagination.totalPages,
    );

    return (
        <div className="mt-10 flex items-center justify-center gap-1 sm:gap-2">
            <button
                type="button"
                onClick={() =>
                    onPageChange(Math.max(1, pagination.currentPage - 1))
                }
                disabled={disabled || !pagination.hasPrevPage}
                className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#d8c8bb] bg-white text-[#24160f] transition hover:bg-[#111111] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
            >
                <ChevronIcon direction="left" />
            </button>

            {visiblePages.map((pageItem, index) => {
                if (pageItem === "ellipsis") {
                    return (
                        <span
                            key={`ellipsis-${index}`}
                            className="flex h-8 w-6 shrink-0 items-center justify-center text-xs font-semibold text-zinc-400 sm:h-11 sm:w-11 sm:text-sm"
                        >
                            ...
                        </span>
                    );
                }

                return (
                    <button
                        key={pageItem}
                        type="button"
                        onClick={() => onPageChange(pageItem)}
                        disabled={disabled}
                        className={`flex h-8 w-8 shrink-0 items-center justify-center border text-xs font-semibold transition sm:h-11 sm:w-11 sm:text-sm ${
                            pagination.currentPage === pageItem
                                ? "border-[#111111] bg-[#202020] text-white"
                                : "border-[#d8c8bb] bg-white text-[#24160f] hover:bg-[#111111] hover:text-white"
                        } disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                        {pageItem}
                    </button>
                );
            })}

            <button
                type="button"
                onClick={() =>
                    onPageChange(
                        Math.min(
                            pagination.totalPages,
                            pagination.currentPage + 1,
                        ),
                    )
                }
                disabled={disabled || !pagination.hasNextPage}
                className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#d8c8bb] bg-white text-[#24160f] transition hover:bg-[#111111] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
            >
                <ChevronIcon direction="right" />
            </button>
        </div>
    );
}
