export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
  cover: string;
  keywords: string[];
  content: { type: "p" | "h2" | "h3" | "ul"; text?: string; items?: string[] }[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "transport-persoane-romania-germania",
    title: "Transport persoane România - Germania: ghid complet 2026",
    description:
      "Cum alegi cel mai bun transport de persoane din România în Germania: prețuri, durată, bagaje, documente și sfaturi pentru o călătorie sigură.",
    date: "2026-04-12",
    readingTime: "7 min",
    category: "Transport persoane",
    cover: "/og-image.jpg",
    keywords: [
      "transport persoane Romania Germania",
      "microbuz Romania Germania",
      "curse Romania Munchen",
      "transport Romania Stuttgart",
    ],
    content: [
      { type: "p", text: "Călătoria din România în Germania cu microbuzul rămâne una dintre cele mai populare opțiuni pentru românii care lucrează sau au familie în străinătate. Este mai ieftină decât avionul, mai confortabilă decât trenul și include preluare de la adresă." },
      { type: "h2", text: "Cât costă un bilet România - Germania?" },
      { type: "p", text: "Prețul mediu pentru un bilet dus pornește de la 110 € și poate ajunge la 180 € în funcție de oraș, sezon și cât de devreme rezervi. Pentru tur-retur poți obține reduceri de 10-15%." },
      { type: "h2", text: "Cât durează drumul?" },
      { type: "p", text: "Durata medie este de 24-30 ore din București până la München sau Stuttgart, cu pauze regulate la 4 ore pentru odihnă, masă și combustibil." },
      { type: "h2", text: "Ce documente îți trebuie?" },
      { type: "ul", items: [
        "Carte de identitate românească valabilă (pentru călătorii în UE)",
        "Pașaport valabil dacă tranzitezi țări non-UE",
        "Bilet sau confirmare rezervare de la operator",
      ]},
      { type: "h2", text: "Sfaturi pentru o călătorie reușită" },
      { type: "ul", items: [
        "Rezervă cu cel puțin 5-7 zile înainte pentru locuri și prețuri bune",
        "Confirmă adresa exactă de preluare și de livrare cu operatorul",
        "Ia cu tine apă, gustări și un încărcător auto pentru telefon",
        "Verifică limita de bagaje (de obicei 1 valiză + bagaj de mână)",
      ]},
      { type: "p", text: "BGD-Trans operează curse regulate România - Germania săptămânal cu microbuze 8+1 climatizate, șoferi vorbitori de germană și serviciu door-to-door. Sună acum pentru rezervare." },
    ],
  },
  {
    slug: "trimitere-colete-romania-austria-olanda",
    title: "Trimitere colete din România în Austria și Olanda: cât costă și cât durează",
    description:
      "Tot ce trebuie să știi pentru a trimite colete în Austria sau Olanda: tarife, ambalare corectă, timp de livrare și cum eviți problemele vamale.",
    date: "2026-03-28",
    readingTime: "6 min",
    category: "Colete",
    cover: "/og-image.jpg",
    keywords: [
      "trimitere colete Romania Austria",
      "transport colete Romania Olanda",
      "curier Romania Viena",
      "colet Amsterdam Bucuresti",
    ],
    content: [
      { type: "p", text: "Trimiterea coletelor din România în Austria sau Olanda este simplă dacă alegi un operator specializat pe ruta respectivă. Coletele ajung mai repede și mai ieftin decât prin curierii internaționali clasici." },
      { type: "h2", text: "Tarife orientative" },
      { type: "ul", items: [
        "Colet mic până la 5 kg: de la 15 €",
        "Colet mediu 5-20 kg: de la 30 €",
        "Colet mare 20-50 kg: de la 60 €",
        "Mobilier sau electrocasnice: la cerere",
      ]},
      { type: "h2", text: "Cât durează livrarea?" },
      { type: "p", text: "În medie, coletele ajung în 24-72 de ore în Austria și 48-96 de ore în Olanda, în funcție de oraș și ziua plecării." },
      { type: "h2", text: "Cum ambalezi corect un colet?" },
      { type: "ul", items: [
        "Folosește o cutie rezistentă, sigilată complet cu bandă",
        "Pune folie cu bule sau ziar pentru obiectele fragile",
        "Etichetează clar numele și telefonul expeditorului și destinatarului",
        "Nu trimite obiecte interzise: bani, bijuterii valoroase, lichide inflamabile",
      ]},
      { type: "p", text: "Cu BGD-Trans coletul tău este preluat de la adresă și livrat direct destinatarului în Austria sau Olanda, fără bătăi de cap." },
    ],
  },
  {
    slug: "transport-auto-platforma-germania-romania",
    title: "Transport auto pe platformă din Germania în România: cum funcționează",
    description:
      "Ai cumpărat o mașină din Germania? Iată cum aduci autoturismul pe platformă în România în siguranță, fără kilometri în plus și fără riscuri.",
    date: "2026-03-10",
    readingTime: "5 min",
    category: "Transport auto",
    cover: "/og-image.jpg",
    keywords: [
      "transport auto platforma Germania Romania",
      "adus masina din Germania",
      "transport auto Austria Romania",
      "platforma auto Olanda Romania",
    ],
    content: [
      { type: "p", text: "Tot mai mulți români cumpără mașini second-hand din Germania, Austria sau Olanda. În loc să faci drumul cu mașina pe roți proprii, transportul pe platformă protejează autoturismul și economisește timp." },
      { type: "h2", text: "Avantajele transportului pe platformă" },
      { type: "ul", items: [
        "Nu acumulezi kilometri în plus pe mașina nouă",
        "Eviți uzura componentelor și riscul de defecte pe drum",
        "Asigurare pe toată durata transportului",
        "Livrare direct la adresa ta din România",
      ]},
      { type: "h2", text: "Ce documente sunt necesare?" },
      { type: "ul", items: [
        "Factură de cumpărare a autoturismului",
        "Talonul (Fahrzeugbrief / Fahrzeugschein) sau echivalentul",
        "CMR (scrisoare de transport internațional)",
        "Copie act de identitate proprietar",
      ]},
      { type: "h2", text: "Cât costă?" },
      { type: "p", text: "Prețul depinde de ruta exactă, dimensiunea autoturismului și disponibilitatea platformei. Sună la +40 769 129 126 pentru o ofertă personalizată în câteva minute." },
    ],
  },
];

export const getPostBySlug = (slug: string) => BLOG_POSTS.find((p) => p.slug === slug);