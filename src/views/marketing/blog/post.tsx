import { baseUrl } from "@/app/sitemap";
import { CustomMDX } from "@/components/blog/mdx";
import { BlogPostClient, PostNavigation } from "@/components/blog/post-view";
import { TableOfContents } from "@/components/blog/table-of-contents";
import {
    BlogPostStructuredData,
    BreadcrumbStructuredData,
} from "@/components/seo/structured-data";
import { profile } from "@/core/config/profile";
import {
    calculateReadTime,
    getAdjacentBlogPosts,
    getResolvedBlogPostBySlug,
} from "@/features/blog";
import { notFound } from "next/navigation";

export async function getBlogPostStaticParams() {
    const { getBlogPosts } = await import("@/features/blog");
    let posts = getBlogPosts();

    return posts
        .filter((post) => post && post.slug)
        .map((post) => ({
            slug: post.slug.split("/"),
        }));
}

export async function BlogPostView({
    params,
    includeDrafts = false,
    linkBasePath = "/blog",
    showStructuredData = true,
}: {
    params: Promise<{ slug: string | string[] }>;
    includeDrafts?: boolean;
    linkBasePath?: string;
    showStructuredData?: boolean;
}) {
    const resolvedParams = await params;
    let slug = Array.isArray(resolvedParams.slug)
        ? resolvedParams.slug.join("/")
        : resolvedParams.slug;

    if (!slug) {
        notFound();
    }

    const post = await getResolvedBlogPostBySlug(slug, includeDrafts);

    if (!post) {
        notFound();
    }

    const { prevPost, nextPost } = await getAdjacentBlogPosts(
        slug,
        includeDrafts,
    );

    return (
        <>
            {showStructuredData && (
                <>
                    <BlogPostStructuredData
                        title={post.metadata.title}
                        description={post.metadata.summary}
                        publishedAt={post.metadata.publishedAt}
                        updatedAt={post.metadata.updatedAt}
                        author={post.metadata.author || profile.name}
                        image={post.metadata.image}
                        url={`${baseUrl}/blog/${post.slug}`}
                        keywords={post.metadata.tags || []}
                    />
                    <BreadcrumbStructuredData
                        items={[
                            { name: "Home", url: "/" },
                            { name: "Blog", url: "/blog" },
                            {
                                name: post.metadata.title,
                                url: `/blog/${post.slug}`,
                            },
                        ]}
                    />
                </>
            )}
            <TableOfContents />

            <section className="bg-pattern relative">
                <BlogPostClient
                    publishedAt={post.metadata.publishedAt}
                    topic={post.metadata.topic}
                    tags={post.metadata.tags}
                    title={post.metadata.title}
                    summary={post.metadata.summary}
                    readTime={calculateReadTime(post.content)}
                    slug={post.slug}
                />

                <div className="screen-border mb-12" />

                <article className="prose prose-quoteless prose-neutral dark:prose-invert max-w-3xl prose-code:before:content-none prose-code:after:content-none">
                    <CustomMDX source={post.content} />
                </article>

                <PostNavigation
                    prevPost={prevPost}
                    nextPost={nextPost}
                    basePath={linkBasePath}
                />
            </section>
        </>
    );
}
