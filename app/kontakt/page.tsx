import type { Metadata } from "next";
import FormularzKontaktowy from "@/components/FormularzKontaktowy";
import NaglowekStrony from "@/components/NaglowekStrony";
import { Wartosc } from "@/components/Wartosc";
import {
  ADRES_SPOLKI_JEDNA_LINIA,
  KONTAKT,
  MARKA,
  SPOLKA,
  brakuje,
} from "@/lib/dane";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Adres sali treningowej w Wodzisławiu Śląskim, telefon, adres e-mail, formularz kontaktowy oraz pełne dane rejestrowe DRO SPORT sp. z o.o.",
};

export default function Kontakt() {
  const adresDoMapy = brakuje(KONTAKT.salaUlica)
    ? null
    : `${KONTAKT.salaUlica}, ${KONTAKT.salaKod} ${KONTAKT.salaMiasto}`;

  return (
    <>
      <NaglowekStrony
        okruszek="Kontakt"
        tytul="Kontakt"
        opis="Zadzwoń, napisz albo skorzystaj z formularza. Odpowiadamy w ciągu dwóch dni roboczych."
      />

      {/* Dane kontaktowe -------------------------------------------------- */}
      <section className="sekcja">
        <div className="kontener">
          <div className="siatka-3">
            <div className="kafel">
              <span className="kafel-numer">Telefon</span>
              <h3>
                {brakuje(KONTAKT.telefon) ? (
                  <Wartosc wartosc={KONTAKT.telefon} opis="numer do uzupełnienia" />
                ) : (
                  <a href={`tel:${KONTAKT.telefonHref}`}>{KONTAKT.telefon}</a>
                )}
              </h3>
              <p>{KONTAKT.godzinyKontaktu}</p>
            </div>

            <div className="kafel">
              <span className="kafel-numer">Poczta elektroniczna</span>
              <h3 style={{ wordBreak: "break-word" }}>
                {brakuje(KONTAKT.email) ? (
                  <Wartosc wartosc={KONTAKT.email} opis="adres do uzupełnienia" />
                ) : (
                  <a href={`mailto:${KONTAKT.email}`}>{KONTAKT.email}</a>
                )}
              </h3>
              <p>
                Sprawy dotyczące zapisów, harmonogramu, płatności i reklamacji.
              </p>
            </div>

            <div className="kafel">
              <span className="kafel-numer">Sala treningowa</span>
              <h3>
                <Wartosc
                  wartosc={KONTAKT.salaNazwa}
                  opis="nazwa obiektu do uzupełnienia"
                />
              </h3>
              <p>
                <Wartosc
                  wartosc={KONTAKT.salaUlica}
                  opis="ulica do uzupełnienia"
                />
                <br />
                {KONTAKT.salaKod} {KONTAKT.salaMiasto}
              </p>
              {adresDoMapy && (
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
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Dojazd i dane spółki ---------------------------------------------- */}
      <section className="sekcja sekcja-alt">
        <div className="kontener">
          <div className="uklad-tresci">
            <div>
              <span className="etykieta">Dojazd</span>
              <h2>Jak dotrzeć na zajęcia</h2>
              <p className="wprowadzenie">
                Trenujemy w sali gimnastycznej {KONTAKT.salaNazwa} przy ulicy
                26 Marca 9. Jeżeli przychodzisz pierwszy raz, zadzwoń, powiemy
                którym wejściem najłatwiej trafić na salę.
              </p>
              <p style={{ marginTop: "26px" }}>
                Prosimy o przybycie na pierwszy trening kilkanaście minut przed
                jego rozpoczęciem. Uczestnicy niepełnoletni przychodzą
                z opiekunem prawnym, który podpisuje zgodę na uczestnictwo
                w zajęciach.
              </p>
            </div>

            <div className="blok-danych">
              <h3>Dane rejestrowe usługodawcy</h3>
              <dl className="lista-danych">
                <dt>Nazwa</dt>
                <dd>{SPOLKA.nazwaPelna}</dd>
                <dt>Adres siedziby</dt>
                <dd>{ADRES_SPOLKI_JEDNA_LINIA}</dd>
                <dt>KRS</dt>
                <dd>{SPOLKA.krs}</dd>
                <dt>Sąd rejestrowy</dt>
                <dd>
                  <Wartosc wartosc={SPOLKA.sadRejestrowy} />
                </dd>
                <dt>NIP</dt>
                <dd>{SPOLKA.nip}</dd>
                <dt>REGON</dt>
                <dd>{SPOLKA.regon}</dd>
                <dt>Kapitał zakładowy</dt>
                <dd>
                  <Wartosc wartosc={SPOLKA.kapitalZakladowy} />
                </dd>
              </dl>
              <p
                className="przypis-tabeli"
                style={{
                  marginTop: "24px",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--linia)",
                }}
              >
                {MARKA.nazwaPelna} jest nazwą handlową sekcji treningowej.
                Usługodawcą i sprzedawcą jest {SPOLKA.nazwaSkrocona}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formularz ---------------------------------------------------------- */}
      <section className="sekcja">
        <div className="kontener">
          <div className="uklad-tresci">
            <div>
              <span className="etykieta">Formularz kontaktowy</span>
              <h2>Napisz do nas</h2>
              <p className="wprowadzenie" style={{ marginBottom: "44px" }}>
                Jeżeli chcesz zapisać się na zajęcia i od razu je opłacić,
                skorzystaj z podstrony zapisu. Ten formularz służy do
                pozostałych spraw.
              </p>
              <FormularzKontaktowy />
            </div>

            <div>
              <div className="blok-danych">
                <h3>Reklamacje</h3>
                <p className="tekst-drugi" style={{ fontSize: "0.95rem" }}>
                  Reklamację można złożyć wiadomością e-mail albo pisemnie na
                  adres siedziby spółki. Rozpatrujemy ją w terminie 14 dni od
                  otrzymania i informujemy o wyniku tą samą drogą, którą została
                  złożona.
                </p>
              </div>

              <div className="blok-danych" style={{ marginTop: "24px" }}>
                <h3>Sprawy dotyczące danych osobowych</h3>
                <p className="tekst-drugi" style={{ fontSize: "0.95rem" }}>
                  Wnioski o dostęp do danych, ich sprostowanie, usunięcie albo
                  ograniczenie przetwarzania kieruj na adres{" "}
                  {brakuje(KONTAKT.emailDaneOsobowe) ? (
                    <Wartosc
                      wartosc={KONTAKT.emailDaneOsobowe}
                      opis="adres do spraw danych osobowych do uzupełnienia"
                    />
                  ) : (
                    <a href={`mailto:${KONTAKT.emailDaneOsobowe}`}>
                      {KONTAKT.emailDaneOsobowe}
                    </a>
                  )}{" "}
                  albo pisemnie na adres siedziby.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
