import Link from "next/link";
import PasWezwania from "@/components/PasWezwania";
import Tabela from "@/components/Tabela";
import {
  AKADEMIA,
  GRUPY,
  KATEGORIE,
  KONTAKT,
  MARKA,
  SKLADKA,
  WEJSCIE_JEDNORAZOWE,
  WPISOWE,
  zl,
} from "@/lib/dane";

export default function StronaGlowna() {
  return (
    <>
      {/* Sekcja otwierająca ------------------------------------------- */}
      <section className="hero sekcja-ciemna">
        <div className="kontener">
          <div>
            <span className="etykieta">{MARKA.sekcja}</span>
            <h1>Zapisy i opłaty za treningi w Wodzisławiu Śląskim</h1>
            <p className="hero-opis">
              Tu zapiszesz się na zajęcia i opłacisz składkę. Trenujemy w środy
              i piątki, w dwóch grupach, w sali gimnastycznej Szkoły
              Podstawowej nr 3.
            </p>
            <div className="grupa-przyciskow">
              <Link href="/zapisy" className="przycisk przycisk-glowny">
                Zapisz się i zapłać
              </Link>
              <Link href="/cennik" className="przycisk przycisk-obrys">
                Cennik
              </Link>
            </div>

            <div className="hero-fakty">
              <div>
                <span className="hero-fakt-etykieta">Wiek uczestników</span>
                <span className="hero-fakt-wartosc">Od 6 lat</span>
              </div>
              <div>
                <span className="hero-fakt-etykieta">Treningi</span>
                <span className="hero-fakt-wartosc">Środy i piątki</span>
              </div>
              <div>
                <span className="hero-fakt-etykieta">Składka miesięczna</span>
                <span className="hero-fakt-wartosc">Od 120 zł</span>
              </div>
            </div>
          </div>

          <div className="hero-godlo">
            <img
              className="godlo-odwrocone"
              src="/pasw-logo.svg"
              alt={`Godło Pszczyńskiej Akademii Sztuk Walki, dewiza ${MARKA.motto}`}
              width={340}
              height={340}
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* Kim jesteśmy -------------------------------------------------- */}
      <section className="sekcja-mala">
        <div className="kontener">
          <div className="uklad-tresci">
            <div>
              <span className="etykieta">Kim jesteśmy</span>
              <h2>Sekcja jednej z najstarszych szkół walki w Polsce</h2>
              <p className="wprowadzenie">
                Działamy w ramach Pszczyńskiej Akademii Sztuk Walki. Pierwsza
                grupa treningowa powstała w Pszczynie w {AKADEMIA.rokZalozenia}{" "}
                roku, założyli ją bracia {AKADEMIA.zalozyciele}.
              </p>
              <p style={{ marginTop: "26px" }}>
                <a
                  href={AKADEMIA.strona}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-dalej"
                >
                  Więcej informacji na {AKADEMIA.stronaEtykieta}
                </a>
              </p>
            </div>
            <div />
          </div>
        </div>
      </section>

      {/* Treningi ------------------------------------------------------ */}
      <section className="sekcja sekcja-alt">
        <div className="kontener">
          <div className="naglowek-sekcji">
            <span className="etykieta">Treningi</span>
            <h2>Kiedy i gdzie trenujemy</h2>
          </div>

          <div className="uklad-tresci">
            <div className="siatka-2" style={{ gridTemplateColumns: "minmax(0, 1fr)" }}>
              {GRUPY.map((grupa) => (
                <div className="kafel" key={grupa.nazwa}>
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
                  </ul>
                </div>
              ))}
            </div>

            <div className="blok-danych">
              <h3>Miejsce</h3>
              <p className="tekst-drugi" style={{ fontSize: "0.95rem" }}>
                {KONTAKT.salaNazwa}
                <br />
                {KONTAKT.salaUlica}
                <br />
                {KONTAKT.salaKod} {KONTAKT.salaMiasto}
              </p>
              <p style={{ marginTop: "24px" }}>
                <Link href="/treningi" className="link-dalej">
                  Szczegóły treningów
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cennik w skrócie ---------------------------------------------- */}
      <section className="sekcja">
        <div className="kontener">
          <div className="naglowek-sekcji">
            <span className="etykieta">Cennik</span>
            <h2>Składki miesięczne</h2>
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
                <tr>
                  <th scope="row">Opłata wpisowa, jednorazowa</th>
                  <td className="kwota" colSpan={2} data-etykieta="Kwota">
                    {zl(WPISOWE)}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Wejście jednorazowe</th>
                  <td className="kwota" colSpan={2} data-etykieta="Kwota">
                    {zl(WEJSCIE_JEDNORAZOWE)} za trening
                  </td>
                </tr>
              </tbody>
            </table>
          </Tabela>

          <p style={{ marginTop: "32px" }}>
            <Link href="/cennik" className="link-dalej">
              Pakiety i zniżki
            </Link>
          </p>
        </div>
      </section>

      {/* Jak zapłacić --------------------------------------------------- */}
      <section className="sekcja sekcja-alt">
        <div className="kontener">
          <div className="naglowek-sekcji">
            <span className="etykieta">Płatność</span>
            <h2>Jak opłacić zajęcia</h2>
          </div>

          <div className="siatka-3">
            <div className="kafel">
              <span className="kafel-numer">Krok 01</span>
              <h3>Wybierasz formę</h3>
              <p>
                Składka miesięczna pobierana automatycznie, pakiet opłacony
                z góry albo pojedyncze wejście.
              </p>
            </div>
            <div className="kafel">
              <span className="kafel-numer">Krok 02</span>
              <h3>Widzisz podsumowanie</h3>
              <p>
                Przed płatnością pokazujemy dokładną kwotę, częstotliwość
                pobrań i sposób odwołania zgody.
              </p>
            </div>
            <div className="kafel">
              <span className="kafel-numer">Krok 03</span>
              <h3>Płacisz</h3>
              <p>
                BLIK, przelew online albo karta. Płatność obsługuje PayPro S.A.,
                operator serwisu Przelewy24.
              </p>
            </div>
          </div>

          <p style={{ marginTop: "32px" }}>
            <Link href="/platnosci" className="link-dalej">
              Zasady płatności i rezygnacji
            </Link>
          </p>
        </div>
      </section>

      <PasWezwania
        tytul="Zapisz się i opłać zajęcia"
        tresc={`Cały proces zajmuje kilka minut. Jeżeli wolisz ustalić szczegóły wcześniej, zadzwoń pod numer ${KONTAKT.telefon}.`}
        przyciskGlowny={{ etykieta: "Zapisz się i zapłać", href: "/zapisy" }}
        przyciskDrugi={{ etykieta: "Kontakt", href: "/kontakt" }}
      />
    </>
  );
}
