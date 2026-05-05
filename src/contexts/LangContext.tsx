import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, Lang } from "@/data/i18n";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: any };
const LangContext = createContext<Ctx | undefined>(undefined);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang) : null;
    return stored && ["ro", "en", "de"].includes(stored) ? stored : "ro";
  });
  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);
  return (
    <LangContext.Provider value={{ lang, setLang: setLangState, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang outside provider");
  return ctx;
};

export const PHONE = "+40769129126";
export const PHONE_DISPLAY = "+40 769 129 126";
export const WHATSAPP = "https://wa.me/40769129126";