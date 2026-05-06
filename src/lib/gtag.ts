// Google Ads / gtag helper
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const GOOGLE_ADS_ID = "AW-18141421830";

// Replace with real conversion labels from Google Ads when available
// Format: AW-18141421830/XXXXXXXXX
export const CONVERSIONS = {
  booking: `${GOOGLE_ADS_ID}/6wOHCLuFsKgcEIbCwMpD`,
  call: `${GOOGLE_ADS_ID}`,
  whatsapp: `${GOOGLE_ADS_ID}`,
};

export const trackEvent = (event: string, params: Record<string, any> = {}) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
};

export const trackConversion = (sendTo: string, params: Record<string, any> = {}) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", { send_to: sendTo, ...params });
};
