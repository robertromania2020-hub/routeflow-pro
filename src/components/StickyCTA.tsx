import { Phone, MessageCircle } from "lucide-react";
import { PHONE, WHATSAPP } from "@/contexts/LangContext";
import { trackEvent, trackConversion, CONVERSIONS } from "@/lib/gtag";

const StickyCTA = () => (
  <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-background/95 backdrop-blur border-t border-border p-2 flex gap-2 shadow-elegant">
    <a href={`tel:${PHONE}`} onClick={() => { trackEvent("call_click", { location: "sticky" }); trackConversion(CONVERSIONS.call); }} className="flex-1 bg-accent text-accent-foreground font-semibold rounded-lg py-3 flex items-center justify-center gap-2">
      <Phone className="h-4 w-4" /> Sună
    </a>
    <a href={WHATSAPP} target="_blank" rel="noopener" onClick={() => { trackEvent("whatsapp_click", { location: "sticky" }); trackConversion(CONVERSIONS.whatsapp); }} className="flex-1 bg-whatsapp text-whatsapp-foreground font-semibold rounded-lg py-3 flex items-center justify-center gap-2">
      <MessageCircle className="h-4 w-4" /> WhatsApp
    </a>
  </div>
);

export default StickyCTA;