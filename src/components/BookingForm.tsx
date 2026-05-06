import { useState } from "react";
import { z } from "zod";
import { useLang, PHONE, PHONE_DISPLAY, WHATSAPP } from "@/contexts/LangContext";
import { ALL_CITIES } from "@/data/cities";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Phone, MessageCircle, Send } from "lucide-react";
import { trackConversion, trackEvent, CONVERSIONS } from "@/lib/gtag";

const schema = z.object({
  customer_name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(30),
  departure_city: z.string().min(1),
  destination_city: z.string().min(1),
  transport_type: z.enum(["persons", "parcels", "auto"]),
  message: z.string().max(1000).optional(),
});

const BookingForm = () => {
  const { t, lang } = useLang();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    departure_city: "",
    destination_city: "",
    transport_type: "persons" as "persons" | "parcels" | "auto",
    message: "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message || t.booking.error);
      return;
    }
    setLoading(true);
    const typeLabel = { persons: t.booking.typePersons, parcels: t.booking.typeParcels, auto: t.booking.typeAuto }[form.transport_type];
    const msgText = `🚐 BGD-Trans — ${t.booking.title}\n\n👤 ${form.customer_name}\n📞 ${form.phone}\n📍 ${form.departure_city} → ${form.destination_city}\n📦 ${typeLabel}${form.message ? `\n💬 ${form.message}` : ""}`;
    const waUrl = `https://wa.me/40769129126?text=${encodeURIComponent(msgText)}`;

    try {
      const { error } = await supabase.from("bookings").insert({
        customer_name: parsed.data.customer_name,
        phone: parsed.data.phone,
        departure_city: parsed.data.departure_city,
        destination_city: parsed.data.destination_city,
        transport_type: parsed.data.transport_type,
        message: parsed.data.message,
        language: lang,
      });
      if (error) console.error("booking insert error:", error);
    } catch (err) {
      console.error("booking insert exception:", err);
    }
    setLoading(false);
    toast.success(t.booking.success);
    trackEvent("booking_submit", { transport_type: form.transport_type });
    trackConversion(CONVERSIONS.booking, { value: 1.0, currency: "RON", transport_type: form.transport_type });

    // Open WhatsApp — try new tab first, fallback to same tab
    const win = window.open(waUrl, "_blank");
    if (!win) window.location.href = waUrl;
  };

  return (
    <section id="booking" className="py-20 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
      <div className="container max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.booking.title}</h2>
          <p className="text-primary-foreground/80 text-lg">{t.booking.subtitle}</p>
        </div>

        <form onSubmit={onSubmit} className="bg-card text-card-foreground rounded-2xl p-6 md:p-8 shadow-elegant space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>{t.booking.name}</Label>
              <Input value={form.customer_name} onChange={(e) => update("customer_name", e.target.value)} required maxLength={100} />
            </div>
            <div>
              <Label>{t.booking.phone}</Label>
              <Input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} required maxLength={30} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>{t.booking.from}</Label>
              <Select value={form.departure_city} onValueChange={(v) => update("departure_city", v)}>
                <SelectTrigger><SelectValue placeholder={t.booking.selectCity} /></SelectTrigger>
                <SelectContent className="max-h-72">
                  {ALL_CITIES.map(({ country, city }) => (
                    <SelectItem key={`${country}-${city}`} value={`${city}, ${country.replace(/^\S+\s/, "")}`}>{country.split(" ")[0]} {city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t.booking.to}</Label>
              <Select value={form.destination_city} onValueChange={(v) => update("destination_city", v)}>
                <SelectTrigger><SelectValue placeholder={t.booking.selectCity} /></SelectTrigger>
                <SelectContent className="max-h-72">
                  {ALL_CITIES.map(({ country, city }) => (
                    <SelectItem key={`${country}-${city}-d`} value={`${city}, ${country.replace(/^\S+\s/, "")}`}>{country.split(" ")[0]} {city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>{t.booking.type}</Label>
            <Select value={form.transport_type} onValueChange={(v) => update("transport_type", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="persons">👥 {t.booking.typePersons}</SelectItem>
                <SelectItem value="parcels">📦 {t.booking.typeParcels}</SelectItem>
                <SelectItem value="auto">🚗 {t.booking.typeAuto}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>{t.booking.message}</Label>
            <Textarea value={form.message} onChange={(e) => update("message", e.target.value)} maxLength={1000} rows={3} />
          </div>

          <Button type="submit" disabled={loading} size="lg" className="w-full bg-accent hover:bg-accent-glow text-accent-foreground h-14 text-base shadow-accent">
            <Send className="mr-2 h-5 w-5" /> {loading ? "..." : t.booking.submit}
          </Button>
        </form>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center text-primary-foreground/90">
          <a href={`tel:${PHONE}`} onClick={() => { trackEvent("call_click", { location: "booking" }); trackConversion(CONVERSIONS.call); }} className="inline-flex items-center gap-2 hover:text-accent transition-smooth">
            <Phone className="h-5 w-5" /> {t.booking.orCall} <strong>{PHONE_DISPLAY}</strong>
          </a>
          <span className="hidden sm:inline">•</span>
          <a href={WHATSAPP} target="_blank" rel="noopener" onClick={() => { trackEvent("whatsapp_click", { location: "booking" }); trackConversion(CONVERSIONS.whatsapp); }} className="inline-flex items-center gap-2 hover:text-accent transition-smooth">
            <MessageCircle className="h-5 w-5" /> {t.booking.whatsappQuick}
          </a>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;