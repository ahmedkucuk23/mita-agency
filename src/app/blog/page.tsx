import { db } from "@/lib/db";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await db.blogPost.findMany({
    where: { isPublished: true },
    include: { author: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-slate-300">
            Insights, tips, and updates from our marketing experts
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                {post.category && (
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
                    {post.category}
                  </span>
                )}
                <h2 className="text-2xl font-bold mb-2 text-slate-900">{post.title}</h2>
                {post.excerpt && (
                  <p className="text-slate-600 mb-4">{post.excerpt}</p>
                )}
                <div className="flex items-center text-sm text-slate-500">
                  {post.author?.name && <span>{post.author.name}</span>}
                  {post.publishedAt && (
                    <span className="ml-2">
                      • {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
