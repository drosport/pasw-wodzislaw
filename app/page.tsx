import Link from "next/link";
import PasWezwania from "@/components/PasWezwania";
import Tabela from "@/components/Tabela";
import { Wartosc } from "@/components/Wartosc";
import {
  AKADEMIA,
  DYSCYPLINY,
  GRUPY,
  INSTRUKTORZY,
  KONTAKT,
  MARKA,
  SKLADKI_MIESIECZNE,
  WEJSCIE_JEDNORAZOWE,
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
            <h1>Zajęcia sztuk walki dla dzieci, młodzieży i osób dorosłych</h1>
            <p className="hero-opis">
              Trenujemy w Wodzisławiu Śląskim, w środy i piątki, w dwóch
              grupach dobranych według wieku. Zajęcia są otwarte dla osób bez
              żadnego wcześniejszego przygotowania, a uczestnictwo rozliczamy
              w formie stałej składki miesięcznej.
            </p>
            <div className="grupa-przyciskow">
              <Link href="/zapisy" className="przycisk przycisk-glowny">
                Zapisz się na zajęcia
              </Link>
              <Link href="/cennik" className="przycisk przycisk-obrys">
                Zobacz cennik
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
              alt={`Godło Pszczyńskiej Akademii Sztuk Walki, dewiza ${AKADEMIA.dewizaLacinska}`}
              width={340}
              height={340}
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* Kim jesteśmy -------------------------------------------------- */}
      <section className="sekcja">
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
              <p>
                Akademia nie uczy jednego stylu. Program budowany był przez
                kolejne dekady jako spójny system, łączący techniki uderzane,
                chwyty, rzuty i pracę w zwarciu. W{" "}
                {AKADEMIA.rokRejestracjiStylu} roku został zarejestrowany pod
                nazwą {AKADEMIA.nazwaStylu}. W praktyce oznacza to kung-fu,
                jiu-jitsu i systemę w jednym programie, z naciskiem na
                samoobronę, a nie na rywalizację sportową.
              </p>
              <p>
                W Wodzisławiu Śląskim trenujemy w sali gimnastycznej Szkoły
                Podstawowej nr 3 przy ulicy 26 Marca 9. Prowadzimy dwie
                grupy, dla dzieci oraz dla młodzieży i osób dorosłych. Grupy są
                niewielkie, dzięki czemu instruktor poprawia technikę
                indywidualnie, a nowe osoby dołączają bez poczucia, że zostają
                z tyłu. Do zajęć można dołączyć w dowolnym momencie roku
                szkolnego, nie prowadzimy naboru okresowego.
              </p>
              <p>
                Patronem Akademii jest {AKADEMIA.patron}. Stąd godło z mieczem
                i skrzydłami oraz dewiza {AKADEMIA.dewizaLacinska}, po polsku
                któż jak Bóg.
              </p>
            </div>

            <div className="blok-danych">
              <h3>Akademia w skrócie</h3>
              <dl className="lista-danych">
                <dt>Pierwsza grupa</dt>
                <dd>
                  {AKADEMIA.rokZalozenia}, {AKADEMIA.miastoZalozenia}
                </dd>
                <dt>Założyciele</dt>
                <dd>{AKADEMIA.zalozyciele}</dd>
                <dt>Nazwa PASW</dt>
                <dd>od {AKADEMIA.rokNazwyPASW} roku</dd>
                <dt>Styl</dt>
                <dd>
                  {AKADEMIA.nazwaStylu}, zarejestrowany w{" "}
                  {AKADEMIA.rokRejestracjiStylu} roku
                </dd>
                <dt>Patron</dt>
                <dd>
                  {AKADEMIA.patron}, od {AKADEMIA.rokPatrona} roku
                </dd>
                <dt>Dewiza</dt>
                <dd>{AKADEMIA.dewizaPolska}</dd>
              </dl>
              <p
                style={{
                  marginTop: "24px",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--linia)",
                }}
              >
                <a
                  href="https://www.pasw.com.pl/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-dalej"
                >
                  Strona Akademii
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Czym się zajmujemy -------------------------------------------- */}
      <section className="sekcja sekcja-alt">
        <div className="kontener">
          <div className="naglowek-sekcji">
            <span className="etykieta">Program zajęć</span>
            <h2>Co ćwiczymy na treningach</h2>
            <p className="wprowadzenie">
              Trzy elementy składają się na jeden program. Zakres
              i intensywność różnią się między grupami, natomiast struktura
              treningu pozostaje ta sama, od rozgrzewki i pracy nad techniką po
              część końcową.
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

      {/* Grupy i harmonogram ------------------------------------------- */}
      <section className="sekcja">
        <div className="kontener">
          <div className="naglowek-sekcji">
            <span className="etykieta">Grupy i harmonogram</span>
            <h2>Kiedy i gdzie odbywają się treningi</h2>
            <p className="wprowadzenie">
              Zajęcia prowadzimy w dwóch grupach. Uczestnik wybiera wariant
              z jednym albo z dwoma treningami w tygodniu.
            </p>
          </div>

          <div className="uklad-tresci">
            <div
              className="siatka-2"
              style={{ gridTemplateColumns: "minmax(0, 1fr)" }}
            >
              {GRUPY.map((grupa) => (
                <div className="kafel" key={grupa.nazwa}>
                  <h3>
                    {grupa.nazwa}, {grupa.wiek}
                  </h3>
                  <p>{grupa.opis}</p>
                  <ul className="lista-linie" style={{ marginTop: "22px" }}>
                    {grupa.terminy.map((termin, indeks) => (
                      <li key={indeks}>
                        <span className="etykieta-wiersza">Termin zajęć</span>
                        <span className="wartosc-wiersza">
                          <Wartosc
                            wartosc={termin}
                            opis="termin do uzupełnienia"
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
                <p style={{ marginTop: "24px" }}>
                  <Link href="/kontakt" className="link-dalej">
                    Dojazd i kontakt
                  </Link>
                </p>
              </div>

              <div className="blok-danych" style={{ marginTop: "24px" }}>
                <h3>Prowadzący</h3>
                {INSTRUKTORZY.map((instruktor, indeks) => (
                  <div key={indeks} style={{ marginBottom: "18px" }}>
                    <p style={{ fontWeight: 600, marginBottom: "4px" }}>
                      <Wartosc
                        wartosc={instruktor.imie}
                        opis="imię i nazwisko do uzupełnienia"
                      />
                    </p>
                    <p
                      className="tekst-drugi"
                      style={{ fontSize: "0.92rem", marginBottom: "10px" }}
                    >
                      {instruktor.funkcja}
                    </p>
                    <ul
                      className="lista-kreski"
                      style={{ fontSize: "0.92rem" }}
                    >
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
          </div>
        </div>
      </section>

      {/* Cennik w skrócie ---------------------------------------------- */}
      <section className="sekcja sekcja-alt">
        <div className="kontener">
          <div className="naglowek-sekcji">
            <span className="etykieta">Cennik</span>
            <h2>Składki miesięczne</h2>
            <p className="wprowadzenie">
              Poniżej podstawowe stawki. Pełny cennik, w tym pakiety opłacane
              z góry i zniżki rodzinne, znajduje się na osobnej podstronie.
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
                <tr>
                  <th scope="row">Wejście jednorazowe</th>
                  <td className="kwota" colSpan={2} data-etykieta="Cena">
                    {zl(WEJSCIE_JEDNORAZOWE)} za trening
                  </td>
                </tr>
              </tbody>
            </table>
          </Tabela>

          <p style={{ marginTop: "32px" }}>
            <Link href="/cennik" className="link-dalej">
              Pełny cennik i zniżki
            </Link>
          </p>
        </div>
      </section>

      {/* Jak zacząć ----------------------------------------------------- */}
      <section className="sekcja">
        <div className="kontener">
          <div className="naglowek-sekcji">
            <span className="etykieta">Zapisy</span>
            <h2>Jak dołączyć do zajęć</h2>
          </div>

          <div className="siatka-3">
            <div className="kafel">
              <span className="kafel-numer">Krok 01</span>
              <h3>Zgłoszenie</h3>
              <p>
                Wypełniasz formularz zgłoszeniowy albo dzwonisz. Podajesz grupę
                wiekową i wariant, którym jesteś zainteresowany. Zgłoszenie nie
                jest zobowiązaniem.
              </p>
            </div>
            <div className="kafel">
              <span className="kafel-numer">Krok 02</span>
              <h3>Pierwszy trening</h3>
              <p>
                Ustalamy termin i przychodzisz na zajęcia. Na pierwszy trening
                wystarczy strój sportowy, sprzęt nie jest potrzebny. Uczestnicy
                niepełnoletni przychodzą z opiekunem prawnym.
              </p>
            </div>
            <div className="kafel">
              <span className="kafel-numer">Krok 03</span>
              <h3>Zapis i składka</h3>
              <p>
                Jeżeli decydujesz się kontynuować, wybierasz wariant
                uczestnictwa i formę płatności. Rozliczamy się w formie składki
                miesięcznej albo pakietu opłaconego z góry.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PasWezwania
        tresc={`Wypełnij krótki formularz zgłoszeniowy albo zadzwoń pod numer ${KONTAKT.telefon}. Ustalimy termin pierwszego treningu i odpowiemy na pytania.`}
      />
    </>
  );
}
