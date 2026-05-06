import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import BookingForm from "@/components/BookingForm";
import { PHONE_DISPLAY, PHONE, WHATSAPP } from "@/contexts/LangContext";
import { ArrowRight, CheckCircle2, Truck, Package, Car, Shield, Clock, Euro } from "lucide-react";

const Ghid = () => {
  useEffect(() => {
    document.title = "Ghid transport România → Germania, Austria, Olanda | BGD-Trans";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Ghid complet transport persoane, colete și auto pe platformă din România în Germania, Austria și Olanda. Sfaturi, prețuri orientative, FAQ.");
  }, []);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Ghid complet transport România → Germania, Austria, Olanda",
    author: { "@type": "Organization", name: "BGD-Trans" },
    publisher: { "@type": "Organization", name: "BGD-Trans" },
    datePublished: "2026-01-15",
    dateModified: new Date().toISOString().slice(0, 10),
    description: "Tot ce trebuie să știi despre transportul de persoane, colete și auto între România și Europa de Vest.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Cât durează transportul România - Germania?", acceptedAnswer: { "@type": "Answer", text: "În general 24-36 ore în funcție de orașul de plecare și destinație." } },
      { "@type": "Question", name: "Pot trimite un colet fără să călătoresc?", acceptedAnswer: { "@type": "Answer", text: "Da, oferim serviciu door-to-door pentru colete între România, Germania, Austria și Olanda." } },
      { "@type": "Question", name: "Transportați și autoturisme pe platformă?", acceptedAnswer: { "@type": "Answer", text: "Da, transport auto pe platformă în toată Europa, cu asigurare și prețuri corecte." } },
      { "@type": "Question", name: "Cum rezerv un loc?", acceptedAnswer: { "@type": "Answer", text: "Sună la +40 769 129 126, scrie pe WhatsApp sau completează formularul de pe site." } },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground py-16">
          <div className="container max-w-4xl">
            <Link to="/" className="text-primary-foreground/70 text-sm hover:text-accent">← Acasă</Link>
            <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-4">
              Ghid complet: transport România → Germania, Austria, Olanda
            </h1>
            <p className="text-lg text-primary-foreground/90">
              Tot ce trebuie să știi înainte să călătorești sau să trimiți un colet sau un autoturism în Europa de Vest.
            </p>
          </div>
        </section>

        <article className="container max-w-4xl py-16 prose-custom">
          <nav aria-label="Cuprins" className="bg-secondary/40 border border-border rounded-2xl p-6 mb-12">
            <h2 className="font-bold text-lg mb-3">Cuprins</h2>
            <ul className="space-y-1 text-sm">
              <li><a href="#persoane" className="text-accent hover:underline">1. Transport persoane România - Germania</a></li>
              <li><a href="#colete" className="text-accent hover:underline">2. Trimitere colete în Europa</a></li>
              <li><a href="#auto" className="text-accent hover:underline">3. Transport auto pe platformă</a></li>
              <li><a href="#preturi" className="text-accent hover:underline">4. Prețuri orientative</a></li>
              <li><a href="#sfaturi" className="text-accent hover:underline">5. Sfaturi pentru o călătorie reușită</a></li>
              <li><a href="#faq" className="text-accent hover:underline">6. Întrebări frecvente</a></li>
            </ul>
          </nav>

          <section id="persoane" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2"><Truck className="text-accent" /> 1. Transport persoane România - Germania</h2>
            <p className="text-muted-foreground mb-3">
              Curse regulate cu microbuze moderne 8+1 între cele mai mari orașe din România (București, Cluj-Napoca, Iași, Timișoara, Brașov, Sibiu) și destinații populare din Germania: München, Stuttgart, Frankfurt, Köln, Berlin, Hamburg.
            </p>
            <ul className="space-y-2 my-4">
              <li className="flex gap-2"><CheckCircle2 className="text-accent shrink-0 mt-1 h-5 w-5" /> Plecări săptămânale, tur-retur</li>
              <li className="flex gap-2"><CheckCircle2 className="text-accent shrink-0 mt-1 h-5 w-5" /> Mașini cu aer condiționat și WiFi</li>
              <li className="flex gap-2"><CheckCircle2 className="text-accent shrink-0 mt-1 h-5 w-5" /> Șoferi profesioniști, vorbitori de germană</li>
              <li className="flex gap-2"><CheckCircle2 className="text-accent shrink-0 mt-1 h-5 w-5" /> Preluare și livrare la adresă (door-to-door)</li>
            </ul>
          </section>

          <section id="colete" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2"><Package className="text-accent" /> 2. Trimitere colete în Europa</h2>
            <p className="text-muted-foreground mb-3">
              Transportăm colete de la documente și pachete mici până la mobilier și electrocasnice între România, Germania, Austria și Olanda. Coletele sunt preluate de la adresa expeditorului și livrate direct destinatarului.
            </p>
            <p className="text-muted-foreground">
              Timp de livrare estimat: <strong>24-72 de ore</strong> în funcție de rută. Toate coletele sunt sigilate, asigurate și pot fi urmărite.
            </p>
          </section>

          <section id="auto" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2"><Car className="text-accent" /> 3. Transport auto pe platformă</h2>
            <p className="text-muted-foreground">
              Mutarea unui autoturism între țări este complicată dacă o faci singur. Cu platforma noastră transportăm autoturisme cumpărate din Germania, Austria sau Olanda direct la adresa ta din România — sau invers. Mașina nu acumulează kilometri și nu este expusă riscurilor unei călătorii lungi.
            </p>
          </section>

          <section id="preturi" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2"><Euro className="text-accent" /> 4. Prețuri orientative</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-left p-3">Serviciu</th>
                    <th className="text-left p-3">Rută</th>
                    <th className="text-left p-3">Preț estimativ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border"><td className="p-3">Persoană</td><td className="p-3">RO → DE</td><td className="p-3">de la 110 €</td></tr>
                  <tr className="border-t border-border"><td className="p-3">Persoană</td><td className="p-3">RO → AT</td><td className="p-3">de la 90 €</td></tr>
                  <tr className="border-t border-border"><td className="p-3">Persoană</td><td className="p-3">RO → NL</td><td className="p-3">de la 140 €</td></tr>
                  <tr className="border-t border-border"><td className="p-3">Colet mic (până la 5 kg)</td><td className="p-3">RO ↔ DE/AT/NL</td><td className="p-3">de la 15 €</td></tr>
                  <tr className="border-t border-border"><td className="p-3">Auto pe platformă</td><td className="p-3">RO ↔ Europa</td><td className="p-3">la cerere</td></tr>
                </tbody>
              </table>
              <p className="text-xs text-muted-foreground mt-2">* Prețurile sunt orientative. Pentru ofertă exactă, sună la {PHONE_DISPLAY}.</p>
            </div>
          </section>

          <section id="sfaturi" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2"><Shield className="text-accent" /> 5. Sfaturi pentru o călătorie reușită</h2>
            <ul className="space-y-2">
              <li className="flex gap-2"><CheckCircle2 className="text-accent shrink-0 mt-1 h-5 w-5" /> Rezervă cu 3-7 zile în avans pentru cel mai bun preț.</li>
              <li className="flex gap-2"><CheckCircle2 className="text-accent shrink-0 mt-1 h-5 w-5" /> Ai actul de identitate valid și, dacă e nevoie, pașaportul.</li>
              <li className="flex gap-2"><CheckCircle2 className="text-accent shrink-0 mt-1 h-5 w-5" /> Pentru colete, etichetează clar conținutul și destinatarul.</li>
              <li className="flex gap-2"><CheckCircle2 className="text-accent shrink-0 mt-1 h-5 w-5" /> Confirmă adresa exactă de preluare și de livrare.</li>
              <li className="flex gap-2"><Clock className="text-accent shrink-0 mt-1 h-5 w-5" /> Ajunge la punctul de îmbarcare cu 15 minute înainte.</li>
            </ul>
          </section>

          <section id="faq" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">6. Întrebări frecvente</h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((q: any, i: number) => (
                <div key={i} className="border border-border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{q.name}</h3>
                  <p className="text-muted-foreground text-sm">{q.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Gata să rezervi?</h2>
            <p className="mb-6 text-primary-foreground/90">Sună acum sau scrie-ne pe WhatsApp pentru ofertă personalizată.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`tel:${PHONE}`} className="bg-accent text-accent-foreground font-semibold rounded-lg px-6 py-3 inline-flex items-center justify-center gap-2">{PHONE_DISPLAY}</a>
              <a href={WHATSAPP} target="_blank" rel="noopener" className="bg-whatsapp text-whatsapp-foreground font-semibold rounded-lg px-6 py-3 inline-flex items-center justify-center gap-2">WhatsApp <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </article>

        <BookingForm />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default Ghid;
