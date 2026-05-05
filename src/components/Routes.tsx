import { useLang } from "@/contexts/LangContext";
import { CITIES } from "@/data/cities";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Routes = () => {
  const { t } = useLang();
  const countries = [
    { flag: "🇩🇪", name: "Germania", cities: CITIES.de, slug: "germania" },
    { flag: "🇦🇹", name: "Austria", cities: CITIES.at, slug: "austria" },
    { flag: "🇳🇱", name: "Olanda", cities: CITIES.nl, slug: "olanda" },
  ];
  return (
    <section id="routes" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.routes.title}</h2>
          <p className="text-muted-foreground text-lg">{t.routes.subtitle}</p>
        </div>

        <div className="bg-secondary/40 rounded-2xl p-6 md:p-8 mb-8 border border-border">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-accent" /> 🇷🇴 {t.routes.depart}
          </h3>
          <div className="flex flex-wrap gap-2">
            {CITIES.ro.map((c) => (
              <span key={c} className="bg-background border border-border rounded-full px-3 py-1 text-sm">{c}</span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {countries.map((co) => (
            <div key={co.slug} className="bg-card rounded-2xl p-6 border border-border shadow-elegant hover:border-accent transition-smooth">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{co.flag}</span>
                <h3 className="font-bold text-xl">{co.name}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4 max-h-40 overflow-y-auto">
                {co.cities.map((c) => (
                  <span key={c} className="text-xs bg-secondary rounded px-2 py-1">{c}</span>
                ))}
              </div>
              <Link to={`/rute/romania-${co.slug}`} className="text-accent font-semibold text-sm inline-flex items-center hover:gap-2 transition-smooth gap-1">
                {t.routes.seeMore} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Routes;