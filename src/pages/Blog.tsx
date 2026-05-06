import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import { BLOG_POSTS } from "@/data/blogPosts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const SITE = typeof window !== "undefined" ? window.location.origin : "";

const Blog = () => {
  useEffect(() => {
    document.title = "Blog BGD-Trans | Sfaturi transport persoane, colete și auto România - Europa";
    const desc = "Blog BGD-Trans: ghiduri, sfaturi și prețuri pentru transport persoane, colete și auto pe platformă între România, Germania, Austria și Olanda.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.setAttribute("name", "description"); document.head.appendChild(meta); }
    meta.setAttribute("content", desc);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = `${SITE}/blog`;
  }, []);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog BGD-Trans",
    url: `${SITE}/blog`,
    description: "Ghiduri și sfaturi pentru transport România - Europa",
    publisher: { "@type": "Organization", name: "BGD-Trans", url: SITE },
    blogPost: BLOG_POSTS.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `${SITE}/blog/${p.slug}`,
      author: { "@type": "Organization", name: "BGD-Trans" },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground py-16">
          <div className="container max-w-5xl">
            <nav aria-label="Breadcrumb" className="text-sm text-primary-foreground/70 mb-3">
              <Link to="/" className="hover:text-accent">Acasă</Link> <span>/</span> <span>Blog</span>
            </nav>
            <h1 className="text-3xl md:text-5xl font-bold mb-3">Blog BGD-Trans</h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl">
              Ghiduri, sfaturi și informații utile pentru transport persoane, colete și auto pe platformă între România și Europa de Vest.
            </p>
          </div>
        </section>

        <section className="container max-w-5xl py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
                <Card className="h-full hover:shadow-lg transition-smooth border-border">
                  <CardHeader>
                    <div className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">{post.category}</div>
                    <CardTitle className="text-xl group-hover:text-accent transition-smooth">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{post.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(post.date).toLocaleDateString("ro-RO")}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readingTime}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default Blog;