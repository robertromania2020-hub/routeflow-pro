import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Routes from "@/components/Routes";
import BookingForm from "@/components/BookingForm";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";

const schema = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: "BGD-Trans",
  telephone: "+40769129126",
  areaServed: ["Romania", "Germany", "Austria", "Netherlands"],
  description: "Transport persoane, colete și auto pe platformă România – Germania – Austria – Olanda.",
};

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <Header />
    <main className="flex-1">
      <Hero />
      <Services />
      <Routes />
      <BookingForm />
      <WhyUs />
      <Testimonials />
    </main>
    <Footer />
    <StickyCTA />
  </div>
);

export default Index;
