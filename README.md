# Pszczyńska Akademia Sztuk Walki, sekcja Wodzisław Śląski

Strona płatnicza sekcji Wodzisław Śląski. Służy do zapisania się na zajęcia
i opłacenia ich, oraz do wykonania obowiązków informacyjnych wobec klienta
i operatora płatności.

Opis szkoły, historia Akademii i program szkolenia są na `pasw.com.pl` i nie są
tu powtarzane. Ta strona ma być chuda i skupiona na płatnościach.

Podmiotem prowadzącym jest DRO SPORT sp. z o.o. Marka PASW występuje jako nazwa
handlowa sekcji, co strona sygnalizuje w stopce każdej podstrony, na podstronie
kontaktu, na podstronie o płatnościach oraz w regulaminie. Strona główna
celowo nie powtarza danych rejestrowych, bo nikt ich tam nie szuka.

## Stos

Next.js 16 z App Routerem, React 19, TypeScript, zwykły CSS. Docelowy adres to
`drosport.pl`. Brak analityki, brak pikseli, brak banera cookies, ponieważ
strona nie ustawia plików wymagających zgody.

Jeden krój pisma na całą stronę, Archivo, pobierany w czasie budowania przez
`next/font` i serwowany z własnej domeny, bez odwołań do zewnętrznych CDN.
Jest to font zmiennoosiowy, więc wszystkie wagi mieszczą się w jednym pliku.
Polskie znaki diakrytyczne leżą w podzbiorze `latin-ext`, dlatego pobierane są
dwa podzbiory, łącznie około 67 kB. Druga rodzina kosztowałaby drugie tyle,
stąd decyzja o jednej.

Pierwsze wejście na stronę główną to około 300 kB, z czego 178 kB to
środowisko uruchomieniowe Reacta i Next.js, 67 kB fonty, 45 kB godło i 9 kB
sam dokument. Kolejne podstrony korzystają z tych zasobów z pamięci
podręcznej.

## Uruchomienie

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

Sprawdzenie, czy wszystkie dane zostały uzupełnione:

```bash
npm run sprawdz-dane
```

## Gdzie edytować treść

Wszystkie dane, które podlegają weryfikacji przez operatora płatności, oraz
wszystkie informacje zmienne znajdują się w jednym pliku: `lib/dane.ts`.
Zmiana ceny, terminu zajęć czy numeru telefonu w tym pliku aktualizuje
jednocześnie stronę główną, cennik, podstronę o płatnościach, regulamin
i politykę prywatności. Nigdzie indziej nie ma zduplikowanych kwot.

Struktura podstron:

| Ścieżka | Plik | Zawartość |
|---|---|---|
| `/` | `app/page.tsx` | Krótkie kim jesteśmy z odnośnikiem do pasw.com.pl, terminy, skrót cennika, jak zapłacić |
| `/treningi` | `app/treningi/page.tsx` | Terminy, miejsce, co zabrać na pierwszy trening |
| `/cennik` | `app/cennik/page.tsx` | Składki, wpisowe, wejście jednorazowe, pakiety, zniżki |
| `/zapisy` | `app/zapisy/page.tsx` | Trzystopniowy proces zapisu i płatności |
| `/platnosci` | `app/platnosci/page.tsx` | Metody płatności, płatność cykliczna, rezygnacja, zwroty, reklamacje |
| `/kontakt` | `app/kontakt/page.tsx` | Dane kontaktowe, dojazd, dane rejestrowe, formularz wiadomości |
| `/regulamin` | `app/regulamin/page.tsx` | Regulamin, 15 rozdziałów oraz wzór odstąpienia |
| `/polityka-prywatnosci` | `app/polityka-prywatnosci/page.tsx` | Polityka prywatności, 12 rozdziałów |
| `/platnosc/potwierdzenie` | `app/platnosc/potwierdzenie/page.tsx` | Ekran powrotu z bramki płatniczej |


## Do uzupełnienia przed publikacją

`npm run sprawdz-dane` wypisuje aktualną listę. Na stronie brakujące wartości
są oznaczone czerwonym, podkreślonym napisem, więc nie da się ich przeoczyć.
Zostały cztery pozycje. **Dwie z nich blokują wysyłkę zrzutów do Przelewy24**,
bo widać je na ekranie podsumowania płatności:

- `dzienObciazenia`, dzień miesiąca, w którym następuje obciążenie, **blokuje**
- `miesiaceWylaczone`, miesiące bez pobrania, prawdopodobnie lipiec i sierpień, **blokuje**
- sąd rejestrowy prowadzący akta rejestrowe, z odpisu z KRS
- imię i nazwisko instruktora prowadzącego sekcję

Dane kontaktowe, adres sali, terminy zajęć i program zostały uzupełnione na
podstawie oficjalnej strony Akademii, pasw.com.pl, oraz danych przekazanych
przez klienta. Warto je potwierdzić przed publikacją:

- telefon 604 422 726 oraz adres drosport.kontakt@gmail.com
- Szkoła Podstawowa nr 3, ulica 26 Marca 9, Wodzisław Śląski
- dzieci od 6 do 11 lat, środy i piątki od 17:40 do 18:40
- młodzież i osoby dorosłe, środy i piątki od 18:50 do 20:00
- opis dojazdu jest krótki i opiera się wyłącznie na adresie, warto go
  rozwinąć o przystanek, parking i właściwe wejście do budynku

Poza tym należy zweryfikować dane PayPro S.A. w stałej `OPERATOR_PLATNOSCI`.
Adres i kapitał zakładowy operatora zmieniały się w ostatnich latach, a te dane
są przepisane do regulaminu i na podstronę o płatnościach.

## Założenia przyjęte w dokumentach prawnych

Specyfikacja pozostawiła część kwestii otwartych, a regulamin nie może ich
pominąć. Poniższe rozstrzygnięcia zostały zapisane w treści i wymagają
potwierdzenia przez klienta. Każde z nich da się zmienić w jednym miejscu
w pliku odpowiedniej podstrony.

1. **Nieobecności.** Składka jest stała i nie zależy od frekwencji. Uczestnik
   może odrobić nieobecność w innej grupie o zbliżonym poziomie, po
   uzgodnieniu z prowadzącym. Regulamin, rozdział 9.
2. **Rezygnacja z pakietu opłaconego z góry.** Wykorzystane miesiące rozlicza
   się według zwykłej stawki miesięcznej, bez zniżki pakietowej, reszta
   podlega zwrotowi. Miesiąc rozpoczęty liczy się w całości. Regulamin,
   rozdział 7 punkt 5.
3. **Wypowiedzenie subskrypcji.** Skuteczne, jeżeli zgłoszone najpóźniej na
   7 dni przed dniem obciążenia. Regulamin, rozdział 7 punkty 2 i 3.
4. **Nieudane obciążenie.** Jedna ponowna próba po 5 dniach roboczych.
   Wstrzymanie udziału w zajęciach nie wcześniej niż po 14 dniach od
   pierwszego niepowodzenia i po uprzednim powiadomieniu. Regulamin, 6.5.
5. **Zmiana wariantu.** Od kolejnego miesiąca treningowego, po zgłoszeniu na
   7 dni przed jego rozpoczęciem. Regulamin, rozdział 5 punkt 8.
6. **Model płatności cyklicznej.** Przyjęto model ze stałą kwotą. Każda zmiana
   składki wymaga odwołania dotychczasowej zgody i udzielenia nowej. To jest
   pytanie numer 1 z sekcji 11 specyfikacji i wymaga potwierdzenia
   u operatora, ponieważ przesądza o sposobie obsługi podwyżek cennika oraz
   przejścia z jednego treningu na dwa.
7. **Zawieszenie subskrypcji** przy udokumentowanej nieobecności trwającej co
   najmniej miesiąc. Regulamin, rozdział 9 punkt 4.
8. **Okres przechowywania zgłoszeń**, z których nie wyniknął zapis, ustalono
   na 12 miesięcy. Polityka prywatności, rozdział 8.
9. **Czas odpowiedzi na zgłoszenie** podany na stronie to dwa dni robocze.
10. **Program zajęć** opisano jako kung-fu, jiu-jitsu i systemę, tworzące
    system zarejestrowany w 1998 roku pod nazwą Pszczyńska Sztuka Walki. Jest
    to zgodne z tym, jak Akademia przedstawia się na pasw.com.pl. Opisy
    poszczególnych elementów w stałej `DYSCYPLINY` napisane są od zera i warto,
    żeby przejrzał je instruktor.
11. **Górna granica wieku drugiej grupy.** Akademia podaje dla Wodzisławia
    dwie grupy, dzieci 6 do 11 lat oraz młodzież i dorośli, bez wskazania
    dolnej granicy tej drugiej. Przyjęto, że jest to od 12 lat.
12. **Grupy treningowe i grupy cenowe to dwie różne rzeczy.** Trening odbywa
    się w dwóch grupach, natomiast cennik ze specyfikacji ma trzy kategorie,
    w tym stawkę ulgową dla młodzieży uczącej się do 24 roku życia. Osoba
    ucząca się w wieku 20 lat trenuje w grupie młodzieży i dorosłych, ale
    płaci stawkę ulgową. Podobnie dwunastolatek trenuje w drugiej grupie,
    a płaci stawkę dziecięcą, która według cennika obowiązuje do 12 lat.
    Warto potwierdzić, że taka jest intencja.
13. **Data obowiązywania dokumentów** ustawiona jest na 1 września 2026,
    w stałej `DOKUMENTY`. Numer wersji jest istotny, ponieważ rejestr zgód
    w etapie 2 zapisuje wersję zaakceptowanego dokumentu.

Regulamin oraz polityka prywatności powinny przed publikacją zostać
przejrzane przez prawnika, w szczególności w części konsumenckiej i dotyczącej
małoletnich. Specyfikacja przewiduje to wprost.

## Proces zapisu i płatności

`/zapisy` prowadzi przez trzy etapy: wybór wariantu, dane uczestnika,
podsumowanie z płatnością. Kalkulacja siedzi w `policzZamowienie` w
`lib/dane.ts` i jest jedynym miejscem, w którym powstają kwoty.

Opłata wpisowa doliczana jest wyłącznie do pierwszej płatności i nigdy nie
wchodzi do kwoty obciążeń cyklicznych. Przy wejściu jednorazowym nie jest
naliczana wcale.

Ekran podsumowania jest ekranem, który ogląda operator przy weryfikacji. Przed
podaniem kodu BLIK pokazuje kwotę pierwszej płatności, kwotę kolejnych
obciążeń, częstotliwość, dzień pobrania, miesiące bez pobrania, okres
obowiązywania zgody i sposób jej odwołania. Zgoda na obciążanie cykliczne jest
osobnym polem, niezależnym od akceptacji regulaminu i polityki prywatności.

## Płatności, stan wdrożenia

`lib/przelewy24.ts` obsługuje REST API v1: rejestrację transakcji, sprawdzenie
podpisu powiadomienia i potwierdzenie transakcji. Klucze pochodzą wyłącznie
ze zmiennych środowiskowych, repozytorium ich nie zawiera.

| Element | Stan |
|---|---|
| Proces zakupowy, trzy etapy | Gotowe |
| Ekran podsumowania z pełną informacją o obciążeniu | Gotowe |
| Odrębna zgoda na obciążanie cykliczne | Gotowe |
| Rejestracja transakcji i przekierowanie do bramki | Gotowe, czeka na klucze |
| Powiadomienie o płatności, `POST /api/platnosc/status` | Gotowe, sprawdza podpis i potwierdza transakcję |
| Automatyczne pobranie kolejnej składki | **Brak.** Wymaga aneksu BLIK, zapisania identyfikatora zgody i harmonogramu |
| Zapis zamówień do bazy | **Brak.** Dane zapisu idą e-mailem, powiązane identyfikatorem sesji |

Dopóki zmienne `P24_*` nie są ustawione, kreator nie udaje płatności. Zapisuje
zgłoszenie, wysyła je e-mailem i pokazuje, że płatności online nie zostały
jeszcze uruchomione.

Adres powiadomień do wpisania w panelu operatora:
`https://drosport.pl/api/platnosc/status`.

## Wybór operatora płatności

Rozważano eService, bramkę oferowaną przez PKO Bank Polski, jako alternatywę
dla Przelewy24. Odrzucono we wrześniu 2026 z trzech powodów:

1. **Cykliczność u eService działa wyłącznie na kartach płatniczych**, przez
   tokenizację karty przy pierwszej transakcji. Nie obsługuje cyklicznego
   BLIK-a, wokół którego zbudowany jest proces zapisu, bo tego oczekują
   rodzice płacący składki.
2. **Nakład pracy jest identyczny.** eService potwierdził, że nie ma gotowego
   produktu subskrypcyjnego i że cała logika, czyli comiesięczne pobieranie,
   przypomnienia i ponawianie przy odrzuceniu, leży po stronie integratora.
   To samo dotyczy Przelewy24.
3. **Aneks na BLIK Płatności Cykliczne był już w toku** u Przelewy24, konto
   413088, a integracja napisana.

Gdyby w przyszłości pojawiła się potrzeba obsługi kart w cyklu, Przelewy24
obsługuje je tak samo, więc drugi operator nie byłby potrzebny.

## Formularz kontaktowy

Formularz na podstronie `/kontakt` wysyła dane do `app/api/kontakt/route.ts`.
Endpoint waliduje pola, sprawdza pułapkę na roboty, ogranicza liczbę zgłoszeń
z jednego adresu IP do pięciu na dziesięć minut, a następnie wysyła wiadomość
przez Resend. Wysyłkę współdzieli z procesem płatności, kod w `lib/poczta.ts`.

Do działania potrzebne są trzy zmienne środowiskowe, wzór w `.env.example`:

```
RESEND_API_KEY=
ADRES_NADAWCY=
ADRES_ODBIORCY=
```

Bez nich formularz zwraca czytelny komunikat, że nie jest jeszcze podłączony do
skrzynki, a treść zgłoszenia trafia do logów serwera. Nie udaje, że wysłał
wiadomość. Domena nadawcy musi być zweryfikowana u dostawcy poczty.

Jeżeli zamiast Resend ma być inny dostawca, zmienia się wyłącznie fragment
z wywołaniem `fetch` w `route.ts`. Reszta walidacji pozostaje bez zmian.

Formularz świadomie nie zawiera żadnych pytań o stan zdrowia, kontuzje ani
przeciwwskazania. Wynika to z sekcji 6 punkt 4 specyfikacji. Oświadczenia tego
rodzaju odbierane są papierowo na sali. Nie należy dodawać takich pól bez
wyraźnej decyzji klienta, ponieważ są to dane szczególnej kategorii.

## Przełączniki etapu 2

W `lib/dane.ts` znajduje się stała `FUNKCJE`. Dopóki `panelUczestnika` ma
wartość `false`, regulamin i podstrona o płatnościach nie wspominają o panelu
uczestnika, ponieważ jeszcze go nie ma, a strona nie powinna opisywać funkcji,
której weryfikator nie znajdzie. Po wdrożeniu panelu wystarczy zmienić wartość
na `true`, a odpowiednie fragmenty pojawią się same.

## Wersja mobilna

Układ jest jednokolumnowy poniżej 900 pikseli, z mniejszymi odstępami sekcji
i węższymi marginesami kontenera. Nawigacja zwija się do rozwijanego menu
poniżej 1040 pikseli.

Znak firmowy w nagłówku jest nieprzełamywalny, więc poniżej 640 i 420 pikseli
zmniejsza się stopniowo, a przycisk menu poniżej 420 pikseli zostaje samą
ikoną, z nazwą w atrybucie `aria-label`. Dzięki temu nagłówek mieści się
w 320 pikselach. Reguły dla wąskich ekranów muszą stać w arkuszu po bloku
`max-width: 1040px`, ponieważ mają tę samą specyficzność i decyduje kolejność.

Tabele cenowe poniżej 760 pikseli przestawiają się z układu poziomego na
pionowy. Zamiast przewijania w bok każdy wiersz staje się osobnym blokiem
z nazwą grupy jako nagłówkiem i podpisanymi wartościami. Etykiety kolumn
biorą się z atrybutów `data-etykieta` na komórkach, więc dodając nową kolumnę
trzeba dodać też ten atrybut.

Godło jest jednym plikiem SVG. Na ciemnych sekcjach klasa `godlo-odwrocone`
odwraca barwy filtrem CSS, dzięki czemu nie trzeba trzymać drugiego pliku.

Pola formularza mają rozmiar tekstu 16 pikseli, żeby iOS nie przybliżał
widoku przy wejściu w pole.

## Wdrożenie

Projekt jest gotowy do wdrożenia na Vercel bez dodatkowej konfiguracji. HTTPS
oraz certyfikat są tam zapewnione automatycznie, co jest wymogiem z checklisty
weryfikacyjnej. Po podpięciu domeny `drosport.pl` należy ustawić
`NEXT_PUBLIC_ADRES_STRONY`, ponieważ z tej wartości budowane są `sitemap.xml`,
`robots.txt` oraz adresy kanoniczne. Domyślna wartość w `lib/dane.ts` wskazuje
już na `https://drosport.pl`.

Nagłówki bezpieczeństwa, w tym HSTS, ustawia `next.config.ts`.

## Checklista Przelewy24

Stan względem sekcji 10 specyfikacji:

| Wymóg | Stan |
|---|---|
| Pełne dane rejestrowe na stronie | Zrobione, stopka każdej podstrony, kontakt, regulamin. Brakuje sądu rejestrowego |
| Jasne wskazanie, że usługodawcą jest DRO SPORT | Zrobione, stopka każdej podstrony, kontakt, płatności, regulamin rozdział 2 punkt 4 |
| Cennik publiczny, bez logowania | Zrobione, `/cennik`, kwoty pobierane z jednego źródła |
| Regulamin z rozwiniętą sekcją o płatnościach cyklicznych | Zrobione, rozdział 6 z podsekcjami od 6.1 do 6.6 |
| Polityka prywatności | Zrobione |
| Procedura reklamacyjna i zwroty | Zrobione, regulamin rozdział 12, `/platnosci`, `/kontakt` |
| Prawo odstąpienia w 14 dni | Zrobione, regulamin rozdział 8 wraz z wzorem oświadczenia |
| Dane kontaktowe, adres, telefon, e-mail | Zrobione |
| Logotypy metod płatności i wskazanie PayPro | Operator opisany pełnymi danymi. Oznaczenia metod są obecnie tekstowe, patrz niżej |
| HTTPS na całej domenie | Zależne od wdrożenia, Vercel zapewnia to automatycznie |
| Zero podstron w budowie | Zrobione, wszystkie podstrony mają pełną treść |
| Opis usługi zgodny z umową z operatorem | Do sprawdzenia przy zgłoszeniu, przedmiot działalności musi się zgadzać |

Oznaczenia metod płatności na `/platnosci` są obecnie napisami w ramkach.
Operator udostępnia własne pliki logotypów wraz z zasadami ich stosowania.
Po ich pobraniu wystarczy wgrać je do `public/logotypy` i podmienić zawartość
elementów listy `logotypy` na znaczniki `img`. Styl `.logotypy img` jest już
przygotowany.

## Poza zakresem etapu 1

Zapis online, baza kursantów, panel kursanta, panel administratora, integracja
z Przelewy24, cron obciążeń cyklicznych i webhook. Model danych oraz przepływy
opisują sekcje od 7 do 9 specyfikacji.
