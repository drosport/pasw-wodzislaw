import type { Metadata } from "next";
import Link from "next/link";
import NaglowekStrony from "@/components/NaglowekStrony";
import Tabela from "@/components/Tabela";
import PasWezwania from "@/components/PasWezwania";
import { Wartosc } from "@/components/Wartosc";
import {
  ADRES_SPOLKI_JEDNA_LINIA,
  FUNKCJE,
  KONTAKT,
  METODY_PLATNOSCI,
  OPERATOR_PLATNOSCI,
  PLATNOSCI,
  KATEGORIE,
  RACHUNEK,
  SKLADKA,
  WPISOWE,
  SPOLKA,
  WEJSCIE_JEDNORAZOWE,
  brakuje,
  zl,
} from "@/lib/dane";

export const metadata: Metadata = {
  title: "Informacje o płatnościach",
  description:
    "Metody płatności, zasady płatności cyklicznej BLIK, rezygnacja, zwroty, reklamacje oraz dane operatora płatności PayPro S.A.",
};

export default function Platnosci() {
  return (
    <>
      <NaglowekStrony
        okruszek="Płatności"
        tytul="Informacje o płatnościach"
        opis="Zasady rozliczeń za zajęcia, sposób działania płatności cyklicznej, warunki rezygnacji oraz tryb zwrotów i reklamacji."
      />

      {/* Metody ---------------------------------------------------------- */}
      <section className="sekcja">
        <div className="kontener">
          <div className="uklad-tresci">
            <div>
              <span className="etykieta">Metody płatności</span>
              <h2>W jaki sposób można zapłacić</h2>
              <p className="wprowadzenie">
                Płatności online obsługuje zewnętrzny operator. Dane karty ani
                kod BLIK nie są przekazywane do{" "}
                {SPOLKA.nazwaSkrocona} i nie są przechowywane na tej stronie.
              </p>
              <ul className="lista-kreski" style={{ marginTop: "26px" }}>
                {METODY_PLATNOSCI.map((metoda) => (
                  <li key={metoda}>{metoda}</li>
                ))}
              </ul>

              <p style={{ marginTop: "24px" }}>
                Rozliczamy się wyłącznie bezgotówkowo. Instruktor nie przyjmuje
                wpłat na sali treningowej, więc każdą opłatę reguluje się przez
                stronę albo przelewem na rachunek spółki.
              </p>

              <ul className="logotypy" style={{ marginTop: "34px" }}>
                <li>BLIK</li>
                <li>Visa</li>
                <li>Mastercard</li>
                <li>Przelewy24</li>
              </ul>
            </div>

            <div className="blok-danych">
              <h3>Operator płatności</h3>
              <dl className="lista-danych">
                <dt>Nazwa</dt>
                <dd>
                  {OPERATOR_PLATNOSCI.nazwa}, właściciel serwisu{" "}
                  {OPERATOR_PLATNOSCI.marka}
                </dd>
                <dt>Adres</dt>
                <dd>
                  {OPERATOR_PLATNOSCI.ulica}, {OPERATOR_PLATNOSCI.kodPocztowy}{" "}
                  {OPERATOR_PLATNOSCI.miasto}
                </dd>
                <dt>KRS</dt>
                <dd>{OPERATOR_PLATNOSCI.krs}</dd>
                <dt>NIP</dt>
                <dd>{OPERATOR_PLATNOSCI.nip}</dd>
                <dt>REGON</dt>
                <dd>{OPERATOR_PLATNOSCI.regon}</dd>
                <dt>Rejestr</dt>
                <dd>{OPERATOR_PLATNOSCI.sad}</dd>
                <dt>Kapitał</dt>
                <dd>{OPERATOR_PLATNOSCI.kapitalZakladowy}</dd>
                <dt>Nadzór</dt>
                <dd>{OPERATOR_PLATNOSCI.nadzor}</dd>
              </dl>
            </div>

            <div className="blok-danych" style={{ marginTop: "24px" }}>
              <h3>Przelew tradycyjny</h3>
              <p className="tekst-drugi" style={{ fontSize: "0.95rem" }}>
                Jeżeli wolisz zapłacić zwykłym przelewem, wpłać na rachunek
                spółki. Ta forma nie obejmuje obciążeń cyklicznych, przelew
                trzeba wykonywać co miesiąc samodzielnie.
              </p>
              <dl className="lista-danych" style={{ marginTop: "20px" }}>
                <dt>Odbiorca</dt>
                <dd>{SPOLKA.nazwaSkrocona}</dd>
                <dt>Rachunek</dt>
                <dd>{RACHUNEK.numer}</dd>
                <dt>Tytuł</dt>
                <dd>
                  Imię i nazwisko uczestnika, Wodzisław, okres płatności.
                  Na przykład: {RACHUNEK.tytulPrzyklad}
                </dd>
                <dt>Termin</dt>
                <dd>Do {PLATNOSCI.dzienObciazenia}</dd>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Płatność cykliczna ---------------------------------------------- */}
      <section className="sekcja sekcja-alt">
        <div className="kontener">
          <div className="naglowek-sekcji">
            <span className="etykieta">Składka miesięczna</span>
            <h2>Jak działa płatność cykliczna BLIK</h2>
            <p className="wprowadzenie">
              Płatność cykliczna to zgoda udzielana jeden raz, na podstawie
              której operator pobiera co miesiąc ustaloną kwotę bez konieczności
              podawania kodu BLIK za każdym razem. Zgoda dotyczy wyłącznie
              składek miesięcznych.
            </p>
          </div>

          <ol className="kroki">
            <li>
              <div>
                <h3>Wybór wariantu</h3>
                <p>
                  Przy zapisie wybierasz grupę i liczbę treningów w tygodniu.
                  Na tej podstawie ustalana jest kwota składki miesięcznej.
                </p>
              </div>
            </li>
            <li>
              <div>
                <h3>Podsumowanie przed płatnością</h3>
                <p>
                  Przed podaniem kodu BLIK widzisz komplet informacji, to
                  znaczy dokładną kwotę obciążenia, częstotliwość pobrań, dzień
                  miesiąca, w którym następuje pobranie, okres obowiązywania
                  zgody oraz sposób jej odwołania.
                </p>
              </div>
            </li>
            <li>
              <div>
                <h3>Udzielenie zgody</h3>
                <p>
                  Zgodę na obciążanie cykliczne zaznaczasz osobno, niezależnie
                  od akceptacji regulaminu i polityki prywatności. Następnie
                  podajesz kod BLIK i potwierdzasz zgodę w aplikacji swojego
                  banku. Ta czynność wykonywana jest jeden raz.
                </p>
              </div>
            </li>
            <li>
              <div>
                <h3>Kolejne obciążenia</h3>
                <p>
                  Kolejne pobrania następują automatycznie, bez Twojego udziału,
                  zawsze w tej samej kwocie i zawsze{" "}
                  <Wartosc
                    wartosc={PLATNOSCI.dzienObciazenia}
                    opis="dzień obciążenia do uzupełnienia"
                  />
                  . O każdym obciążeniu informujemy wiadomością e-mail.
                </p>
              </div>
            </li>
            <li>
              <div>
                <h3>Zmiana kwoty</h3>
                <p>
                  Kwota obciążenia nie może zostać zmieniona na podstawie
                  udzielonej zgody. Zmiana wariantu uczestnictwa albo zmiana
                  cennika wymaga odwołania dotychczasowej zgody i udzielenia
                  nowej, na nową kwotę.
                </p>
              </div>
            </li>
          </ol>

          <Tabela style={{ marginTop: "52px" }}>
            <table className="tabela">
              <caption>Kwoty obciążeń cyklicznych</caption>
              <thead>
                <tr>
                  <th scope="col">Wariant</th>
                  <th scope="col">Kwota obciążenia</th>
                  <th scope="col">Częstotliwość</th>
                </tr>
              </thead>
              <tbody>
                {KATEGORIE.flatMap((kategoria) => [
                  <tr key={`${kategoria.id}-1`}>
                    <th scope="row">
                      {kategoria.etykieta}, jeden trening w tygodniu
                    </th>
                    <td className="kwota" data-etykieta="Kwota obciążenia">
                      {zl(SKLADKA[kategoria.id][1])}
                    </td>
                    <td data-etykieta="Częstotliwość">Raz w miesiącu</td>
                  </tr>,
                  <tr key={`${kategoria.id}-2`}>
                    <th scope="row">
                      {kategoria.etykieta}, dwa treningi w tygodniu
                    </th>
                    <td className="kwota" data-etykieta="Kwota obciążenia">
                      {zl(SKLADKA[kategoria.id][2])}
                    </td>
                    <td data-etykieta="Częstotliwość">Raz w miesiącu</td>
                  </tr>,
                ])}
              </tbody>
            </table>
          </Tabela>

          <p className="przypis-tabeli">
            Miesiące wyłączone z cyklu:{" "}
            <Wartosc
              wartosc={PLATNOSCI.miesiaceWylaczone}
              opis="miesiące wyłączone do uzupełnienia"
            />
            . W tych miesiącach obciążenie nie jest realizowane. Opłata wpisowa
            {" "}{zl(WPISOWE)} doliczana jest wyłącznie do pierwszej płatności
            i nigdy nie wchodzi do kwoty obciążeń cyklicznych. Pakiety
            opłacane z góry oraz wejście jednorazowe w kwocie{" "}
            {zl(WEJSCIE_JEDNORAZOWE)} rozliczane są jako zwykła płatność
            jednorazowa i nie wymagają zgody na obciążanie cykliczne.
          </p>

          <p style={{ marginTop: "30px" }}>
            <Link href="/cennik" className="link-dalej">
              Pełny cennik
            </Link>
          </p>
        </div>
      </section>

      {/* Rezygnacja i niepowodzenia -------------------------------------- */}
      <section className="sekcja">
        <div className="kontener">
          <div className="naglowek-sekcji">
            <span className="etykieta">Zgoda i rezygnacja</span>
            <h2>Odwołanie zgody oraz nieudane obciążenia</h2>
          </div>

          <div className="siatka-2">
            <div className="kafel">
              <h3>Rezygnacja w każdej chwili</h3>
              <p>
                Zgodę na obciążanie cykliczne można odwołać w dowolnym momencie,
                w sposób nie bardziej skomplikowany niż jej udzielenie. Wystarczy
                jedno z poniższych działań.
              </p>
              <ul className="lista-kreski" style={{ marginTop: "18px" }}>
                {FUNKCJE.panelUczestnika && (
                  <li>
                    Odwołanie zgody w panelu uczestnika, do którego dostęp
                    otrzymujesz po zapisie.
                  </li>
                )}
                <li>
                  Wiadomość e-mail na adres{" "}
                  {brakuje(KONTAKT.email) ? (
                    <Wartosc wartosc={KONTAKT.email} opis="adres do uzupełnienia" />
                  ) : (
                    <a href={`mailto:${KONTAKT.email}`}>{KONTAKT.email}</a>
                  )}
                  .
                </li>
                <li>
                  Odwołanie zgody bezpośrednio w aplikacji bankowej, w sekcji
                  zgód i płatności cyklicznych BLIK.
                </li>
              </ul>
              <p style={{ marginTop: "18px" }}>
                Odwołanie zgody wstrzymuje kolejne obciążenia. Okres, za który
                składka została już pobrana, pozostaje opłacony i uczestnik może
                korzystać z zajęć do jego końca.
              </p>
            </div>

            <div className="kafel">
              <h3>Nieudane obciążenie</h3>
              <p>
                Obciążenie może zakończyć się niepowodzeniem, na przykład przy
                braku środków na rachunku albo po odwołaniu zgody w aplikacji
                bankowej. Obciążenia cykliczne nie są ponawiane automatycznie
                przez operatora płatności.
              </p>
              <ul className="lista-kreski" style={{ marginTop: "18px" }}>
                <li>
                  O nieudanym obciążeniu informujemy wiadomością e-mail w dniu
                  jego wystąpienia.
                </li>
                <li>
                  Ponowną próbę pobrania podejmujemy jeden raz, po upływie kilku
                  dni roboczych.
                </li>
                <li>
                  Jeżeli druga próba również się nie powiedzie, kontaktujemy się
                  bezpośrednio i ustalamy inną formę uregulowania składki.
                </li>
                <li>
                  Zaległość w opłacie nie skutkuje automatycznym wykreśleniem
                  z zajęć. Zasady dostępu do zajęć przy nieuregulowanej składce
                  określa regulamin.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Zwroty, odstąpienie, reklamacje ---------------------------------- */}
      <section className="sekcja sekcja-alt">
        <div className="kontener">
          <div className="naglowek-sekcji">
            <span className="etykieta">Uprawnienia klienta</span>
            <h2>Odstąpienie, zwroty i reklamacje</h2>
          </div>

          <div className="siatka-3">
            <div className="kafel">
              <span className="kafel-numer">01</span>
              <h3>Odstąpienie od umowy</h3>
              <p>
                Umowa zawierana przez stronę internetową jest umową zawieraną na
                odległość. Konsument może odstąpić od niej w terminie{" "}
                {PLATNOSCI.okresOdstapienia} od jej zawarcia, bez podawania
                przyczyny. Wzór oświadczenia o odstąpieniu stanowi załącznik do
                regulaminu.
              </p>
            </div>
            <div className="kafel">
              <span className="kafel-numer">02</span>
              <h3>Zwroty</h3>
              <p>
                Zwrot środków realizujemy w terminie {PLATNOSCI.terminZwrotu} od
                uznania odstąpienia albo reklamacji, tą samą metodą, którą
                dokonano płatności. Jeżeli uczestnik zaczął korzystać z zajęć
                przed upływem terminu odstąpienia, zwrot pomniejszany jest
                proporcjonalnie o wartość zrealizowanych treningów.
              </p>
            </div>
            <div className="kafel">
              <span className="kafel-numer">03</span>
              <h3>Reklamacje</h3>
              <p>
                Reklamację można złożyć wiadomością e-mail albo pisemnie na
                adres siedziby spółki. Rozpatrujemy ją w terminie{" "}
                {PLATNOSCI.terminReklamacji} od otrzymania i informujemy o
                wyniku tą samą drogą. Reklamacje dotyczące przebiegu samej
                transakcji płatniczej można składać także bezpośrednio do
                operatora płatności.
              </p>
            </div>
          </div>

          <div className="blok-danych" style={{ marginTop: "40px" }}>
            <h3>Dowody sprzedaży</h3>
            <p className="tekst-drugi" style={{ fontSize: "0.97rem" }}>
              Po każdej zaksięgowanej płatności wysyłamy potwierdzenie na adres
              e-mail podany przy zapisie. Na żądanie zgłoszone przy zakupie
              wystawiamy fakturę. Sprzedawcą i wystawcą dokumentów sprzedaży
              jest {SPOLKA.nazwaPelna}, {ADRES_SPOLKI_JEDNA_LINIA}, NIP{" "}
              {SPOLKA.nip}.
            </p>
          </div>
        </div>
      </section>

      <PasWezwania
        tytul="Masz pytanie o rozliczenia"
        tresc="Jeżeli coś w zasadach płatności jest niejasne, napisz albo zadzwoń przed zapisem. Odpowiemy, zanim podejmiesz decyzję."
        przyciskGlowny={{ etykieta: "Kontakt", href: "/kontakt" }}
        przyciskDrugi={{ etykieta: "Regulamin", href: "/regulamin" }}
      />
    </>
  );
}
