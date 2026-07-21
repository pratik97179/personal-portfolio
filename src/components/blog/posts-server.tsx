import { BLOG_DESCRIPTION, getVisibleBlogPosts } from "@/features/blog";
import { Section } from "../ui/section";
import { BlogPostsClient, PostCountHeader } from "./posts-client";

export async function BlogPosts() {
    const sortedBlogs = await getVisibleBlogPosts();

    return (
        <Section
            title="Posts"
            headerAction={<PostCountHeader count={sortedBlogs.length} />}
            noHeaderMargin
        >
            <div className="px-4 pt-4 md:px-5">
                <div className="border-b border-border/40 pb-4">
                    <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground/80 text-pretty">
                        {BLOG_DESCRIPTION}
                    </p>
                </div>
                <div className="pt-2">
                    <BlogPostsClient posts={sortedBlogs} />
                </div>
            </div>
        </Section>
    );
}
