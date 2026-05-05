import heroImg from "@/assets/hero-van.jpg";
import { useLang, PHONE, WHATSAPP } from "@/contexts/LangContext";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const { t } = useLang();
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <img
        src={heroImg}
        alt="BGD-Trans Renault Master pe autostradă europeană"
        width={1920}
        height={1088}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="container relative z-10 py-20">
        <div className="max-w-3xl text-primary-foreground animate-fade-up">
          <div className="inline-block bg-accent/90 text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full mb-4">
            🇷🇴 RO • 🇩🇪 DE • 🇦🇹 AT • 🇳🇱 NL
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            {t.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent-glow text-accent-foreground shadow-accent text-base h-14 px-8">
              <a href={`tel:${PHONE}`}><Phone className="mr-2 h-5 w-5" /> {t.hero.callNow}</a>
            </Button>
            <Button asChild size="lg" className="bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground text-base h-14 px-8">
              <a href={WHATSAPP} target="_blank" rel="noopener"><MessageCircle className="mr-2 h-5 w-5" /> {t.hero.whatsapp}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;