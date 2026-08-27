import type { Metadata } from "next";
import Link from "next/link";
import NaglowekStrony from "@/components/NaglowekStrony";
import PasWezwania from "@/components/PasWezwania";
import Tabela from "@/components/Tabela";
import { Wartosc } from "@/components/Wartosc";
import {
  IdPakietu,
  KATEGORIE,
  METODY_PLATNOSCI,
  PAKIETY,
  PLATNOSCI,
  SKLADKA,
  UWAGI_CENNIK,
  WEJSCIE_JEDNORAZOWE,
  WPISOWE,
  ZNIZKI_RODZINNE,
  cenaPakietu,
  zl,
} from "@/lib/dane";

export const metadata: Metadata = {
  title: "Cennik",
  description:
    "Składki miesięczne, opłata wpisowa, wejście jednorazowe, pakiety opłacane z góry oraz zniżki rodzinne.",
};

function TabelaPakietu({ id }: { id: IdPakietu }) {
  const pakiet = PAKIETY.find((p) => p.id === id)!;
  return (
    <Tabela>
      <table className="tabela">
        <caption>
          {pakiet.etykieta}, {pakiet.miesiace} miesięcy, zniżka{" "}
          {pakiet.znizkaProcent} procent
        </caption>
        <thead>
          <tr>
            <th scope="col">Kategoria</th>
            <th scope="col">Jeden trening w tygodniu</th>
            <th scope="col">Dwa treningi w tygodniu</th>
          </tr>
        </thead>
        <tbody>
          {KATEGORIE.map((kategoria) => {
            const jeden = cenaPakietu(kategoria.id, 1, id);
            const dwa = cenaPakietu(kategoria.id, 2, id);
            return (
              <tr key={kategoria.id}>
                <th scope="row">{kategoria.etykieta}</th>
                <td className="kwota" data-etykieta="Jeden trening w tygodniu">
                  <span className="kwota-przed">{zl(jeden.przed)}</span>
                  <span className="kwota-po">{zl(jeden.po)}</span>
                </td>
                <td className="kwota" data-etykieta="Dwa treningi w tygodniu">
                  <span className="kwota-przed">{zl(dwa.przed)}</span>
                  <span className="kwota-po">{zl(dwa.po)}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Tabela>
  );
}

export default function Cennik() {
  return (
    <>
      <NaglowekStrony
        okruszek="Cennik"
        tytul="Cennik"
        opis="Kwoty brutto, identyczne z kwotami pobieranymi przy płatności. Cennik jest dostępny publicznie, bez logowania."
      />

      {/* Składki -------------------------------------------------------- */}
      <section className="sekcja">
        <div className="kontener">
          <div className="naglowek-sekcji">
            <span className="etykieta">Rozliczenie podstawowe</span>
            <h2>Składki miesięczne</h2>
            <p className="wprowadzenie">
              Składka jest stała w każdym miesiącu treningowym i nie zależy od
              liczby obecności. Wariant można zmienić od kolejnego okresu
              rozliczeniowego.
            </p>
          </div>

          <Tabela>
            <table className="tabela">
              <thead>
                <tr>
                  <th scope="col">Kategoria</th>
                  <th scope="col">Jeden trening w tygodniu</th>
                  <th scope="col">Dwa treningi w tygodniu</th>
                </tr>
              </thead>
              <tbody>
                {KATEGORIE.map((kategoria) => (
                  <tr key={kategoria.id}>
                    <th scope="row">{kategoria.etykieta}</th>
                    <td className="kwota" data-etykieta="Jeden trening w tygodniu">
                      {zl(SKLADKA[kategoria.id][1])} miesięcznie
                    </td>
                    <td className="kwota" data-etykieta="Dwa treningi w tygodniu">
                      {zl(SKLADKA[kategoria.id][2])} miesięcznie
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tabela>

          <div className="kolumny-2" style={{ marginTop: "56px" }}>
            <div className="blok-danych">
              <h3>Opłata wpisowa</h3>
              <p className="tekst-drugi">
                {zl(WPISOWE)}, jednorazowo, przy pierwszym zapisie. Doliczana
                do pierwszej płatności i nigdy nie wchodzi do kwoty obciążeń
                cyklicznych.
              </p>
            </div>
            <div className="blok-danych">
              <h3>Wejście jednorazowe</h3>
              <p className="tekst-drugi">
                {zl(WEJSCIE_JEDNORAZOWE)} za pojedynczy trening. Bez zapisu na
                stałe, bez opłaty wpisowej i bez zgody na obciążanie cykliczne.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pakiety --------------------------------------------------------- */}
      <section className="sekcja sekcja-alt">
        <div className="kontener">
          <div className="naglowek-sekcji">
            <span className="etykieta">Płatność z góry</span>
            <h2>Pakiety opłacane jednorazowo</h2>
            <p className="wprowadzenie">
              Jedna płatność za cały wskazany okres. Nie wymaga zgody na
              obciążanie cykliczne i nie generuje kolejnych pobrań.
            </p>
          </div>

          <div style={{ display: "grid", gap: "44px" }}>
            {PAKIETY.map((pakiet) => (
              <TabelaPakietu key={pakiet.id} id={pakiet.id} />
            ))}
          </div>

          <p className="przypis-tabeli" style={{ marginTop: "26px" }}>
            Kwota przekreślona to suma składek miesięcznych za dany okres, kwota
            wyróżniona to cena pakietu po zniżce. Do pierwszego pakietu nowego
            uczestnika doliczana jest opłata wpisowa {zl(WPISOWE)}.
          </p>
        </div>
      </section>

      {/* Zasady ---------------------------------------------------------- */}
      <section className="sekcja">
        <div className="kontener">
          <div className="uklad-tresci">
            <div>
              <span className="etykieta">Zasady rozliczeń</span>
              <h2>Co jeszcze warto wiedzieć</h2>
              <ul className="lista-kreski" style={{ marginBottom: "26px" }}>
                {UWAGI_CENNIK.map((uwaga) => (
                  <li key={uwaga}>{uwaga}</li>
                ))}
              </ul>
              <p>
                Miesiące wyłączone z cyklu treningowego:{" "}
                <Wartosc
                  wartosc={PLATNOSCI.miesiaceWylaczone}
                  opis="miesiące wyłączone do uzupełnienia"
                />
                . W tych miesiącach zajęcia się nie odbywają, a składka nie jest
                pobierana.
              </p>
              <p>
                Przy składce miesięcznej pobranie następuje{" "}
                <Wartosc
                  wartosc={PLATNOSCI.dzienObciazenia}
                  opis="dzień obciążenia do uzupełnienia"
                />
                .
              </p>
              <p style={{ marginTop: "30px" }}>
                <Link href="/platnosci" className="link-dalej">
                  Zasady płatności i rezygnacji
                </Link>
              </p>
            </div>

            <div>
              <div className="blok-danych">
                <h3>Zniżki rodzinne</h3>
                <ul className="lista-kreski" style={{ fontSize: "0.95rem" }}>
                  {ZNIZKI_RODZINNE.map((zapis) => (
                    <li key={zapis}>{zapis}</li>
                  ))}
                </ul>
              </div>

              <div className="blok-danych" style={{ marginTop: "24px" }}>
                <h3>Formy płatności</h3>
                <ul className="lista-kreski" style={{ fontSize: "0.95rem" }}>
                  {METODY_PLATNOSCI.map((metoda) => (
                    <li key={metoda}>{metoda}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PasWezwania
        tytul="Wybierz wariant i zapłać"
        tresc="Kalkulator w formularzu zapisu policzy dokładną kwotę, razem z opłatą wpisową, jeżeli Cię dotyczy."
        przyciskGlowny={{ etykieta: "Zapisz się i zapłać", href: "/zapisy" }}
        przyciskDrugi={{ etykieta: "Treningi", href: "/treningi" }}
      />
    </>
  );
}
