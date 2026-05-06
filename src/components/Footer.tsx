import { useLang, PHONE, PHONE_DISPLAY, WHATSAPP } from "@/contexts/LangContext";
import { Phone, MessageCircle, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useLang();
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-xl mb-3">
            <div className="bg-accent text-accent-foreground rounded-lg p-2"><Truck className="h-5 w-5" /></div>
            BGD-Trans
          </div>
          <p className="text-primary-foreground/70 text-sm">{t.footer.tagline}</p>
        </div>
        <div className="space-y-2">
          <a href={`tel:${PHONE}`} className="flex items-center gap-2 hover:text-accent transition-smooth"><Phone className="h-4 w-4" /> {PHONE_DISPLAY}</a>
          <a href={WHATSAPP} target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-accent transition-smooth"><MessageCircle className="h-4 w-4" /> {t.footer.whatsapp}</a>
        </div>
        <div className="text-sm text-primary-foreground/70">
          <Link to="/blog" className="block hover:text-accent transition-smooth mb-2">Blog</Link>
          <Link to="/ghid-transport-romania-europa" className="block hover:text-accent transition-smooth mb-2">Ghid transport RO → Europa</Link>
          <Link to="/admin" className="hover:text-accent transition-smooth">Admin</Link>
        </div>
      </div>
      <div className="container border-t border-primary-foreground/10 mt-8 pt-6 text-center text-sm text-primary-foreground/60">
        © {new Date().getFullYear()} BGD-Trans — {t.footer.rights}
      </div>
    </footer>
  );
};

export default Footer;