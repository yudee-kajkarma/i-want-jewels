import type { Metadata } from "next";
import { getBlogs } from "../../services/blogService";
import type { BlogPagination } from "../../types/blog";
import BlogPage from "../../views/BlogPage";

export const metadata: Metadata = {
    title: "Blogs | I Want Jewels",
    description:
        "Read jewellery guides, style tips, and care advice from I Want Jewels.",
};

type PageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function parsePageNumber(value: string | string[] | undefined): number {
    const rawValue = Array.isArray(value) ? value[0] : value;
    const pageNumber = Number(rawValue);

    if (!Number.isFinite(pageNumber) || pageNumber <= 0) {
        return 1;
    }

    return Math.floor(pageNumber);
}

export default async function Page({ searchParams }: PageProps) {
    const resolvedSearchParams = await searchParams;
    const page = parsePageNumber(resolvedSearchParams.page);

    const result = await getBlogs({ page, limit: 10 }).catch(() => null);

    const fallbackPagination: BlogPagination = {
        currentPage: page,
        totalPages: 1,
        totalRecords: 0,
        recordsPerPage: 10,
        hasNextPage: false,
        hasPrevPage: page > 1,
    };

    return (
        <BlogPage
            blogs={result?.blogs ?? []}
            pagination={result?.pagination ?? fallbackPagination}
        />
    );
}
