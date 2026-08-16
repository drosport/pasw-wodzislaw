import type { MetadataRoute } from "next";
import { STRONA } from "@/lib/dane";

const SCIEZKI = [
  { sciezka: "", priorytet: 1 },
  { sciezka: "/zajecia", priorytet: 0.9 },
  { sciezka: "/cennik", priorytet: 0.9 },
  { sciezka: "/zapisy", priorytet: 0.9 },
  { sciezka: "/platnosci", priorytet: 0.7 },
  { sciezka: "/kontakt", priorytet: 0.7 },
  { sciezka: "/regulamin", priorytet: 0.4 },
  { sciezka: "/polityka-prywatnosci", priorytet: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return SCIEZKI.map(({ sciezka, priorytet }) => ({
    url: `${STRONA.adres}${sciezka}`,
    changeFrequency: "monthly",
    priority: priorytet,
  }));
}
