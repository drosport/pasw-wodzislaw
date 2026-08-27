import type { Metadata } from "next";
import Link from "next/link";
import NaglowekStrony from "@/components/NaglowekStrony";
import Zapisy from "@/components/Zapisy";
import {
  KONTAKT,
  OPERATOR_PLATNOSCI,
  PLATNOSCI,
  SPOLKA,
  WPISOWE,
  zl,
} from "@/lib/dane";

export const metadata: Metadata = {
  title: "Zapis i płatność",
  description:
    "Wybierz formę rozliczenia, podaj dane uczestnika i opłać zajęcia. Płatność obsługuje PayPro S.A., operator serwisu Przelewy24.",
};

export default function StronaZapisow() {
  return (
    <>
      <NaglowekStrony
        okruszek="Zapis i płatność"
        tytul="Zapis i płatność"
        opis="Trzy kroki. Zanim zapłacisz, zobaczysz pełne podsumowanie z dokładną kwotą i zasadami obciążeń."
      />

      <section className="sekcja">
        <div className="kontener">
          <div className="uklad-tresci">
            <div>
              <Zapisy />
            </div>

            <div>
              <div className="blok-danych">
                <h3>Sprzedawca</h3>
                <p className="tekst-drugi" style={{ fontSize: "0.93rem" }}>
                  {SPOLKA.nazwaPelna}
                  <br />
                  {SPOLKA.ulica}, {SPOLKA.kodPocztowy} {SPOLKA.miasto}
                  <br />
                  NIP {SPOLKA.nip}, KRS {SPOLKA.krs}
                </p>
              </div>

              <div className="blok-danych" style={{ marginTop: "24px" }}>
                <h3>Operator płatności</h3>
                <p className="tekst-drugi" style={{ fontSize: "0.93rem" }}>
                  {OPERATOR_PLATNOSCI.nazwa}, właściciel serwisu{" "}
                  {OPERATOR_PLATNOSCI.marka}, {OPERATOR_PLATNOSCI.ulica},{" "}
                  {OPERATOR_PLATNOSCI.kodPocztowy} {OPERATOR_PLATNOSCI.miasto}.
                </p>
                <ul className="logotypy" style={{ marginTop: "20px" }}>
                  <li>BLIK</li>
                  <li>Visa</li>
                  <li>Mastercard</li>
                </ul>
              </div>

              <div className="blok-danych" style={{ marginTop: "24px" }}>
                <h3>Warto wiedzieć</h3>
                <ul className="lista-kreski" style={{ fontSize: "0.93rem" }}>
                  <li>
                    Opłata wpisowa {zl(WPISOWE)} dotyczy wyłącznie pierwszego
                    zapisu i nie wchodzi do obciążeń cyklicznych.
                  </li>
                  <li>
                    Zgodę na obciążanie cykliczne odwołasz w każdej chwili,
                    mailem albo w aplikacji banku.
                  </li>
                  <li>
                    Odstąpienie od umowy przysługuje w terminie{" "}
                    {PLATNOSCI.okresOdstapienia} od jej zawarcia.
                  </li>
                  <li>
                    Zniżki rodzinne ustalamy indywidualnie, napisz w polu uwag
                    albo zadzwoń pod numer {KONTAKT.telefon}.
                  </li>
                </ul>
                <p style={{ marginTop: "22px" }}>
                  <Link href="/platnosci" className="link-dalej">
                    Pełne zasady płatności
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
