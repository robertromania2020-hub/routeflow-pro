import { useLang, PHONE, PHONE_DISPLAY } from "@/contexts/LangContext";
import { Phone, Truck, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const langs: { code: "ro" | "en" | "de"; flag: string }[] = [
  { code: "ro", flag: "🇷🇴" },
  { code: "en", flag: "🇬🇧" },
  { code: "de", flag: "🇩🇪" },
];

const Header = () => {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <div className="bg-primary text-primary-foreground rounded-lg p-2">
            <Truck className="h-5 w-5" />
          </div>
          BGD-Trans
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <button onClick={() => scrollTo("services")} className="hover:text-accent transition-smooth">{t.nav.services}</button>
          <button onClick={() => scrollTo("routes")} className="hover:text-accent transition-smooth">{t.nav.routes}</button>
          <button onClick={() => scrollTo("booking")} className="hover:text-accent transition-smooth">{t.nav.booking}</button>
          <button onClick={() => scrollTo("testimonials")} className="hover:text-accent transition-smooth">{t.nav.testimonials}</button>
          <Link to="/blog" className="hover:text-accent transition-smooth">Blog</Link>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 border border-border rounded-lg p-1">
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2 py-1 text-xs rounded transition-smooth ${lang === l.code ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                {l.flag} {l.code.toUpperCase()}
              </button>
            ))}
          </div>
          <Button asChild variant="default" size="sm" className="hidden sm:inline-flex bg-accent hover:bg-accent-glow text-accent-foreground">
            <a href={`tel:${PHONE}`} onClick={() => { import("@/lib/gtag").then(m => { m.trackEvent("call_click", { location: "header" }); m.trackConversion(m.CONVERSIONS.call); }); }}><Phone className="h-4 w-4 mr-1" /> {PHONE_DISPLAY}</a>
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container py-4 flex flex-col gap-3">
            <button onClick={() => scrollTo("services")} className="text-left py-2">{t.nav.services}</button>
            <button onClick={() => scrollTo("routes")} className="text-left py-2">{t.nav.routes}</button>
            <button onClick={() => scrollTo("booking")} className="text-left py-2">{t.nav.booking}</button>
            <button onClick={() => scrollTo("testimonials")} className="text-left py-2">{t.nav.testimonials}</button>
            <Link to="/blog" onClick={() => setOpen(false)} className="text-left py-2">Blog</Link>
            <div className="flex gap-2 pt-2 border-t border-border">
              {langs.map((l) => (
                <button key={l.code} onClick={() => setLang(l.code)} className={`px-3 py-1 rounded ${lang === l.code ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  {l.flag} {l.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;