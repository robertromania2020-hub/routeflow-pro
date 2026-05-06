import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import BookingForm from "@/components/BookingForm";
import { getPostBySlug, BLOG_POSTS } from "@/data/blogPosts";
import { PHONE, PHONE_DISPLAY, WHATSAPP } from "@/contexts/LangContext";
import { ArrowRight, Calendar, Clock, Phone, MessageCircle } from "lucide-react";

const SITE = typeof window !== "undefined" ? window.location.origin : "";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} | Blog BGD-Trans`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.setAttribute("name", "description"); document.head.appendChild(meta); }
    meta.setAttribute("content", post.description);
    let kw = document.querySelector('meta[name="keywords"]');
    if (!kw) { kw = document.createElement("meta"); kw.setAttribute("name", "keywords"); document.head.appendChild(kw); }
    kw.setAttribute("content", post.keywords.join(", "));
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = `${SITE}/blog/${post.slug}`;
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "BGD-Trans" },
    publisher: { "@type": "Organization", name: "BGD-Trans", url: SITE },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/blog/${post.slug}` },
    keywords: post.keywords.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Acasă", item: SITE + "/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: SITE + "/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE}/blog/${post.slug}` },
    ],
  };

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground py-12">
          <div className="container max-w-3xl">
            <nav aria-label="Breadcrumb" className="text-sm text-primary-foreground/70 mb-3">
              <Link to="/" className="hover:text-accent">Acasă</Link> <span>/</span>{" "}
              <Link to="/blog" className="hover:text-accent">Blog</Link> <span>/</span>{" "}
              <span>{post.category}</span>
            </nav>
            <div className="text-xs font-semibold uppercase tracking-wide text-accent mb-3">{post.category}</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-lg text-primary-foreground/90 mb-4">{post.description}</p>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(post.date).toLocaleDateString("ro-RO")}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {post.readingTime}</span>
            </div>
          </div>
        </section>

        <article className="container max-w-3xl py-12">
          <div className="space-y-5 text-base leading-relaxed">
            {post.content.map((b, i) => {
              if (b.type === "h2") return <h2 key={i} className="text-2xl font-bold mt-8 mb-2 text-primary">{b.text}</h2>;
              if (b.type === "h3") return <h3 key={i} className="text-xl font-semibold mt-6 mb-2">{b.text}</h3>;
              if (b.type === "ul") return (
                <ul key={i} className="list-disc pl-6 space-y-2 text-muted-foreground">
                  {b.items?.map((it, j) => <li key={j}>{it}</li>)}
                </ul>
              );
              return <p key={i} className="text-muted-foreground">{b.text}</p>;
            })}
          </div>

          <div className="mt-10 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground rounded-2xl p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Ai nevoie de o ofertă rapidă?</h2>
            <p className="text-primary-foreground/90 mb-4 text-sm">Sună sau scrie pe WhatsApp — răspundem în câteva minute.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`tel:${PHONE}`} className="bg-accent text-accent-foreground font-semibold rounded-lg px-5 py-2.5 inline-flex items-center justify-center gap-2"><Phone className="h-4 w-4" /> {PHONE_DISPLAY}</a>
              <a href={WHATSAPP} target="_blank" rel="noopener" className="bg-whatsapp text-whatsapp-foreground font-semibold rounded-lg px-5 py-2.5 inline-flex items-center justify-center gap-2"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-bold mb-4">Articole similare</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link key={r.slug} to={`/blog/${r.slug}`} className="block border border-border rounded-xl p-4 hover:shadow-md transition-smooth">
                    <div className="text-xs font-semibold text-accent uppercase mb-1">{r.category}</div>
                    <div className="font-semibold mb-1">{r.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-2">{r.description}</div>
                    <div className="text-accent text-sm font-semibold mt-2 inline-flex items-center gap-1">Citește <ArrowRight className="h-3 w-3" /></div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        <BookingForm />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default BlogPost;