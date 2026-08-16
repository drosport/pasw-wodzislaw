import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import Naglowek from "@/components/Naglowek";
import Stopka from "@/components/Stopka";
import { MARKA, SPOLKA, STRONA } from "@/lib/dane";
import "./globals.css";
import "./uklad.css";

/**
 * Jedna rodzina na całą stronę. Archivo jest fontem zmiennoosiowym, więc
 * wszystkie wagi mieszczą się w tym samym pliku. Polskie znaki diakrytyczne
 * leżą w podzbiorze latin-ext, dlatego oba podzbiory są potrzebne.
 */
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(STRONA.adres),
  title: {
    default: `${MARKA.nazwaPelna}`,
    template: `%s | ${MARKA.skrot} ${MARKA.sekcja.replace("Sekcja ", "")}`,
  },
  description:
    "Zajęcia sztuk walki dla dzieci, młodzieży i osób dorosłych w Wodzisławiu Śląskim. Harmonogram, cennik, zapisy i informacje o płatnościach.",
  applicationName: MARKA.nazwaPelna,
  authors: [{ name: SPOLKA.nazwaSkrocona }],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: MARKA.nazwaPelna,
    title: MARKA.nazwaPelna,
    description:
      "Zajęcia sztuk walki dla dzieci, młodzieży i osób dorosłych w Wodzisławiu Śląskim.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/pasw-logo.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={archivo.variable}>
      <body>
        <a href="#tresc" className="pomin-do-tresci">
          Przejdź do treści
        </a>
        <Naglowek />
        <main id="tresc">{children}</main>
        <Stopka />
      </body>
    </html>
  );
}
