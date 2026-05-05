import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import StickyCTA from "@/components/StickyCTA";
import { CITIES } from "@/data/cities";
import { useEffect } from "react";
import { ArrowRight, MapPin, Truck } from "lucide-react";

const ROUTES: Record<string, { title: string; flag: string; country: string; cities: string[]; desc: string }> = {
  "romania-germania": {
    title: "Transport România – Germania",
    country: "Germania", flag: "🇩🇪", cities: CITIES.de,
    desc: "Curse regulate de transport persoane și colete între România și Germania. Plecări săptămânale din toate orașele importante.",
  },
  "romania-austria": {
    title: "Transport România – Austria",
    country: "Austria", flag: "🇦🇹", cities: CITIES.at,
    desc: "Transport rapid și sigur între România și Austria — Wien, Linz și retur.",
  },
  "romania-olanda": {
    title: "Transport România – Olanda",
    country: "Olanda", flag: "🇳🇱", cities: CITIES.nl,
    desc: "Curse regulate România – Olanda. Persoane, colete și auto pe platformă, livrare ușă-la-ușă.",
  },
};

const RoutePage = () => {
  const { slug } = useParams();
  const route = slug ? ROUTES[slug] : null;

  useEffect(() => {
    if (route) document.title = `${route.title} | BGD-Trans`;
  }, [route]);

  if (!route) return <div className="p-10 text-center">Rută inexistentă. <Link to="/" className="text-accent">Acasă</Link></div>;

  const schema = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: `BGD-Trans — ${route.title}`,
    description: route.desc,
    telephone: "+40769129126",
    areaServed: ["Romania", route.country],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground py-20">
          <div className="container max-w-4xl">
            <Link to="/" className="text-primary-foreground/70 text-sm hover:text-accent">← Înapoi</Link>
            <div className="text-6xl mt-4 mb-3">🇷🇴 <ArrowRight className="inline h-10 w-10" /> {route.flag}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{route.title}</h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl">{route.desc}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container max-w-4xl grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><MapPin className="text-accent" /> Plecări România</h2>
              <div className="flex flex-wrap gap-2">
                {CITIES.ro.map((c) => <span key={c} className="bg-secondary rounded-full px-3 py-1 text-sm">{c}</span>)}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Truck className="text-accent" /> Destinații {route.country}</h2>
              <div className="flex flex-wrap gap-2">
                {route.cities.map((c) => <span key={c} className="bg-secondary rounded-full px-3 py-1 text-sm">{c}</span>)}
              </div>
            </div>
          </div>
        </section>

        <BookingForm />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default RoutePage;