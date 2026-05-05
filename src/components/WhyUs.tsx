import { useLang } from "@/contexts/LangContext";
import { ShieldCheck } from "lucide-react";

const WhyUs = () => {
  const { t } = useLang();
  return (
    <section className="py-20">
      <div className="container max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-10 text-center">{t.why.title}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {t.why.items.map((it: string, i: number) => (
            <div key={i} className="flex items-start gap-3 p-5 bg-card rounded-xl border border-border shadow-sm hover:shadow-elegant transition-smooth">
              <div className="bg-accent/10 text-accent rounded-lg p-2 flex-shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="font-medium">{it}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;