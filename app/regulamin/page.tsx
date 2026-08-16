import type { Metadata } from "next";
import Link from "next/link";
import NaglowekStrony from "@/components/NaglowekStrony";
import Tabela from "@/components/Tabela";
import { Wartosc } from "@/components/Wartosc";
import {
  ADRES_SPOLKI_JEDNA_LINIA,
  AKADEMIA,
  DOKUMENTY,
  FUNKCJE,
  KONTAKT,
  MARKA,
  OPERATOR_PLATNOSCI,
  PAKIET_10_MIESIECY,
  PAKIET_5_MIESIECY,
  PLATNOSCI,
  SKLADKI_MIESIECZNE,
  SPOLKA,
  WEJSCIE_JEDNORAZOWE,
  brakuje,
  zl,
} from "@/lib/dane";

export const metadata: Metadata = {
  title: "Regulamin",
  description:
    "Regulamin świadczenia usług przez DRO SPORT sp. z o.o. w ramach sekcji Wodzisław Śląski Pszczyńskiej Akademii Sztuk Walki.",
};

const ROZDZIALY = [
  { id: "definicje", tytul: "Definicje" },
  { id: "uslugodawca", tytul: "Dane usługodawcy" },
  { id: "zakres-uslug", tytul: "Zakres usług" },
  { id: "zawarcie-umowy", tytul: "Zawarcie umowy" },
  { id: "ceny", tytul: "Ceny i warianty uczestnictwa" },
  { id: "platnosci", tytul: "Płatności" },
  { id: "czas-trwania", tytul: "Czas trwania umowy i rezygnacja" },
  { id: "odstapienie", tytul: "Prawo odstąpienia od umowy" },
  { id: "nieobecnosci", tytul: "Nieobecności i odwołane zajęcia" },
  { id: "obowiazki", tytul: "Obowiązki uczestnika" },
  { id: "odpowiedzialnosc", tytul: "Odpowiedzialność" },
  { id: "reklamacje", tytul: "Reklamacje" },
  { id: "spory", tytul: "Pozasądowe rozwiązywanie sporów" },
  { id: "zmiany", tytul: "Zmiany regulaminu" },
  { id: "koncowe", tytul: "Postanowienia końcowe" },
  { id: "zalacznik", tytul: "Załącznik, wzór oświadczenia o odstąpieniu" },
];

export default function Regulamin() {
  const emailKontaktowy = brakuje(KONTAKT.email) ? null : KONTAKT.email;

  return (
    <>
      <NaglowekStrony
        okruszek="Regulamin"
        tytul="Regulamin świadczenia usług"
        opis="Zasady uczestnictwa w zajęciach, płatności, rezygnacji oraz rozpatrywania reklamacji."
      />

      <section className="sekcja">
        <div className="kontener-waski">
          <div className="metryka-dokumentu">
            Wersja dokumentu {DOKUMENTY.regulaminWersja}, obowiązuje od{" "}
            {DOKUMENTY.regulaminData}. Dokument dotyczy usług świadczonych przez{" "}
            {SPOLKA.nazwaPelna} pod marką {MARKA.nazwaPelna}.
          </div>

          <nav className="spis-tresci" aria-label="Spis treści regulaminu">
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
            <h2 id="definicje">1. Definicje</h2>
            <p>Użyte w regulaminie pojęcia oznaczają:</p>
            <ol>
              <li>
                <strong>Usługodawca</strong>, {SPOLKA.nazwaPelna} z siedzibą
                w {SPOLKA.miastoMiejscownik}, prowadząca działalność pod marką{" "}
                {MARKA.nazwaPelna}.
              </li>
              <li>
                <strong>Klient</strong>, osoba fizyczna zawierająca umowę
                z Usługodawcą, we własnym imieniu albo w imieniu Uczestnika
                małoletniego.
              </li>
              <li>
                <strong>Uczestnik</strong>, osoba biorąca udział w zajęciach.
                Uczestnikiem i Klientem może być ta sama osoba.
              </li>
              <li>
                <strong>Opiekun prawny</strong>, rodzic albo inny przedstawiciel
                ustawowy Uczestnika, który nie ukończył 18 lat.
              </li>
              <li>
                <strong>Zajęcia</strong>, treningi sztuk walki prowadzone przez
                Usługodawcę w sekcji Wodzisław Śląski.
              </li>
              <li>
                <strong>Subskrypcja</strong>, umowa o świadczenie Zajęć
                rozliczana w formie składki miesięcznej, pobieranej cyklicznie
                na podstawie zgody udzielonej przez Klienta.
              </li>
              <li>
                <strong>Pakiet</strong>, umowa o świadczenie Zajęć w oznaczonym
                okresie, opłacana jednorazowo z góry.
              </li>
              <li>
                <strong>Operator płatności</strong>, {OPERATOR_PLATNOSCI.nazwa}{" "}
                z siedzibą w {OPERATOR_PLATNOSCI.miastoMiejscownik}, właściciel serwisu{" "}
                {OPERATOR_PLATNOSCI.marka}.
              </li>
              <li>
                <strong>Serwis</strong>, strona internetowa prowadzona przez
                Usługodawcę, za pośrednictwem której składane są zgłoszenia
                i realizowane płatności.
              </li>
              <li>
                <strong>Miesiąc treningowy</strong>, miesiąc kalendarzowy, w
                którym zgodnie z harmonogramem odbywają się Zajęcia.
              </li>
            </ol>

            {/* 2 --------------------------------------------------------- */}
            <h2 id="uslugodawca">2. Dane usługodawcy</h2>
            <ol>
              <li>
                Usługodawcą jest {SPOLKA.nazwaPelna}, {ADRES_SPOLKI_JEDNA_LINIA}
                .
              </li>
              <li>
                Spółka wpisana jest do rejestru przedsiębiorców Krajowego
                Rejestru Sądowego pod numerem KRS {SPOLKA.krs}, prowadzonego
                przez{" "}
                <Wartosc
                  wartosc={SPOLKA.sadRejestrowy}
                  opis="sąd rejestrowy do uzupełnienia"
                />
                . NIP {SPOLKA.nip}, REGON {SPOLKA.regon}. Kapitał zakładowy{" "}
                <Wartosc
                  wartosc={SPOLKA.kapitalZakladowy}
                  opis="kwota do uzupełnienia"
                />
                .
              </li>
              <li>
                Kontakt z Usługodawcą jest możliwy pod numerem telefonu{" "}
                <Wartosc wartosc={KONTAKT.telefon} opis="numer do uzupełnienia" />{" "}
                oraz pod adresem poczty elektronicznej{" "}
                <Wartosc wartosc={KONTAKT.email} opis="adres do uzupełnienia" />.
              </li>
              <li>
                {MARKA.nazwaPelna} jest nazwą handlową, pod którą Usługodawca
                prowadzi sekcję treningową. Stroną umowy, sprzedawcą usług oraz
                podmiotem przyjmującym płatności jest wyłącznie{" "}
                {SPOLKA.nazwaSkrocona}
              </li>
            </ol>

            {/* 3 --------------------------------------------------------- */}
            <h2 id="zakres-uslug">3. Zakres usług</h2>
            <ol>
              <li>
                Usługodawca prowadzi Zajęcia sztuk walki w systemie{" "}
                {AKADEMIA.nazwaStylu}, obejmującym kung-fu, jiu-jitsu i systemę
                oraz samoobronę, w grupach dobranych według wieku i stażu
                Uczestników.
              </li>
              <li>
                Zajęcia odbywają się w sali treningowej pod adresem{" "}
                <Wartosc
                  wartosc={KONTAKT.salaUlica}
                  opis="adres sali do uzupełnienia"
                />
                , {KONTAKT.salaKod} {KONTAKT.salaMiasto}.
              </li>
              <li>
                Aktualny harmonogram Zajęć publikowany jest w Serwisie na
                podstronie{" "}
                <Link href="/zajecia">Zajęcia i harmonogram</Link>.
              </li>
              <li>
                Wariant uczestnictwa obejmuje jeden albo dwa treningi
                w tygodniu. Liczba treningów w Miesiącu treningowym wynika
                z harmonogramu i z liczby tygodni w danym miesiącu.
              </li>
              <li>
                Rok szkolny obejmuje 10 Miesięcy treningowych. Miesiącami
                wyłączonymi z cyklu są{" "}
                <Wartosc
                  wartosc={PLATNOSCI.miesiaceWylaczone}
                  opis="miesiące wyłączone do uzupełnienia"
                />
                . W tych miesiącach Zajęcia się nie odbywają, a składka nie jest
                pobierana.
              </li>
              <li>
                Usługodawca może odwołać pojedyncze Zajęcia z przyczyn od siebie
                niezależnych, w szczególności w razie niedostępności sali albo
                choroby prowadzącego. Zasady rozliczenia odwołanych Zajęć
                określa rozdział 9.
              </li>
            </ol>

            {/* 4 --------------------------------------------------------- */}
            <h2 id="zawarcie-umowy">4. Zawarcie umowy</h2>
            <ol>
              <li>
                Zgłoszenie chęci uczestnictwa następuje przez formularz
                dostępny w Serwisie, telefonicznie albo osobiście. Samo
                zgłoszenie nie jest zawarciem umowy.
              </li>
              <li>
                Umowa zostaje zawarta z chwilą, w której Klient zaakceptuje
                regulamin, wybierze wariant uczestnictwa i skutecznie dokona
                pierwszej płatności albo udzieli zgody na obciążanie cykliczne.
              </li>
              <li>
                Jeżeli Uczestnik nie ukończył 18 lat, umowę zawiera w jego
                imieniu Opiekun prawny. Opiekun prawny podaje dane Uczestnika,
                akceptuje regulamin oraz ponosi odpowiedzialność za zapłatę
                należności.
              </li>
              <li>
                Przed zawarciem umowy Klient otrzymuje informację o kwocie do
                zapłaty, wariancie uczestnictwa, częstotliwości obciążeń oraz
                zasadach rezygnacji. Informacje te są prezentowane przed
                przejściem do płatności, niezależnie od treści niniejszego
                regulaminu.
              </li>
              <li>
                Umowa zawierana za pośrednictwem Serwisu jest umową zawieraną
                na odległość w rozumieniu ustawy o prawach konsumenta.
              </li>
              <li>
                Do zawarcia umowy niezbędne jest posiadanie urządzenia
                z dostępem do internetu, aktualnej przeglądarki internetowej
                oraz czynnego adresu poczty elektronicznej.
              </li>
            </ol>

            {/* 5 --------------------------------------------------------- */}
            <h2 id="ceny">5. Ceny i warianty uczestnictwa</h2>
            <ol>
              <li>
                Ceny podane w Serwisie są cenami brutto wyrażonymi w złotych
                polskich i odpowiadają kwotom faktycznie pobieranym.
              </li>
              <li>
                Składki miesięczne wynoszą:
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
                            {zl(wiersz.jedenTrening)}
                          </td>
                          <td className="kwota" data-etykieta="Dwa treningi w tygodniu">
                            {zl(wiersz.dwaTreningi)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Tabela>
              </li>
              <li>
                Wejście jednorazowe kosztuje {zl(WEJSCIE_JEDNORAZOWE)} za jeden
                trening i nie wiąże się z zawarciem umowy na czas nieokreślony.
              </li>
              <li>
                Pakiety opłacane z góry wynoszą:
                <Tabela>
                  <table className="tabela">
                    <thead>
                      <tr>
                        <th scope="col">Pakiet i grupa</th>
                        <th scope="col">Jeden trening w tygodniu</th>
                        <th scope="col">Dwa treningi w tygodniu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PAKIET_5_MIESIECY.map((wiersz) => (
                        <tr key={`p5-${wiersz.grupa}`}>
                          <th scope="row">5 miesięcy, {wiersz.grupa}</th>
                          <td className="kwota" data-etykieta="Jeden trening w tygodniu">
                            {zl(wiersz.jedenTreningPo)}
                          </td>
                          <td className="kwota" data-etykieta="Dwa treningi w tygodniu">
                            {zl(wiersz.dwaTreningiPo)}
                          </td>
                        </tr>
                      ))}
                      {PAKIET_10_MIESIECY.map((wiersz) => (
                        <tr key={`p10-${wiersz.grupa}`}>
                          <th scope="row">Rok szkolny, {wiersz.grupa}</th>
                          <td className="kwota" data-etykieta="Jeden trening w tygodniu">
                            {zl(wiersz.jedenTreningPo)}
                          </td>
                          <td className="kwota" data-etykieta="Dwa treningi w tygodniu">
                            {zl(wiersz.dwaTreningiPo)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Tabela>
              </li>
              <li>
                Pakiet na 5 miesięcy uwzględnia zniżkę 10 procent, a pakiet na
                rok szkolny zniżkę 20 procent, liczone od sumy odpowiadających
                im składek miesięcznych.
              </li>
              <li>
                Zniżki rodzinne obejmują drugie dziecko z tej samej rodziny,
                dla którego składka miesięczna zostaje obniżona o 10 procent,
                oraz trzecie i każde kolejne dziecko, dla którego Zajęcia są
                bezpłatne.
              </li>
              <li>
                Zniżki nie łączą się. Uczestnikowi przysługuje jedna,
                najkorzystniejsza dla niego zniżka.
              </li>
              <li>
                Zmiana wariantu uczestnictwa jest możliwa od kolejnego Miesiąca
                treningowego, po zgłoszeniu jej Usługodawcy najpóźniej na 7 dni
                przed jego rozpoczęciem. W przypadku Subskrypcji zmiana kwoty
                wymaga odwołania dotychczasowej zgody na obciążanie cykliczne
                i udzielenia nowej.
              </li>
              <li>
                Usługodawca może zmienić cennik. Zmiana nie wpływa na ceny
                Pakietów już opłaconych. Zasady wprowadzania zmian dla
                Subskrypcji określa rozdział 14.
              </li>
            </ol>

            {/* 6 --------------------------------------------------------- */}
            <h2 id="platnosci">6. Płatności</h2>

            <h3>6.1. Metody płatności i operator</h3>
            <ol>
              <li>
                Płatności realizowane są za pośrednictwem Operatora płatności,
                to jest {OPERATOR_PLATNOSCI.nazwa}, {OPERATOR_PLATNOSCI.ulica},{" "}
                {OPERATOR_PLATNOSCI.kodPocztowy} {OPERATOR_PLATNOSCI.miasto},
                wpisanej do rejestru przedsiębiorców Krajowego Rejestru Sądowego
                przez {OPERATOR_PLATNOSCI.sad} pod numerem KRS{" "}
                {OPERATOR_PLATNOSCI.krs}, NIP {OPERATOR_PLATNOSCI.nip}, REGON{" "}
                {OPERATOR_PLATNOSCI.regon}, kapitał zakładowy{" "}
                {OPERATOR_PLATNOSCI.kapitalZakladowy}.
              </li>
              <li>
                Operator płatności figuruje w rejestrze prowadzonym przez
                Komisję Nadzoru Finansowego, {OPERATOR_PLATNOSCI.nadzor}.
              </li>
              <li>
                Dostępne metody płatności to BLIK, w tym płatność cykliczna
                BLIK, przelew online, karta płatnicza Visa oraz Mastercard,
                a także przelew tradycyjny na rachunek bankowy Usługodawcy.
              </li>
              <li>
                Usługodawca nie przechowuje danych karty płatniczej ani kodów
                BLIK. Dane te przetwarzane są wyłącznie przez Operatora
                płatności.
              </li>
            </ol>

            <h3>6.2. Płatność jednorazowa</h3>
            <ol>
              <li>
                Pakiety opłacane z góry oraz wejścia jednorazowe rozliczane są
                jako pojedyncza płatność, w kwocie wskazanej w rozdziale 5.
              </li>
              <li>
                Płatność jednorazowa nie wymaga zgody na obciążanie cykliczne
                i nie powoduje kolejnych obciążeń.
              </li>
              <li>
                Okres, którego dotyczy Pakiet, rozpoczyna się od pierwszego
                Miesiąca treningowego wskazanego przy zakupie.
              </li>
            </ol>

            <h3>6.3. Płatność cykliczna, składki miesięczne</h3>
            <ol>
              <li>
                Subskrypcja rozliczana jest w formie cyklicznych obciążeń
                realizowanych przez Operatora płatności na podstawie zgody
                udzielonej przez Klienta.
              </li>
              <li>
                Zgoda udzielana jest jednorazowo. Kolejne obciążenia następują
                automatycznie, bez udziału Klienta i bez konieczności
                podawania kodu BLIK.
              </li>
              <li>
                Kwota obciążenia jest stała i odpowiada składce miesięcznej dla
                wybranego wariantu, wskazanej w rozdziale 5.
              </li>
              <li>
                Obciążenia realizowane są raz w miesiącu,{" "}
                <Wartosc
                  wartosc={PLATNOSCI.dzienObciazenia}
                  opis="dzień obciążenia do uzupełnienia"
                />
                , w Miesiącach treningowych. W miesiącach wyłączonych z cyklu
                obciążenie nie jest realizowane.
              </li>
              <li>
                Zgoda obowiązuje do czasu jej odwołania przez Klienta albo do
                zakończenia umowy. Zgoda wygasa również w razie zmiany kwoty
                składki, ponieważ obciążenie kwotą inną niż objęta zgodą nie
                jest dopuszczalne.
              </li>
              <li>
                Przed udzieleniem zgody Klient otrzymuje informację o kwocie
                obciążenia, jego częstotliwości, dniu pobrania, okresie
                obowiązywania zgody oraz sposobie jej odwołania. Informacja ta
                prezentowana jest przed podaniem kodu BLIK. Zgoda na obciążanie
                cykliczne jest wyrażana odrębnie od akceptacji regulaminu
                i polityki prywatności.
              </li>
              <li>
                Klient otrzymuje wiadomość e-mail o każdym zrealizowanym
                obciążeniu, na adres podany przy zapisie.
              </li>
            </ol>

            <h3>6.4. Odwołanie zgody na obciążanie cykliczne</h3>
            <ol>
              <li>
                Zgodę można odwołać w każdej chwili, w sposób nie bardziej
                skomplikowany niż sposób jej udzielenia.
              </li>
              <li>
                Odwołanie zgody następuje{" "}
                {FUNKCJE.panelUczestnika
                  ? "przez panel Uczestnika w Serwisie, przez wiadomość e-mail wysłaną na adres "
                  : "przez wiadomość e-mail wysłaną na adres "}
                <Wartosc wartosc={KONTAKT.email} opis="adres do uzupełnienia" />{" "}
                albo bezpośrednio w aplikacji bankowej Klienta, w sekcji zgód
                i płatności cyklicznych.
              </li>
              <li>
                Odwołanie zgody wstrzymuje kolejne obciążenia. Okres opłacony
                przed odwołaniem zgody pozostaje ważny do jego zakończenia.
              </li>
              <li>
                Odwołanie zgody nie wymaga kontaktu telefonicznego, wizyty
                osobistej ani podania przyczyny.
              </li>
            </ol>

            <h3>6.5. Nieudane obciążenie</h3>
            <ol>
              <li>
                Nieudane obciążenie cykliczne nie jest ponawiane automatycznie
                przez Operatora płatności.
              </li>
              <li>
                O nieudanym obciążeniu Usługodawca informuje Klienta wiadomością
                e-mail w dniu jego wystąpienia.
              </li>
              <li>
                Usługodawca podejmuje jedną ponowną próbę obciążenia, po upływie
                5 dni roboczych od pierwszej próby.
              </li>
              <li>
                Jeżeli druga próba również zakończy się niepowodzeniem,
                Usługodawca kontaktuje się z Klientem w celu ustalenia innej
                formy uregulowania składki. Do czasu uregulowania zaległości
                Usługodawca może wstrzymać udział Uczestnika w Zajęciach, nie
                wcześniej jednak niż po upływie 14 dni od dnia pierwszego
                nieudanego obciążenia i po uprzednim poinformowaniu Klienta.
              </li>
            </ol>

            <h3>6.6. Zwroty i dowody sprzedaży</h3>
            <ol>
              <li>
                Zwrot środków realizowany jest w terminie{" "}
                {PLATNOSCI.terminZwrotu} od dnia uznania odstąpienia albo
                reklamacji, tą samą metodą, którą dokonano płatności, chyba że
                Klient wyraźnie zgodzi się na inny sposób zwrotu.
              </li>
              <li>
                Po każdej zaksięgowanej płatności Usługodawca wysyła
                potwierdzenie na adres poczty elektronicznej podany przy
                zapisie.
              </li>
              <li>
                Na żądanie zgłoszone przy zakupie Usługodawca wystawia fakturę.
              </li>
            </ol>

            {/* 7 --------------------------------------------------------- */}
            <h2 id="czas-trwania">7. Czas trwania umowy i rezygnacja</h2>
            <ol>
              <li>
                Subskrypcja zawierana jest na czas nieokreślony. Pakiet
                zawierany jest na czas oznaczony, odpowiadający liczbie
                opłaconych Miesięcy treningowych.
              </li>
              <li>
                Klient może wypowiedzieć Subskrypcję w każdej chwili, ze skutkiem
                na koniec opłaconego Miesiąca treningowego. Wypowiedzenie
                zgłoszone najpóźniej na 7 dni przed dniem obciążenia powoduje,
                że kolejne obciążenie nie zostanie zrealizowane.
              </li>
              <li>
                Wypowiedzenie zgłoszone później niż na 7 dni przed dniem
                obciążenia może skutkować pobraniem składki za kolejny Miesiąc
                treningowy. W takim przypadku Uczestnik zachowuje prawo do
                udziału w Zajęciach przez cały opłacony miesiąc.
              </li>
              <li>
                Wypowiedzenie następuje przez odwołanie zgody na obciążanie
                cykliczne
                {FUNKCJE.panelUczestnika
                  ? ", przez panel Uczestnika albo wiadomością e-mail"
                  : " albo wiadomością e-mail"}
                . Nie jest wymagana forma pisemna.
              </li>
              <li>
                W przypadku Pakietu opłaconego z góry Klient może zrezygnować
                z dalszego uczestnictwa w każdej chwili. Rozliczenie następuje
                w ten sposób, że wykorzystane Miesiące treningowe rozlicza się
                według stawki składki miesięcznej właściwej dla danej grupy
                i wariantu, bez uwzględnienia zniżki pakietowej, a pozostała
                część wpłaty podlega zwrotowi. Miesiąc rozpoczęty liczy się
                jako wykorzystany w całości.
              </li>
              <li>
                Usługodawca może wypowiedzieć umowę z zachowaniem miesięcznego
                okresu wypowiedzenia, a w razie rażącego naruszenia przez
                Uczestnika zasad bezpieczeństwa albo regulaminu sali, ze skutkiem
                natychmiastowym. W tym drugim przypadku Klientowi przysługuje
                zwrot za niewykorzystany okres, rozliczony zgodnie z zasadą
                z punktu 5.
              </li>
            </ol>

            {/* 8 --------------------------------------------------------- */}
            <h2 id="odstapienie">8. Prawo odstąpienia od umowy</h2>
            <ol>
              <li>
                Klient będący konsumentem, a także osoba fizyczna zawierająca
                umowę bezpośrednio związaną z jej działalnością gospodarczą,
                gdy umowa nie ma dla niej charakteru zawodowego, może odstąpić
                od umowy zawartej na odległość w terminie{" "}
                {PLATNOSCI.okresOdstapienia} od dnia jej zawarcia, bez podania
                przyczyny.
              </li>
              <li>
                Oświadczenie o odstąpieniu można złożyć wiadomością e-mail na
                adres{" "}
                <Wartosc wartosc={KONTAKT.email} opis="adres do uzupełnienia" />{" "}
                albo pisemnie na adres siedziby Usługodawcy. Wzór oświadczenia
                stanowi załącznik do niniejszego regulaminu, jego użycie nie
                jest obowiązkowe.
              </li>
              <li>
                Do zachowania terminu wystarczy wysłanie oświadczenia przed jego
                upływem.
              </li>
              <li>
                Jeżeli Klient chce, aby Uczestnik zaczął korzystać z Zajęć
                przed upływem terminu na odstąpienie, składa wyraźne żądanie
                rozpoczęcia świadczenia usługi przed upływem tego terminu. Bez
                takiego żądania Uczestnik może przystąpić do Zajęć dopiero po
                upływie {PLATNOSCI.okresOdstapienia} od zawarcia umowy.
              </li>
              <li>
                W razie odstąpienia po rozpoczęciu świadczenia usługi Klient
                zobowiązany jest zapłacić za świadczenia spełnione do chwili
                odstąpienia. Kwotę tę oblicza się proporcjonalnie, według liczby
                Zajęć, które odbyły się w tym okresie, w stosunku do liczby
                Zajęć objętych opłaconym okresem.
              </li>
              <li>
                Usługodawca zwraca pozostałą część wpłaty w terminie{" "}
                {PLATNOSCI.terminZwrotu} od otrzymania oświadczenia
                o odstąpieniu.
              </li>
            </ol>

            {/* 9 --------------------------------------------------------- */}
            <h2 id="nieobecnosci">9. Nieobecności i odwołane zajęcia</h2>
            <ol>
              <li>
                Składka miesięczna ma charakter stały i nie zależy od liczby
                obecności Uczestnika w danym Miesiącu treningowym. Nieobecność
                Uczestnika nie obniża składki i nie uprawnia do zwrotu jej
                części.
              </li>
              <li>
                Uczestnik może odrobić nieobecność, uczestnicząc w Zajęciach
                innej grupy o zbliżonym poziomie, po wcześniejszym uzgodnieniu
                z prowadzącym i w miarę dostępności miejsc.
              </li>
              <li>
                Jeżeli Zajęcia zostaną odwołane z przyczyn leżących po stronie
                Usługodawcy, wyznacza on termin odrobienia tych Zajęć.
                W przypadku braku możliwości ich odrobienia w danym roku
                szkolnym, Usługodawca obniża odpowiednio najbliższą składkę albo
                zwraca jej część.
              </li>
              <li>
                Dłuższa, udokumentowana nieobecność Uczestnika, trwająca co
                najmniej jeden pełny Miesiąc treningowy, może być podstawą do
                zawieszenia Subskrypcji na wniosek Klienta. Na czas zawieszenia
                obciążenia nie są realizowane.
              </li>
            </ol>

            {/* 10 -------------------------------------------------------- */}
            <h2 id="obowiazki">10. Obowiązki uczestnika</h2>
            <ol>
              <li>
                Uczestnik zobowiązany jest stosować się do poleceń prowadzącego
                Zajęcia, do regulaminu obiektu, w którym odbywają się Zajęcia,
                oraz do zasad bezpieczeństwa obowiązujących na sali.
              </li>
              <li>
                Uczestnik przystępuje do Zajęć w stroju sportowym i w obuwiu
                przeznaczonym do ćwiczeń albo boso, zgodnie z zasadami
                obowiązującymi w danej grupie.
              </li>
              <li>
                Przed przystąpieniem do Zajęć Uczestnik, a w przypadku
                Uczestnika małoletniego jego Opiekun prawny, składa pisemne
                oświadczenie o braku przeciwwskazań zdrowotnych do udziału
                w zajęciach sportowych. Oświadczenie składane jest w formie
                papierowej na sali treningowej. Usługodawca nie zbiera informacji
                o stanie zdrowia za pośrednictwem Serwisu.
              </li>
              <li>
                Uczestnik zobowiązany jest niezwłocznie poinformować
                prowadzącego o urazie, złym samopoczuciu albo innej okoliczności
                mogącej wpływać na bezpieczeństwo jego udziału w Zajęciach.
              </li>
              <li>
                Techniki poznawane na Zajęciach mogą być stosowane wyłącznie
                w ramach treningu oraz w granicach obrony koniecznej.
              </li>
              <li>
                Uczestnik małoletni pozostaje pod opieką Usługodawcy wyłącznie
                w czasie trwania Zajęć, na terenie sali treningowej.
              </li>
            </ol>

            {/* 11 -------------------------------------------------------- */}
            <h2 id="odpowiedzialnosc">11. Odpowiedzialność</h2>
            <ol>
              <li>
                Usługodawca ponosi odpowiedzialność za niewykonanie albo
                nienależyte wykonanie umowy na zasadach określonych w Kodeksie
                cywilnym. Postanowienia regulaminu nie wyłączają ani nie
                ograniczają praw konsumenta wynikających z przepisów
                bezwzględnie obowiązujących.
              </li>
              <li>
                Zajęcia sztuk walki wiążą się z ryzykiem urazu typowym dla
                aktywności fizycznej z kontaktem. Usługodawca prowadzi Zajęcia
                w sposób zorganizowany i nadzorowany, dostosowując intensywność
                do wieku i poziomu Uczestników.
              </li>
              <li>
                Usługodawca nie ponosi odpowiedzialności za szkody powstałe
                wskutek nieprzestrzegania przez Uczestnika poleceń prowadzącego,
                zasad bezpieczeństwa albo zatajenia przeciwwskazań zdrowotnych.
              </li>
              <li>
                Usługodawca nie ponosi odpowiedzialności za rzeczy pozostawione
                w szatni oraz na terenie obiektu, poza rzeczami przekazanymi do
                przechowania.
              </li>
            </ol>

            {/* 12 -------------------------------------------------------- */}
            <h2 id="reklamacje">12. Reklamacje</h2>
            <ol>
              <li>
                Reklamację można złożyć wiadomością e-mail na adres{" "}
                <Wartosc wartosc={KONTAKT.email} opis="adres do uzupełnienia" />{" "}
                albo pisemnie na adres siedziby Usługodawcy.
              </li>
              <li>
                Reklamacja powinna zawierać dane Uczestnika, opis zastrzeżeń
                oraz oczekiwany sposób załatwienia sprawy.
              </li>
              <li>
                Usługodawca rozpatruje reklamację w terminie{" "}
                {PLATNOSCI.terminReklamacji} od dnia jej otrzymania i informuje
                o wyniku tą samą drogą, którą reklamacja została złożona.
              </li>
              <li>
                Brak odpowiedzi w terminie wskazanym w punkcie 3 oznacza uznanie
                reklamacji zgodnie z żądaniem Klienta będącego konsumentem.
              </li>
              <li>
                Reklamacje dotyczące przebiegu samej transakcji płatniczej
                Klient może kierować bezpośrednio do Operatora płatności,
                zgodnie z jego regulaminem.
              </li>
            </ol>

            {/* 13 -------------------------------------------------------- */}
            <h2 id="spory">13. Pozasądowe rozwiązywanie sporów</h2>
            <ol>
              <li>
                Klient będący konsumentem może skorzystać z pozasądowych
                sposobów rozpatrywania reklamacji i dochodzenia roszczeń,
                w szczególności zwrócić się do stałego polubownego sądu
                konsumenckiego albo do wojewódzkiego inspektora Inspekcji
                Handlowej z wnioskiem o wszczęcie postępowania mediacyjnego.
              </li>
              <li>
                Bezpłatną pomoc w sprawie sporu można uzyskać u powiatowego
                albo miejskiego rzecznika konsumentów, a także w organizacjach
                społecznych zajmujących się ochroną konsumentów.
              </li>
              <li>
                Pod adresem{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  ec.europa.eu/consumers/odr
                </a>{" "}
                dostępna jest platforma internetowego systemu rozstrzygania
                sporów pomiędzy konsumentami i przedsiębiorcami na szczeblu
                unijnym.
              </li>
              <li>
                Skorzystanie z pozasądowych sposobów rozpatrywania reklamacji
                ma charakter dobrowolny.
              </li>
            </ol>

            {/* 14 -------------------------------------------------------- */}
            <h2 id="zmiany">14. Zmiany regulaminu</h2>
            <ol>
              <li>
                Usługodawca może zmienić regulamin z ważnych przyczyn,
                w szczególności w razie zmiany przepisów prawa, zmiany zakresu
                świadczonych usług, zmiany cennika albo zmiany zasad współpracy
                z Operatorem płatności.
              </li>
              <li>
                O zmianie regulaminu Usługodawca informuje wiadomością e-mail
                wysłaną na adres podany przy zapisie oraz przez publikację nowej
                wersji w Serwisie, z wyprzedzeniem co najmniej 14 dni przed
                wejściem zmian w życie.
              </li>
              <li>
                Klient, który nie akceptuje zmian, może wypowiedzieć umowę do
                dnia wejścia zmian w życie, ze skutkiem na koniec opłaconego
                okresu. Brak wypowiedzenia oznacza akceptację nowej wersji.
              </li>
              <li>
                Zmiana wysokości składki nie następuje automatycznie
                w ramach trwającej Subskrypcji. Obciążenie nową kwotą wymaga
                odwołania dotychczasowej zgody na obciążanie cykliczne
                i udzielenia nowej.
              </li>
              <li>
                Zmiana regulaminu nie wpływa na warunki Pakietów opłaconych
                przed wejściem zmian w życie.
              </li>
              <li>
                Usługodawca przechowuje wszystkie wersje regulaminu wraz
                z datami ich obowiązywania. Do umowy stosuje się wersję
                obowiązującą w chwili jej zawarcia.
              </li>
            </ol>

            {/* 15 -------------------------------------------------------- */}
            <h2 id="koncowe">15. Postanowienia końcowe</h2>
            <ol>
              <li>
                W sprawach nieuregulowanych regulaminem stosuje się przepisy
                prawa polskiego, w szczególności Kodeksu cywilnego oraz ustawy
                o prawach konsumenta.
              </li>
              <li>
                Zasady przetwarzania danych osobowych określa{" "}
                <Link href="/polityka-prywatnosci">polityka prywatności</Link>.
              </li>
              <li>
                Regulamin jest dostępny w Serwisie w formie umożliwiającej jego
                pobranie, utrwalenie i wydrukowanie.
              </li>
              <li>
                Regulamin w wersji {DOKUMENTY.regulaminWersja} obowiązuje od{" "}
                {DOKUMENTY.regulaminData}.
              </li>
            </ol>

            {/* Załącznik ------------------------------------------------- */}
            <h2 id="zalacznik">
              Załącznik. Wzór oświadczenia o odstąpieniu od umowy
            </h2>
            <p>
              Formularz należy wypełnić i odesłać tylko w przypadku chęci
              odstąpienia od umowy. Skorzystanie z tego wzoru nie jest
              obowiązkowe.
            </p>

            <div className="zalacznik">
              <p style={{ marginBottom: "22px" }}>
                Adresat: {SPOLKA.nazwaPelna}, {ADRES_SPOLKI_JEDNA_LINIA}
                {emailKontaktowy ? `, ${emailKontaktowy}` : ""}
              </p>

              <p style={{ marginBottom: "22px" }}>
                Ja, niżej podpisany, niniejszym informuję o moim odstąpieniu od
                umowy o świadczenie usługi polegającej na udziale w zajęciach
                sztuk walki.
              </p>

              <p style={{ marginBottom: 0 }}>Data zawarcia umowy</p>
              <span className="linia-do-wypelnienia" aria-hidden="true" />

              <p style={{ marginBottom: 0 }}>Imię i nazwisko konsumenta</p>
              <span className="linia-do-wypelnienia" aria-hidden="true" />

              <p style={{ marginBottom: 0 }}>Imię i nazwisko uczestnika zajęć</p>
              <span className="linia-do-wypelnienia" aria-hidden="true" />

              <p style={{ marginBottom: 0 }}>Adres konsumenta</p>
              <span className="linia-do-wypelnienia" aria-hidden="true" />

              <p style={{ marginBottom: 0 }}>
                Podpis, wymagany wyłącznie przy przesłaniu formularza w wersji
                papierowej
              </p>
              <span className="linia-do-wypelnienia" aria-hidden="true" />

              <p style={{ marginBottom: 0 }}>Data</p>
              <span
                className="linia-do-wypelnienia"
                aria-hidden="true"
                style={{ marginBottom: 0 }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
