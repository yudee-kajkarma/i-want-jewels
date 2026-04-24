import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "../../../services/blogService";
import { getProductBySlug } from "../../../services/productService";
import BlogDetailPage from "../../../views/BlogDetailPage";

export const dynamic = "force-dynamic";

type BlogDetailRouteProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({
    params,
}: BlogDetailRouteProps): Promise<Metadata> {
    const { slug } = await params;
    const blogDetail = await getBlogBySlug(slug).catch(() => null);

    if (!blogDetail) {
        return {
            title: "Blog Not Found | I Want Jewels",
            description: "The requested blog article could not be found.",
        };
    }

    return {
        title: blogDetail.seo.metaTitle || `${blogDetail.title} | I Want Jewels`,
        description: blogDetail.seo.metaDescription || blogDetail.excerpt,
        openGraph: {
            title: blogDetail.seo.metaTitle || `${blogDetail.title} | I Want Jewels`,
            description: blogDetail.seo.metaDescription || blogDetail.excerpt,
            type: "article",
            images: blogDetail.coverImage ? [blogDetail.coverImage] : undefined,
        },
        alternates: {
            canonical: `/blog/${blogDetail.slug}`,
        },
    };
}

export default async function Page({ params }: BlogDetailRouteProps) {
    const { slug } = await params;
    const blogDetail = await getBlogBySlug(slug).catch(() => null);

    if (!blogDetail) {
        notFound();
    }

    const relatedProducts = (
        await Promise.all(
            blogDetail.relatedProducts.map(async (relatedProduct) => {
                if (!relatedProduct.slug) {
                    return null;
                }

                try {
                    return await getProductBySlug(relatedProduct.slug);
                } catch {
                    return null;
                }
            }),
        )
    ).filter((product): product is Awaited<ReturnType<typeof getProductBySlug>> =>
        Boolean(product),
    );

    return (
        <BlogDetailPage
            blogDetail={blogDetail}
            relatedProducts={relatedProducts}
        />
    );
}
