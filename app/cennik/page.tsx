import type { Metadata } from "next";
import Link from "next/link";
import NaglowekStrony from "@/components/NaglowekStrony";
import Tabela from "@/components/Tabela";
import PasWezwania from "@/components/PasWezwania";
import { Wartosc } from "@/components/Wartosc";
import {
  METODY_PLATNOSCI,
  PAKIET_10_MIESIECY,
  PAKIET_5_MIESIECY,
  PLATNOSCI,
  SKLADKI_MIESIECZNE,
  UWAGI_CENNIK,
  WEJSCIE_JEDNORAZOWE,
  WierszPakietu,
  ZNIZKI_RODZINNE,
  zl,
} from "@/lib/dane";

export const metadata: Metadata = {
  title: "Cennik",
  description:
    "Składki miesięczne, wejście jednorazowe, pakiety opłacane z góry oraz zniżki rodzinne. Ceny zajęć sztuk walki w Wodzisławiu Śląskim.",
};

function TabelaPakietu({
  podpis,
  wiersze,
}: {
  podpis: string;
  wiersze: WierszPakietu[];
}) {
  return (
    <Tabela>
      <table className="tabela">
        <caption>{podpis}</caption>
        <thead>
          <tr>
            <th scope="col">Grupa</th>
            <th scope="col">Jeden trening w tygodniu</th>
            <th scope="col">Dwa treningi w tygodniu</th>
          </tr>
        </thead>
        <tbody>
          {wiersze.map((wiersz) => (
            <tr key={wiersz.grupa}>
              <th scope="row">{wiersz.grupa}</th>
              <td className="kwota" data-etykieta="Jeden trening w tygodniu">
                <span className="kwota-przed">{zl(wiersz.jedenTreningPrzed)}</span>
                <span className="kwota-po">{zl(wiersz.jedenTreningPo)}</span>
              </td>
              <td className="kwota" data-etykieta="Dwa treningi w tygodniu">
                <span className="kwota-przed">{zl(wiersz.dwaTreningiPrzed)}</span>
                <span className="kwota-po">{zl(wiersz.dwaTreningiPo)}</span>
              </td>
            </tr>
          ))}
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
        tytul="Cennik zajęć"
        opis="Podane kwoty są kwotami brutto i odpowiadają dokładnie kwotom pobieranym przy płatności. Cennik jest dostępny publicznie, bez logowania."
      />

      {/* Składki miesięczne -------------------------------------------- */}
      <section className="sekcja">
        <div className="kontener">
          <div className="naglowek-sekcji">
            <span className="etykieta">Rozliczenie podstawowe</span>
            <h2>Składki miesięczne</h2>
            <p className="wprowadzenie">
              Składka jest stała w każdym miesiącu treningowym i nie zależy od
              liczby obecności. Wariant, czyli liczbę treningów w tygodniu,
              uczestnik wybiera przy zapisie i może go zmienić od kolejnego
              okresu rozliczeniowego.
            </p>
          </div>

          <Tabela>
            <table className="tabela">
              <thead>
                <tr>
                  <th scope="col">Grupa</th>
                  <th scope="col">Jeden trening w tygodniu</th>
                  <th scope="col">Dwa treningi w tygodniu</th>
                </tr>
              </thead>
              <tbody>
                {SKLADKI_MIESIECZNE.map((wiersz) => (
                  <tr key={wiersz.grupa}>
                    <th scope="row">{wiersz.grupa}</th>
                    <td className="kwota" data-etykieta="Jeden trening w tygodniu">
                      {zl(wiersz.jedenTrening)} miesięcznie
                    </td>
                    <td className="kwota" data-etykieta="Dwa treningi w tygodniu">
                      {zl(wiersz.dwaTreningi)} miesięcznie
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tabela>

          <div className="kolumny-2" style={{ marginTop: "56px" }}>
            <div className="blok-danych">
              <h3>Wejście jednorazowe</h3>
              <p className="tekst-drugi">
                {zl(WEJSCIE_JEDNORAZOWE)} za pojedynczy trening. Rozliczenie
                jednorazowe, bez zapisu na stałe i bez zgody na obciążanie
                cykliczne.
              </p>
            </div>
            <div className="blok-danych">
              <h3>Zniżki rodzinne</h3>
              <ul className="lista-kreski">
                {ZNIZKI_RODZINNE.map((zapis) => (
                  <li key={zapis}>{zapis}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pakiety z góry -------------------------------------------------- */}
      <section className="sekcja sekcja-alt">
        <div className="kontener">
          <div className="naglowek-sekcji">
            <span className="etykieta">Płatność z góry</span>
            <h2>Pakiety opłacane jednorazowo</h2>
            <p className="wprowadzenie">
              Pakiet to jedna płatność obejmująca cały wskazany okres. Nie
              wymaga zgody na obciążanie cykliczne i nie generuje kolejnych
              pobrań. Po zakończeniu opłaconego okresu uczestnik decyduje, czy
              wykupuje kolejny pakiet, czy przechodzi na składkę miesięczną.
            </p>
          </div>

          <div style={{ display: "grid", gap: "44px" }}>
            <div>
              <TabelaPakietu
                podpis="Pakiet na 5 miesięcy, zniżka 10 procent"
                wiersze={PAKIET_5_MIESIECY}
              />
            </div>
            <div>
              <TabelaPakietu
                podpis="Pakiet na cały rok szkolny, 10 miesięcy, zniżka 20 procent"
                wiersze={PAKIET_10_MIESIECY}
              />
            </div>
          </div>

          <p className="przypis-tabeli" style={{ marginTop: "26px" }}>
            Kwota przekreślona to suma składek miesięcznych za dany okres,
            kwota wyróżniona to cena pakietu po zniżce.
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
                . W tych miesiącach zajęcia się nie odbywają, a składka nie
                jest pobierana.
              </p>
              <p>
                Przy rozliczeniu w formie składki miesięcznej pobranie
                następuje{" "}
                <Wartosc
                  wartosc={PLATNOSCI.dzienObciazenia}
                  opis="dzień obciążenia do uzupełnienia"
                />
                . Szczegółowe zasady, w tym sposób rezygnacji i postępowanie
                przy nieudanym obciążeniu, opisuje podstrona o płatnościach
                oraz regulamin.
              </p>
              <p style={{ marginTop: "30px" }}>
                <Link href="/platnosci" className="link-dalej">
                  Informacje o płatnościach
                </Link>
              </p>
            </div>

            <div className="blok-danych">
              <h3>Formy płatności</h3>
              <ul className="lista-kreski">
                {METODY_PLATNOSCI.map((metoda) => (
                  <li key={metoda}>{metoda}</li>
                ))}
              </ul>
              <p
                className="przypis-tabeli"
                style={{
                  marginTop: "24px",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--linia)",
                }}
              >
                Płatności online obsługuje PayPro S.A., operator serwisu
                Przelewy24.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PasWezwania
        tytul="Wybierz wariant i zapisz się"
        tresc="Jeżeli nie masz pewności, który wariant będzie odpowiedni, napisz albo zadzwoń. Doradzimy na podstawie wieku uczestnika i dostępnych terminów."
        przyciskDrugi={{ etykieta: "Zobacz harmonogram", href: "/zajecia" }}
      />
    </>
  );
}
