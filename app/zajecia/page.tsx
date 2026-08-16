import type { Metadata } from "next";
import Link from "next/link";
import NaglowekStrony from "@/components/NaglowekStrony";
import PasWezwania from "@/components/PasWezwania";
import { Wartosc } from "@/components/Wartosc";
import { AKADEMIA, DYSCYPLINY, GRUPY, INSTRUKTORZY, KONTAKT } from "@/lib/dane";

export const metadata: Metadata = {
  title: "Zajęcia i harmonogram",
  description:
    "Grupy wiekowe, terminy treningów, miejsce zajęć i program szkoleniowy sekcji Wodzisław Śląski.",
};

export default function Zajecia() {
  return (
    <>
      <NaglowekStrony
        okruszek="Zajęcia"
        tytul="Zajęcia, grupy i harmonogram"
        opis="Treningi odbywają się w stałych terminach przez cały rok szkolny. Grupy dobierane są według wieku i stażu, a nowe osoby mogą dołączyć w dowolnym momencie."
      />

      {/* Program --------------------------------------------------------- */}
      <section className="sekcja">
        <div className="kontener">
          <div className="naglowek-sekcji">
            <span className="etykieta">Program</span>
            <h2>Zakres szkolenia</h2>
            <p className="wprowadzenie">
              Program Akademii nie jest pojedynczym stylem. Kung-fu, jiu-jitsu
              i systema tworzą jeden system, zarejestrowany w{" "}
              {AKADEMIA.rokRejestracjiStylu} roku pod nazwą{" "}
              {AKADEMIA.nazwaStylu}. Zakres i intensywność zajęć różnią się
              między grupami, natomiast struktura treningu pozostaje ta sama,
              od rozgrzewki i pracy nad techniką po część końcową.
            </p>
          </div>

          <div className="siatka-3">
            {DYSCYPLINY.map((dyscyplina, indeks) => (
              <div className="kafel" key={dyscyplina.nazwa}>
                <span className="kafel-numer">
                  {String(indeks + 1).padStart(2, "0")}
                </span>
                <h3>{dyscyplina.nazwa}</h3>
                <p>{dyscyplina.opis}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grupy ------------------------------------------------------------ */}
      <section className="sekcja sekcja-alt">
        <div className="kontener">
          <div className="naglowek-sekcji">
            <span className="etykieta">Grupy wiekowe</span>
            <h2>Terminy treningów</h2>
            <p className="wprowadzenie">
              Treningi odbywają się w środy i piątki, w dwóch grupach.
              Uczestnik wybiera wariant z jednym albo z dwoma treningami
              w tygodniu i może go zmienić od kolejnego okresu
              rozliczeniowego.
            </p>
          </div>

          <div style={{ display: "grid", gap: "1px", background: "var(--linia)", border: "1px solid var(--linia)" }}>
            {GRUPY.map((grupa) => (
              <div
                key={grupa.nazwa}
                style={{ background: "var(--bialy)", padding: "38px 34px" }}
              >
                <div className="uklad-tresci" style={{ gap: "48px" }}>
                  <div>
                    <h3>
                      {grupa.nazwa}, {grupa.wiek}
                    </h3>
                    <p className="tekst-drugi" style={{ marginBottom: 0 }}>
                      {grupa.opis}
                    </p>
                  </div>
                  <div>
                    <ul className="lista-linie">
                      {grupa.terminy.map((termin, indeks) => (
                        <li key={indeks}>
                          <span className="etykieta-wiersza">Termin</span>
                          <span className="wartosc-wiersza">
                            <Wartosc
                              wartosc={termin}
                              opis="termin do uzupełnienia"
                            />
                          </span>
                        </li>
                      ))}
                      <li>
                        <span className="etykieta-wiersza">Miejsce</span>
                        <span className="wartosc-wiersza">
                          <Wartosc
                            wartosc={KONTAKT.salaNazwa}
                            opis="sala do uzupełnienia"
                          />
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="przypis-tabeli" style={{ marginTop: "24px" }}>
            Harmonogram obowiązuje w roku szkolnym. Zmiany terminów, wynikające
            na przykład z dni wolnych od zajęć szkolnych, ogłaszamy z
            wyprzedzeniem bezpośrednio uczestnikom.
          </p>
        </div>
      </section>

      {/* Prowadzący -------------------------------------------------------- */}
      <section className="sekcja">
        <div className="kontener">
          <div className="uklad-tresci">
            <div>
              <span className="etykieta">Kadra</span>
              <h2>Prowadzący zajęcia</h2>
              <p>
                Zajęcia w sekcji Wodzisław Śląski prowadzi instruktor
                z uprawnieniami do prowadzenia zajęć sportowych, działający
                w ramach Pszczyńskiej Akademii Sztuk Walki. Akademia szkoli
                własną kadrę i prowadzi system stopni od{" "}
                {AKADEMIA.rokZalozenia} roku.
              </p>

              <div style={{ marginTop: "34px", display: "grid", gap: "1px", background: "var(--linia)", border: "1px solid var(--linia)" }}>
                {INSTRUKTORZY.map((instruktor, indeks) => (
                  <div
                    key={indeks}
                    style={{ background: "var(--tlo)", padding: "30px 32px" }}
                  >
                    <h3 style={{ marginBottom: "6px" }}>
                      <Wartosc
                        wartosc={instruktor.imie}
                        opis="imię i nazwisko do uzupełnienia"
                      />
                    </h3>
                    <p
                      className="tekst-drugi"
                      style={{ fontSize: "0.93rem", marginBottom: "16px" }}
                    >
                      {instruktor.funkcja}
                    </p>
                    <ul className="lista-kreski" style={{ fontSize: "0.95rem" }}>
                      {instruktor.kwalifikacje.map((kwalifikacja, i) => (
                        <li key={i}>
                          <Wartosc
                            wartosc={kwalifikacja}
                            opis="kwalifikacje do uzupełnienia"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="blok-danych">
                <h3>Na pierwszy trening</h3>
                <ul className="lista-kreski" style={{ fontSize: "0.95rem" }}>
                  <li>Strój sportowy i obuwie zmienne albo skarpety antypoślizgowe.</li>
                  <li>Butelka wody.</li>
                  <li>
                    Uczestnik niepełnoletni przychodzi z opiekunem prawnym,
                    który podpisuje zgodę na uczestnictwo.
                  </li>
                  <li>
                    Strój treningowy oraz sprzęt ochronny nie są potrzebne na
                    początek, kompletuje się je stopniowo.
                  </li>
                </ul>
              </div>

              <div className="blok-danych" style={{ marginTop: "24px" }}>
                <h3>Miejsce zajęć</h3>
                <p className="tekst-drugi" style={{ fontSize: "0.95rem" }}>
                  <Wartosc
                    wartosc={KONTAKT.salaNazwa}
                    opis="nazwa obiektu do uzupełnienia"
                  />
                  <br />
                  <Wartosc
                    wartosc={KONTAKT.salaUlica}
                    opis="ulica do uzupełnienia"
                  />
                  <br />
                  {KONTAKT.salaKod} {KONTAKT.salaMiasto}
                </p>
                <p style={{ marginTop: "22px" }}>
                  <Link href="/kontakt" className="link-dalej">
                    Dojazd
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PasWezwania
        tytul="Dołącz do wybranej grupy"
        tresc="Wypełnij formularz zgłoszeniowy i podaj grupę wiekową, którą jesteś zainteresowany. Odezwiemy się i ustalimy termin pierwszych zajęć."
        przyciskDrugi={{ etykieta: "Cennik", href: "/cennik" }}
      />
    </>
  );
}
