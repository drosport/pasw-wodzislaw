import type { Metadata } from "next";
import Link from "next/link";
import NaglowekStrony from "@/components/NaglowekStrony";
import Tabela from "@/components/Tabela";
import { Wartosc } from "@/components/Wartosc";
import {
  ADRES_SPOLKI_JEDNA_LINIA,
  DOKUMENTY,
  KONTAKT,
  PODWYKONAWCY,
  SPOLKA,
} from "@/lib/dane";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Zasady przetwarzania danych osobowych przez DRO SPORT sp. z o.o., kategorie danych, odbiorcy, okresy przechowywania i prawa osób, których dane dotyczą.",
};

const ROZDZIALY = [
  { id: "administrator", tytul: "Administrator danych" },
  { id: "kategorie", tytul: "Kategorie przetwarzanych danych" },
  { id: "maloletni", tytul: "Dane uczestników małoletnich" },
  { id: "zdrowie", tytul: "Dane o stanie zdrowia" },
  { id: "cele", tytul: "Cele i podstawy prawne" },
  { id: "odbiorcy", tytul: "Odbiorcy danych" },
  { id: "eog", tytul: "Przekazywanie danych poza EOG" },
  { id: "okresy", tytul: "Okresy przechowywania" },
  { id: "prawa", tytul: "Prawa osób, których dane dotyczą" },
  { id: "cookies", tytul: "Pliki cookies" },
  { id: "profilowanie", tytul: "Zautomatyzowane podejmowanie decyzji" },
  { id: "zmiany", tytul: "Zmiany polityki" },
];

export default function PolitykaPrywatnosci() {
  return (
    <>
      <NaglowekStrony
        okruszek="Polityka prywatności"
        tytul="Polityka prywatności"
        opis="Informacja o tym, jakie dane zbieramy, w jakim celu, komu je powierzamy i jak długo je przechowujemy."
      />

      <section className="sekcja">
        <div className="kontener-waski">
          <div className="metryka-dokumentu">
            Wersja dokumentu {DOKUMENTY.politykaWersja}, obowiązuje od{" "}
            {DOKUMENTY.politykaData}. Dokument realizuje obowiązek informacyjny
            wynikający z artykułu 13 rozporządzenia RODO.
          </div>

          <nav className="spis-tresci" aria-label="Spis treści polityki prywatności">
            <h2>Spis treści</h2>
            <ol>
              {ROZDZIALY.map((rozdzial) => (
                <li key={rozdzial.id}>
                  <a href={`#${rozdzial.id}`}>{rozdzial.tytul}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="dokument">
            {/* 1 --------------------------------------------------------- */}
            <h2 id="administrator">1. Administrator danych</h2>
            <ol>
              <li>
                Administratorem danych osobowych jest {SPOLKA.nazwaPelna},{" "}
                {ADRES_SPOLKI_JEDNA_LINIA}, KRS {SPOLKA.krs}, NIP {SPOLKA.nip},
                REGON {SPOLKA.regon}.
              </li>
              <li>
                W sprawach dotyczących danych osobowych można kontaktować się
                pod adresem poczty elektronicznej{" "}
                <Wartosc
                  wartosc={KONTAKT.emailDaneOsobowe}
                  opis="adres do spraw danych osobowych do uzupełnienia"
                />{" "}
                albo pisemnie na adres siedziby administratora.
              </li>
              <li>
                Administrator nie wyznaczył inspektora ochrony danych, ponieważ
                nie zachodzą przesłanki określone w artykule 37 RODO.
              </li>
            </ol>

            {/* 2 --------------------------------------------------------- */}
            <h2 id="kategorie">2. Kategorie przetwarzanych danych</h2>
            <p>Administrator przetwarza następujące kategorie danych:</p>
            <ul>
              <li>
                <strong>Dane uczestnika</strong>, imię, nazwisko, data urodzenia,
                grupa wiekowa, adres poczty elektronicznej, numer telefonu.
              </li>
              <li>
                <strong>Dane opiekuna prawnego</strong>, imię, nazwisko, dane
                kontaktowe, przy uczestnikach, którzy nie ukończyli 18 lat.
              </li>
              <li>
                <strong>Dane o uczestnictwie</strong>, wybrany wariant zajęć,
                przynależność do grupy, informacje o obecnościach.
              </li>
              <li>
                <strong>Dane rozliczeniowe</strong>, historia płatności, status
                subskrypcji, identyfikator zgody na obciążanie cykliczne,
                identyfikatory transakcji nadane przez operatora płatności.
              </li>
              <li>
                <strong>Dane o zgodach</strong>, treść i wersja zaakceptowanego
                regulaminu oraz polityki prywatności, data i adres IP akceptacji.
              </li>
              <li>
                <strong>Dane techniczne</strong>, adres IP, logi serwera,
                informacje o przeglądarce.
              </li>
            </ul>
            <p>
              Podanie danych jest dobrowolne, jednak niezbędne do zawarcia
              i wykonania umowy o udział w zajęciach. Bez ich podania zapis nie
              jest możliwy.
            </p>

            {/* 3 --------------------------------------------------------- */}
            <h2 id="maloletni">3. Dane uczestników małoletnich</h2>
            <ol>
              <li>
                Jeżeli uczestnik nie ukończył 18 lat, umowę zawiera w jego
                imieniu opiekun prawny, który podaje dane uczestnika oraz swoje
                dane kontaktowe.
              </li>
              <li>
                Administrator nie przyjmuje zgłoszeń składanych samodzielnie
                przez osoby małoletnie.
              </li>
              <li>
                Prawa dotyczące danych uczestnika małoletniego wykonuje jego
                opiekun prawny.
              </li>
            </ol>

            {/* 4 --------------------------------------------------------- */}
            <h2 id="zdrowie">4. Dane o stanie zdrowia</h2>
            <ol>
              <li>
                <strong>
                  Administrator nie zbiera danych o stanie zdrowia za
                  pośrednictwem strony internetowej.
                </strong>{" "}
                Formularze dostępne w serwisie nie zawierają pytań
                o przeciwwskazania zdrowotne, przebyte kontuzje ani stan zdrowia
                uczestnika.
              </li>
              <li>
                Oświadczenie o braku przeciwwskazań zdrowotnych do udziału
                w zajęciach sportowych składane jest w formie papierowej na sali
                treningowej i nie jest wprowadzane do systemu
                teleinformatycznego.
              </li>
              <li>
                Prosimy o niepodawanie informacji o stanie zdrowia w polach
                tekstowych formularzy.
              </li>
            </ol>

            {/* 5 --------------------------------------------------------- */}
            <h2 id="cele">5. Cele i podstawy prawne przetwarzania</h2>
            <Tabela>
              <table className="tabela">
                <thead>
                  <tr>
                    <th scope="col">Cel</th>
                    <th scope="col">Podstawa prawna</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      Obsługa zgłoszenia przesłanego przez formularz
                    </th>
                    <td data-etykieta="Podstawa prawna">
                      Artykuł 6 ustęp 1 litera b RODO, działania podejmowane na
                      żądanie osoby przed zawarciem umowy
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Zawarcie i wykonanie umowy o udział w zajęciach
                    </th>
                    <td data-etykieta="Podstawa prawna">Artykuł 6 ustęp 1 litera b RODO</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Realizacja płatności, w tym obciążeń cyklicznych
                    </th>
                    <td data-etykieta="Podstawa prawna">Artykuł 6 ustęp 1 litera b RODO</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Wystawianie i przechowywanie dokumentów księgowych
                    </th>
                    <td data-etykieta="Podstawa prawna">
                      Artykuł 6 ustęp 1 litera c RODO, obowiązki podatkowe
                      i rachunkowe
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Prowadzenie rejestru udzielonych zgód
                    </th>
                    <td data-etykieta="Podstawa prawna">
                      Artykuł 6 ustęp 1 litera c oraz litera f RODO, wykazanie
                      zgodności z prawem i obrona przed roszczeniami
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Rozpatrywanie reklamacji i dochodzenie roszczeń
                    </th>
                    <td data-etykieta="Podstawa prawna">
                      Artykuł 6 ustęp 1 litera f RODO, prawnie uzasadniony
                      interes administratora
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Zapewnienie bezpieczeństwa serwisu i przeciwdziałanie
                      nadużyciom
                    </th>
                    <td data-etykieta="Podstawa prawna">Artykuł 6 ustęp 1 litera f RODO</td>
                  </tr>
                </tbody>
              </table>
            </Tabela>
            <p>
              Administrator nie prowadzi działań marketingowych z wykorzystaniem
              danych uczestników. Jeżeli w przyszłości takie działania zostaną
              podjęte, będą prowadzone wyłącznie na podstawie odrębnej,
              dobrowolnej zgody, którą można wycofać w każdej chwili.
            </p>

            {/* 6 --------------------------------------------------------- */}
            <h2 id="odbiorcy">6. Odbiorcy danych</h2>
            <p>
              Dane mogą być powierzane następującym podmiotom, wyłącznie
              w zakresie niezbędnym do realizacji wskazanych celów:
            </p>
            <Tabela>
              <table className="tabela">
                <thead>
                  <tr>
                    <th scope="col">Rola</th>
                    <th scope="col">Podmiot</th>
                    <th scope="col">Zakres danych</th>
                  </tr>
                </thead>
                <tbody>
                  {PODWYKONAWCY.map((podwykonawca) => (
                    <tr key={podwykonawca.rola}>
                      <th scope="row">{podwykonawca.rola}</th>
                      <td data-etykieta="Podmiot">{podwykonawca.podmiot}</td>
                      <td data-etykieta="Zakres danych">{podwykonawca.zakres}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Tabela>
            <p>
              Ponadto dane mogą zostać udostępnione organom publicznym, jeżeli
              obowiązek taki wynika z przepisów prawa. Administrator nie
              sprzedaje danych osobowych i nie udostępnia ich w celach
              marketingowych podmiotom trzecim.
            </p>

            {/* 7 --------------------------------------------------------- */}
            <h2 id="eog">7. Przekazywanie danych poza EOG</h2>
            <ol>
              <li>
                Część usług infrastrukturalnych świadczą podmioty z siedzibą
                poza Europejskim Obszarem Gospodarczym. Dotyczy to dostawcy
                hostingu oraz dostawcy poczty transakcyjnej, wskazanych
                w rozdziale 6.
              </li>
              <li>
                Przekazywanie danych do tych podmiotów odbywa się na podstawie
                standardowych klauzul umownych zatwierdzonych przez Komisję
                Europejską, a w przypadku podmiotów uczestniczących w programie
                Data Privacy Framework, na podstawie decyzji Komisji
                Europejskiej stwierdzającej odpowiedni stopień ochrony.
              </li>
              <li>
                Kopię zastosowanych zabezpieczeń można uzyskać, kontaktując się
                z administratorem.
              </li>
            </ol>

            {/* 8 --------------------------------------------------------- */}
            <h2 id="okresy">8. Okresy przechowywania</h2>
            <Tabela>
              <table className="tabela">
                <thead>
                  <tr>
                    <th scope="col">Kategoria danych</th>
                    <th scope="col">Okres przechowywania</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      Dane ze zgłoszenia, jeżeli nie doszło do zapisu
                    </th>
                    <td data-etykieta="Okres przechowywania">12 miesięcy od ostatniego kontaktu</td>
                  </tr>
                  <tr>
                    <th scope="row">Dane uczestnika i dane o uczestnictwie</th>
                    <td data-etykieta="Okres przechowywania">
                      Do zakończenia umowy, a następnie przez okres
                      przedawnienia roszczeń, co do zasady 3 lata
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Dane rozliczeniowe i dokumenty księgowe
                    </th>
                    <td data-etykieta="Okres przechowywania">
                      5 lat, licząc od końca roku kalendarzowego, w którym
                      upłynął termin płatności podatku
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Rejestr zgód</th>
                    <td data-etykieta="Okres przechowywania">
                      Przez okres obowiązywania zgody oraz przez okres
                      przedawnienia roszczeń z nią związanych
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Logi serwera</th>
                    <td data-etykieta="Okres przechowywania">Do 12 miesięcy</td>
                  </tr>
                </tbody>
              </table>
            </Tabela>

            {/* 9 --------------------------------------------------------- */}
            <h2 id="prawa">9. Prawa osób, których dane dotyczą</h2>
            <p>Osobie, której dane dotyczą, przysługuje prawo do:</p>
            <ul>
              <li>dostępu do danych oraz otrzymania ich kopii,</li>
              <li>sprostowania danych nieprawidłowych lub niekompletnych,</li>
              <li>usunięcia danych, w zakresie przewidzianym przepisami,</li>
              <li>ograniczenia przetwarzania,</li>
              <li>
                przenoszenia danych przetwarzanych na podstawie umowy albo
                zgody, w ustrukturyzowanym formacie nadającym się do odczytu
                maszynowego,
              </li>
              <li>
                wniesienia sprzeciwu wobec przetwarzania opartego na prawnie
                uzasadnionym interesie administratora,
              </li>
              <li>
                cofnięcia zgody w każdej chwili, bez wpływu na zgodność
                z prawem przetwarzania dokonanego przed jej cofnięciem.
              </li>
            </ul>
            <ol>
              <li>
                Wniosek można złożyć pod adresem{" "}
                <Wartosc
                  wartosc={KONTAKT.emailDaneOsobowe}
                  opis="adres do spraw danych osobowych do uzupełnienia"
                />{" "}
                albo pisemnie na adres siedziby administratora. Odpowiadamy bez
                zbędnej zwłoki, nie później niż w terminie miesiąca.
              </li>
              <li>
                Osobie, której dane dotyczą, przysługuje prawo wniesienia skargi
                do Prezesa Urzędu Ochrony Danych Osobowych, ulica Stawki 2,
                00-193 Warszawa.
              </li>
              <li>
                Odwołanie zgody na obciążanie cykliczne nie jest wnioskiem
                w rozumieniu niniejszego rozdziału. Zasady jego złożenia opisuje{" "}
                <Link href="/platnosci">informacja o płatnościach</Link>.
              </li>
            </ol>

            {/* 10 -------------------------------------------------------- */}
            <h2 id="cookies">10. Pliki cookies</h2>
            <ol>
              <li>
                Serwis nie korzysta z narzędzi analitycznych, pikseli
                marketingowych ani mechanizmów śledzenia użytkowników między
                witrynami. Z tego powodu nie prezentujemy banera zgody na
                pliki cookies.
              </li>
              <li>
                Wykorzystywane są wyłącznie pliki niezbędne do prawidłowego
                działania serwisu, w tym pliki związane z bezpieczeństwem
                połączenia i rozkładem ruchu, ustawiane przez dostawcę hostingu.
                Ich stosowanie nie wymaga zgody użytkownika.
              </li>
              <li>
                Po uruchomieniu panelu uczestnika stosowany będzie dodatkowo
                plik sesyjny, niezbędny do utrzymania zalogowania. Plik ten
                usuwany jest po zakończeniu sesji.
              </li>
              <li>
                Ustawieniami plików cookies można zarządzać w przeglądarce
                internetowej, w tym całkowicie je zablokować. Może to jednak
                uniemożliwić korzystanie z części funkcji serwisu.
              </li>
              <li>
                Jeżeli w przyszłości administrator wdroży narzędzia analityczne
                albo marketingowe, przed ich uruchomieniem zbierze zgodę
                użytkownika, z realną możliwością odmowy, a skrypty tych
                narzędzi nie będą ładowane przed jej udzieleniem.
              </li>
            </ol>

            {/* 11 -------------------------------------------------------- */}
            <h2 id="profilowanie">
              11. Zautomatyzowane podejmowanie decyzji
            </h2>
            <p>
              Dane nie są wykorzystywane do zautomatyzowanego podejmowania
              decyzji, w tym do profilowania wywołującego skutki prawne albo
              w podobny sposób istotnie wpływającego na osobę, której dane
              dotyczą. Cykliczne obciążenie rachunku jest wykonaniem wcześniej
              udzielonej zgody, a nie decyzją podejmowaną automatycznie
              w rozumieniu artykułu 22 RODO.
            </p>

            {/* 12 -------------------------------------------------------- */}
            <h2 id="zmiany">12. Zmiany polityki</h2>
            <ol>
              <li>
                Administrator może zmienić politykę prywatności, w szczególności
                w razie zmiany przepisów, zakresu świadczonych usług albo listy
                podmiotów przetwarzających.
              </li>
              <li>
                Nowa wersja publikowana jest w serwisie wraz ze wskazaniem daty
                jej obowiązywania. O istotnych zmianach uczestnicy informowani
                są wiadomością e-mail.
              </li>
              <li>
                Polityka w wersji {DOKUMENTY.politykaWersja} obowiązuje od{" "}
                {DOKUMENTY.politykaData}.
              </li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
