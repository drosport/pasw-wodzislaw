import type { Metadata } from "next";
import Link from "next/link";
import NaglowekStrony from "@/components/NaglowekStrony";
import PasWezwania from "@/components/PasWezwania";
import { Wartosc } from "@/components/Wartosc";
import { AKADEMIA, GRUPY, INSTRUKTORZY, KONTAKT } from "@/lib/dane";

export const metadata: Metadata = {
  title: "Treningi",
  description:
    "Terminy i miejsce treningów sekcji Wodzisław Śląski. Dwie grupy, środy i piątki, Szkoła Podstawowa nr 3.",
};

export default function Treningi() {
  const adresDoMapy = `${KONTAKT.salaUlica}, ${KONTAKT.salaKod} ${KONTAKT.salaMiasto}`;

  return (
    <>
      <NaglowekStrony
        okruszek="Treningi"
        tytul="Treningi"
        opis="Zajęcia odbywają się w stałych terminach przez cały rok szkolny. Do grupy można dołączyć w dowolnym momencie."
      />

      <section className="sekcja">
        <div className="kontener">
          <div className="uklad-tresci">
            <div>
              <span className="etykieta">Terminy</span>
              <h2>Dwie grupy, środy i piątki</h2>

              <div
                style={{
                  marginTop: "34px",
                  display: "grid",
                  gap: "1px",
                  background: "var(--linia)",
                  border: "1px solid var(--linia)",
                }}
              >
                {GRUPY.map((grupa) => (
                  <div
                    key={grupa.nazwa}
                    style={{ background: "var(--tlo)", padding: "30px 32px" }}
                  >
                    <h3>
                      {grupa.nazwa}, {grupa.wiek}
                    </h3>
                    <ul className="lista-linie" style={{ marginTop: "18px" }}>
                      <li>
                        <span className="etykieta-wiersza">Dni</span>
                        <span className="wartosc-wiersza">{grupa.dni}</span>
                      </li>
                      <li>
                        <span className="etykieta-wiersza">Godziny</span>
                        <span className="wartosc-wiersza">{grupa.godziny}</span>
                      </li>
                      <li>
                        <span className="etykieta-wiersza">Miejsce</span>
                        <span className="wartosc-wiersza">
                          {KONTAKT.salaNazwa}
                        </span>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>

              <p className="przypis-tabeli" style={{ marginTop: "24px" }}>
                Zmiany terminów, wynikające na przykład z dni wolnych od zajęć
                szkolnych, ogłaszamy z wyprzedzeniem bezpośrednio uczestnikom.
              </p>

              <p style={{ marginTop: "30px" }}>
                <a
                  href={AKADEMIA.strona}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-dalej"
                >
                  O programie szkolenia na {AKADEMIA.stronaEtykieta}
                </a>
              </p>
            </div>

            <div>
              <div className="blok-danych">
                <h3>Miejsce zajęć</h3>
                <p className="tekst-drugi" style={{ fontSize: "0.95rem" }}>
                  {KONTAKT.salaNazwa}
                  <br />
                  {KONTAKT.salaUlica}
                  <br />
                  {KONTAKT.salaKod} {KONTAKT.salaMiasto}
                </p>
                <p style={{ marginTop: "16px" }}>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      adresDoMapy
                    )}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Otwórz w mapach
                  </a>
                </p>
              </div>

              <div className="blok-danych" style={{ marginTop: "24px" }}>
                <h3>Na pierwszy trening</h3>
                <ul className="lista-kreski" style={{ fontSize: "0.95rem" }}>
                  <li>Strój sportowy i obuwie zmienne albo skarpety antypoślizgowe.</li>
                  <li>Butelka wody.</li>
                  <li>
                    Uczestnik niepełnoletni przychodzi z opiekunem prawnym,
                    który podpisuje zgodę na uczestnictwo i oświadczenie o braku
                    przeciwwskazań zdrowotnych.
                  </li>
                  <li>
                    Strój treningowy i sprzęt ochronny nie są potrzebne na
                    początek.
                  </li>
                </ul>
              </div>

              <div className="blok-danych" style={{ marginTop: "24px" }}>
                <h3>Prowadzący</h3>
                {INSTRUKTORZY.map((instruktor, indeks) => (
                  <div key={indeks}>
                    <p style={{ fontWeight: 600, marginBottom: "4px" }}>
                      <Wartosc
                        wartosc={instruktor.imie}
                        opis="imię i nazwisko do uzupełnienia"
                      />
                    </p>
                    <p className="tekst-drugi" style={{ fontSize: "0.92rem" }}>
                      {instruktor.funkcja}
                    </p>
                  </div>
                ))}
                <p style={{ marginTop: "20px" }}>
                  <Link href="/kontakt" className="link-dalej">
                    Kontakt
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PasWezwania
        tytul="Zapisz się i opłać zajęcia"
        tresc="Wybierz formę rozliczenia, podaj dane uczestnika i zapłać. Podsumowanie z pełną kwotą zobaczysz przed płatnością."
        przyciskGlowny={{ etykieta: "Zapisz się i zapłać", href: "/zapisy" }}
        przyciskDrugi={{ etykieta: "Cennik", href: "/cennik" }}
      />
    </>
  );
}
