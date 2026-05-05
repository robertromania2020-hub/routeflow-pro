import { useLang } from "@/contexts/LangContext";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const { t } = useLang();
  return (
    <section id="testimonials" className="py-20 bg-secondary/40">
      <div className="container">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">{t.testimonials.title}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {t.testimonials.items.map((it: any, i: number) => (
            <div key={i} className="bg-card p-6 rounded-2xl border border-border shadow-elegant relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-accent/20" />
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-accent text-accent" />)}
              </div>
              <p className="text-muted-foreground mb-4 italic">"{it.text}"</p>
              <div className="border-t border-border pt-3">
                <div className="font-bold">{it.name}</div>
                <div className="text-xs text-muted-foreground">{it.route}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;