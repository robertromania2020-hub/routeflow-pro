import { useLang } from "@/contexts/LangContext";
import { Users, Package, Car, Check } from "lucide-react";
import vanPersons from "@/assets/hero-van.jpg";
import vanParcels from "@/assets/service-parcels.jpg";
import vanAuto from "@/assets/service-auto.jpg";

const Services = () => {
  const { t } = useLang();
  const cards = [
    { icon: Users, img: vanPersons, ...t.services.persons },
    { icon: Package, img: vanParcels, ...t.services.parcels },
    { icon: Car, img: vanAuto, ...t.services.auto },
  ];
  return (
    <section id="services" className="py-20 bg-secondary/40">
      <div className="container">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.services.title}</h2>
          <p className="text-muted-foreground text-lg">{t.services.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map(({ icon: Icon, img, title, items }, i) => (
            <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-elegant hover:-translate-y-2 transition-smooth border border-border">
              <div className="h-48 overflow-hidden">
                <img src={img} alt={title} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-smooth" />
              </div>
              <div className="p-6">
                <div className="bg-primary text-primary-foreground rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <ul className="space-y-2">
                  {items.map((it: string, j: number) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;