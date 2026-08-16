import Link from "next/link";
import {
  ADRES_SPOLKI_JEDNA_LINIA,
  KONTAKT,
  MARKA,
  NAWIGACJA,
  NAWIGACJA_DOKUMENTY,
  OPERATOR_PLATNOSCI,
  SPOLKA,
  brakuje,
} from "@/lib/dane";
import { Wartosc } from "./Wartosc";

export default function Stopka() {
  const rok = 2026;

  return (
    <footer className="stopka">
      <div className="kontener">
        <div className="stopka-glowna">
          <div>
            <div className="stopka-znak">
              <img
                className="godlo-odwrocone"
                src="/pasw-logo.svg"
                alt=""
                width={54}
                height={54}
                loading="lazy"
                decoding="async"
                aria-hidden="true"
              />
              <span>
                <span className="stopka-znak-nazwa">
                  Pszczyńska Akademia
                  <br />
                  Sztuk Walki
                </span>
                <span className="stopka-znak-sekcja">{MARKA.sekcja}</span>
              </span>
            </div>
            <p className="stopka-opis">
              Zajęcia sztuk walki dla dzieci, młodzieży i osób dorosłych,
              prowadzone w Wodzisławiu Śląskim. Sekcja działa w ramach
              Pszczyńskiej Akademii Sztuk Walki.
            </p>
          </div>

          <div>
            <h2>Strona</h2>
            <ul>
              <li>
                <Link href="/">Strona główna</Link>
              </li>
              {NAWIGACJA.map((pozycja) => (
                <li key={pozycja.href}>
                  <Link href={pozycja.href}>{pozycja.etykieta}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Dokumenty</h2>
            <ul>
              {NAWIGACJA_DOKUMENTY.map((pozycja) => (
                <li key={pozycja.href}>
                  <Link href={pozycja.href}>{pozycja.etykieta}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Kontakt</h2>
            <ul>
              <li>
                {brakuje(KONTAKT.telefon) ? (
                  <Wartosc wartosc={KONTAKT.telefon} opis="telefon do uzupełnienia" />
                ) : (
                  <a href={`tel:${KONTAKT.telefonHref}`}>{KONTAKT.telefon}</a>
                )}
              </li>
              <li>
                {brakuje(KONTAKT.email) ? (
                  <Wartosc wartosc={KONTAKT.email} opis="adres e-mail do uzupełnienia" />
                ) : (
                  <a href={`mailto:${KONTAKT.email}`}>{KONTAKT.email}</a>
                )}
              </li>
              <li>
                <Wartosc wartosc={KONTAKT.salaUlica} opis="adres sali do uzupełnienia" />
                <br />
                {KONTAKT.salaKod} {KONTAKT.salaMiasto}
              </li>
            </ul>
          </div>
        </div>

        <div className="stopka-podmiot">
          <h2 className="stopka-podmiot-tytul">Podmiot prowadzący</h2>
          <div className="stopka-podmiot-tresc">
            <div>
              <p style={{ color: "var(--tekst-na-ciemnym)", marginBottom: "14px" }}>
                {SPOLKA.nazwaPelna}
                <br />
                {ADRES_SPOLKI_JEDNA_LINIA}
              </p>
              <dl className="stopka-rejestr">
                <div>
                  <dt>KRS</dt>
                  <dd>{SPOLKA.krs}</dd>
                </div>
                <div>
                  <dt>NIP</dt>
                  <dd>{SPOLKA.nip}</dd>
                </div>
                <div>
                  <dt>REGON</dt>
                  <dd>{SPOLKA.regon}</dd>
                </div>
                <div>
                  <dt>Kapitał zakładowy</dt>
                  <dd>
                    <Wartosc wartosc={SPOLKA.kapitalZakladowy} />
                  </dd>
                </div>
              </dl>
            </div>
            <p className="stopka-nota">
              {MARKA.nazwaPelna} jest nazwą handlową sekcji treningowej.
              Usługodawcą, sprzedawcą i stroną umowy zawieranej przez tę stronę
              jest {SPOLKA.nazwaSkrocona} Operatorem płatności jest{" "}
              {OPERATOR_PLATNOSCI.nazwa}, właściciel serwisu{" "}
              {OPERATOR_PLATNOSCI.marka}.
            </p>
          </div>
        </div>

        <div className="stopka-dol">
          <div>
            {rok} {SPOLKA.nazwaSkrocona} Wszelkie prawa zastrzeżone.
          </div>
          <div className="stopka-dol-linki">
            <Link href="/regulamin">Regulamin</Link>
            <Link href="/polityka-prywatnosci">Polityka prywatności</Link>
            <Link href="/platnosci">Płatności</Link>
            <Link href="/kontakt">Kontakt</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
