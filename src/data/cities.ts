export const CITIES = {
  ro: [
    "Vaslui", "Bârlad", "Focșani", "Iași", "Galați", "Brăila", "Râmnicu Sărat",
    "Buzău", "Ploiești", "București", "Pitești", "Râmnicu Vâlcea", "Sibiu",
    "Alba Iulia", "Deva", "Lugoj", "Timișoara", "Arad",
  ],
  de: [
    "München", "Passau", "Regensburg", "Nürnberg", "Würzburg", "Frankfurt am Main",
    "Augsburg", "Ulm", "Stuttgart", "Karlsruhe", "Heilbronn", "Mannheim",
    "Koblenz", "Köln", "Dortmund", "Hannover",
  ],
  at: ["Wien", "Linz"],
  nl: [
    "Amsterdam", "Rotterdam", "Den Haag", "Utrecht", "Eindhoven", "Groningen",
    "Tilburg", "Almere", "Breda", "Nijmegen", "Apeldoorn", "Haarlem", "Arnhem",
    "Enschede", "Amersfoort", "Zaandam", "'s-Hertogenbosch", "Maastricht",
    "Leiden", "Dordrecht", "Zwolle", "Venlo", "Deventer", "Delft",
  ],
};

export const ALL_CITIES: { country: string; city: string }[] = [
  ...CITIES.ro.map((c) => ({ country: "🇷🇴 România", city: c })),
  ...CITIES.de.map((c) => ({ country: "🇩🇪 Germania", city: c })),
  ...CITIES.at.map((c) => ({ country: "🇦🇹 Austria", city: c })),
  ...CITIES.nl.map((c) => ({ country: "🇳🇱 Olanda", city: c })),
];