/**
 * Jedyne źródło danych dla całej strony.
 *
 * Wszystko, co widać na stronie i co podlega weryfikacji Przelewy24, pochodzi
 * z tego pliku. Pola oznaczone stałą UZUPELNIC muszą zostać wypełnione przed
 * publikacją. Listę braków wypisuje polecenie: npm run sprawdz-dane
 */

export const UZUPELNIC = "do uzupełnienia" as const;

export function brakuje(wartosc: string): boolean {
  return wartosc === UZUPELNIC || wartosc.trim() === "";
}

/* ------------------------------------------------------------------ */
/* Podmiot prowadzący                                                  */
/* ------------------------------------------------------------------ */

export const SPOLKA = {
  nazwaPelna: "DRO SPORT spółka z ograniczoną odpowiedzialnością",
  nazwaSkrocona: "DRO SPORT sp. z o.o.",
  ulica: "Tadeusza Rejtana 2",
  kodPocztowy: "44-337",
  miasto: "Jastrzębie-Zdrój",
  miastoMiejscownik: "Jastrzębiu-Zdroju",
  kraj: "Polska",
  krs: "0001256582",
  nip: "6332257229",
  regon: "545326350",

  kapitalZakladowy: "5 000,00 zł",

  // Do uzupełnienia na podstawie odpisu z KRS.
  sadRejestrowy: UZUPELNIC,
} as const;

export const ADRES_SPOLKI_JEDNA_LINIA = `${SPOLKA.ulica}, ${SPOLKA.kodPocztowy} ${SPOLKA.miasto}, ${SPOLKA.kraj}`;

/* ------------------------------------------------------------------ */
/* Marka i sekcja                                                      */
/* ------------------------------------------------------------------ */

/**
 * Fakty o Pszczyńskiej Akademii Sztuk Walki, za pasw.com.pl.
 * Sekcja Wodzisław Śląski działa w ramach tej organizacji.
 */
export const AKADEMIA = {
  rokZalozenia: 1957,
  zalozyciele: "Józef i Jan Brudny",
  zalozycielGlowny: "Józef Brudny",
  lataZalozyciela: "1942 do 2017",
  miastoZalozenia: "Pszczyna",
  rokNazwyPASW: 1990,
  rokRejestracjiStylu: 1998,
  nazwaStylu: "Pszczyńska Sztuka Walki",
  patron: "Święty Michał Archanioł",
  rokPatrona: 2010,
  dewizaLacinska: "Quis ut Deus",
  dewizaPolska: "Intelekt, duch, ciało",
} as const;

export const MARKA = {
  nazwa: "Pszczyńska Akademia Sztuk Walki",
  skrot: "PASW",
  sekcja: "Sekcja Wodzisław Śląski",
  nazwaPelna: "Pszczyńska Akademia Sztuk Walki, sekcja Wodzisław Śląski",
  motto: "Quis ut Deus",
} as const;

/* ------------------------------------------------------------------ */
/* Kontakt                                                             */
/* ------------------------------------------------------------------ */

export const KONTAKT = {
  telefon: "604 422 726",
  telefonHref: "+48604422726",
  email: "drosport.kontakt@gmail.com",
  emailDaneOsobowe: "drosport.kontakt@gmail.com",

  // Sala treningowa sekcji Wodzisław Śląski.
  salaNazwa: "Szkoła Podstawowa nr 3",
  salaUlica: "ul. 26 Marca 9",
  salaKod: "44-300",
  salaMiasto: "Wodzisław Śląski",
  dojazd:
    "Trenujemy w sali gimnastycznej Szkoły Podstawowej nr 3 przy ulicy 26 Marca 9 w Wodzisławiu Śląskim. Jeżeli przychodzisz pierwszy raz, zadzwoń, powiemy którym wejściem najłatwiej trafić na salę.",

  godzinyKontaktu: "Poniedziałek do piątku, od 9:00 do 19:00",
} as const;

/* ------------------------------------------------------------------ */
/* Zajęcia                                                             */
/* ------------------------------------------------------------------ */

export type Grupa = {
  nazwa: string;
  wiek: string;
  opis: string;
  terminy: string[];
};

export const GRUPY: Grupa[] = [
  {
    nazwa: "Dzieci",
    wiek: "od 6 do 11 lat",
    opis:
      "Zajęcia ogólnorozwojowe połączone z nauką podstaw technicznych, w tym padów, przewrotów i prostych uwolnień. Nacisk na koordynację, sprawność i dyscyplinę pracy w grupie. Ćwiczenia dobierane są do wieku, bez elementów siłowych i bez twardego kontaktu.",
    terminy: ["Środy i piątki, od 17:40 do 18:40"],
  },
  {
    nazwa: "Młodzież i osoby dorosłe",
    wiek: "od 12 lat",
    opis:
      "Pełny program techniczny, praca w parach, samoobrona i elementy pracy z bronią treningową. Grupa jest otwarta dla osób bez żadnego doświadczenia, intensywność ćwiczeń dobiera instruktor. Uczestnicy z dłuższym stażem przygotowują się do egzaminów na stopnie.",
    terminy: ["Środy i piątki, od 18:50 do 20:00"],
  },
];

export type Dyscyplina = {
  nazwa: string;
  opis: string;
};

export const DYSCYPLINY: Dyscyplina[] = [
  {
    nazwa: "Kung-fu",
    opis:
      "Techniki uderzane rękami i nogami, praca nad dystansem, równowagą i płynnością ruchu. Osobną częścią są formy oparte na obserwacji zachowań obronnych zwierząt, wprowadzone do programu w latach siedemdziesiątych.",
  },
  {
    nazwa: "Jiu-jitsu",
    opis:
      "Pady, przewroty, rzuty, dźwignie, podcięcia i uwolnienia z chwytów. Ta część programu daje najwięcej w typowych sytuacjach obronnych, w których dochodzi do zwarcia.",
  },
  {
    nazwa: "Systema",
    opis:
      "Praca nad oddechem, rozluźnieniem i naturalnym ruchem pod obciążeniem. Uzupełnia techniki twarde, ucząc reagowania bez usztywnienia i paniki.",
  },
];

export type Instruktor = {
  imie: string;
  funkcja: string;
  kwalifikacje: string[];
};

export const INSTRUKTORZY: Instruktor[] = [
  {
    imie: UZUPELNIC,
    funkcja: "Instruktor prowadzący, sekcja Wodzisław Śląski",
    kwalifikacje: [UZUPELNIC],
  },
];

/* ------------------------------------------------------------------ */
/* Cennik                                                              */
/* ------------------------------------------------------------------ */

export type WierszSkladki = {
  grupa: string;
  jedenTrening: number;
  dwaTreningi: number;
};

export const SKLADKI_MIESIECZNE: WierszSkladki[] = [
  { grupa: "Dzieci od 6 do 12 lat", jedenTrening: 120, dwaTreningi: 160 },
  {
    grupa: "Młodzież ucząca się, do ukończenia 24 roku życia",
    jedenTrening: 120,
    dwaTreningi: 160,
  },
  { grupa: "Osoby dorosłe", jedenTrening: 140, dwaTreningi: 180 },
];

export const WEJSCIE_JEDNORAZOWE = 40;

export type WierszPakietu = {
  grupa: string;
  jedenTreningPrzed: number;
  jedenTreningPo: number;
  dwaTreningiPrzed: number;
  dwaTreningiPo: number;
};

export const PAKIET_5_MIESIECY: WierszPakietu[] = [
  {
    grupa: "Dzieci i młodzież",
    jedenTreningPrzed: 600,
    jedenTreningPo: 540,
    dwaTreningiPrzed: 800,
    dwaTreningiPo: 720,
  },
  {
    grupa: "Osoby dorosłe",
    jedenTreningPrzed: 700,
    jedenTreningPo: 630,
    dwaTreningiPrzed: 900,
    dwaTreningiPo: 810,
  },
];

export const PAKIET_10_MIESIECY: WierszPakietu[] = [
  {
    grupa: "Dzieci i młodzież",
    jedenTreningPrzed: 1200,
    jedenTreningPo: 960,
    dwaTreningiPrzed: 1600,
    dwaTreningiPo: 1280,
  },
  {
    grupa: "Osoby dorosłe",
    jedenTreningPrzed: 1400,
    jedenTreningPo: 1120,
    dwaTreningiPrzed: 1800,
    dwaTreningiPo: 1440,
  },
];

export const ZNIZKI_RODZINNE = [
  "Drugie dziecko z tej samej rodziny, 10 procent zniżki od składki miesięcznej.",
  "Trzecie dziecko i każde kolejne, treningi bezpłatnie.",
];

export const UWAGI_CENNIK = [
  "Zniżki nie łączą się. Uczestnik korzysta z jednej, najkorzystniejszej dla siebie.",
  "Rok szkolny obejmuje 10 miesięcy treningowych.",
  "Ceny podane w cenniku są cenami brutto i są identyczne z kwotami pobieranymi przy płatności.",
];

/* ------------------------------------------------------------------ */
/* Funkcje uruchomione na stronie                                      */
/* ------------------------------------------------------------------ */

/**
 * Przełączniki funkcji, które pojawią się dopiero w etapie 2.
 * Dopóki są wyłączone, treść regulaminu i podstrony o płatnościach nie
 * odwołuje się do nich, żeby strona nie opisywała czegoś, czego jeszcze
 * nie ma. Po wdrożeniu wystarczy zmienić wartość na true.
 */
export const FUNKCJE = {
  panelUczestnika: false,
  platnosciOnline: false,
} as const;

/* ------------------------------------------------------------------ */
/* Płatności                                                           */
/* ------------------------------------------------------------------ */

export const PLATNOSCI = {
  // Do ustalenia z klientem i operatorem, patrz sekcja 11 specyfikacji.
  dzienObciazenia: UZUPELNIC,
  miesiaceWylaczone: UZUPELNIC,

  terminZwrotu: "14 dni",
  terminReklamacji: "14 dni",
  okresOdstapienia: "14 dni",
} as const;

/**
 * Dane operatora płatności. Przed publikacją należy je zweryfikować
 * z aktualnym regulaminem Przelewy24, ponieważ adres i kapitał zakładowy
 * PayPro S.A. zmieniały się w ostatnich latach.
 */
export const OPERATOR_PLATNOSCI = {
  nazwa: "PayPro S.A.",
  marka: "Przelewy24",
  ulica: "ul. Pastelowa 8",
  kodPocztowy: "60-198",
  miasto: "Poznań",
  miastoMiejscownik: "Poznaniu",
  krs: "0000347935",
  nip: "7792369887",
  regon: "301345068",
  sad: "Sąd Rejonowy Poznań Nowe Miasto i Wilda w Poznaniu, VIII Wydział Gospodarczy Krajowego Rejestru Sądowego",
  kapitalZakladowy: "5 476 300,00 zł, wpłacony w całości",
  nadzor:
    "Krajowy rejestr dostawców usług płatniczych prowadzony przez Komisję Nadzoru Finansowego, numer wpisu IP24/2014",
} as const;

export const METODY_PLATNOSCI = [
  "BLIK, w tym płatność cykliczna dla składek miesięcznych",
  "Przelew online z konta bankowego",
  "Karta płatnicza, Visa oraz Mastercard",
  "Przelew tradycyjny na rachunek bankowy spółki",
];

/**
 * Podmioty przetwarzające dane w imieniu administratora.
 * Lista musi odpowiadać faktycznie używanym dostawcom. Jeżeli hosting,
 * baza albo poczta transakcyjna zostaną zmienione, trzeba zaktualizować
 * ten wykaz, ponieważ polityka prywatności wymienia odbiorców z nazwy.
 */
export type Podwykonawca = {
  rola: string;
  podmiot: string;
  zakres: string;
  pozaEog: boolean;
};

export const PODWYKONAWCY: Podwykonawca[] = [
  {
    rola: "Obsługa płatności",
    podmiot: "PayPro S.A., operator serwisu Przelewy24, Poznań",
    zakres:
      "Dane niezbędne do realizacji transakcji, identyfikator zgody na obciążanie cykliczne, historia płatności",
    pozaEog: false,
  },
  {
    rola: "Hosting i infrastruktura",
    podmiot: "Vercel Inc., Stany Zjednoczone",
    zakres:
      "Dane techniczne, w tym adres IP i logi serwera, oraz dane przesyłane przez formularze",
    pozaEog: true,
  },
  {
    rola: "Baza danych",
    podmiot: "Supabase, Unia Europejska",
    zakres: "Dane uczestników, subskrypcji i rozliczeń",
    pozaEog: false,
  },
  {
    rola: "Poczta transakcyjna",
    podmiot: "Resend, Stany Zjednoczone",
    zakres:
      "Adres e-mail i treść wiadomości wysyłanych w związku z obsługą zgłoszeń i płatności",
    pozaEog: true,
  },
  {
    rola: "Obsługa księgowa",
    podmiot: "Biuro rachunkowe obsługujące administratora",
    zakres: "Dane rozliczeniowe niezbędne do prowadzenia ksiąg i rozliczeń podatkowych",
    pozaEog: false,
  },
];

/* ------------------------------------------------------------------ */
/* Dokumenty                                                           */
/* ------------------------------------------------------------------ */

export const DOKUMENTY = {
  regulaminWersja: "1.0",
  regulaminData: "1 września 2026",
  politykaWersja: "1.0",
  politykaData: "1 września 2026",
} as const;

/* ------------------------------------------------------------------ */
/* Strona                                                              */
/* ------------------------------------------------------------------ */

const ADRES_DOMYSLNY = "https://drosport.pl";

/**
 * Adres produkcyjny, nadpisywany zmienną NEXT_PUBLIC_ADRES_STRONY.
 *
 * Wartość pochodzi z panelu hostingu, więc łatwo o wpis bez protokołu albo
 * z ukośnikiem na końcu. Ponieważ trafia do `new URL()` w metadanych układu,
 * błędna wartość przerwałaby budowanie na etapie zbierania danych stron.
 * Dlatego jest tu normalizowana, a przy wartości nie do naprawienia
 * podstawiany jest adres domyślny.
 */
function adresStrony(): string {
  const surowy = process.env.NEXT_PUBLIC_ADRES_STRONY?.trim();
  if (!surowy) return ADRES_DOMYSLNY;

  const zProtokolem = /^https?:\/\//i.test(surowy) ? surowy : `https://${surowy}`;
  try {
    return new URL(zProtokolem).origin;
  } catch {
    return ADRES_DOMYSLNY;
  }
}

export const STRONA = {
  adres: adresStrony(),
} as const;

export const NAWIGACJA = [
  { etykieta: "Zajęcia", href: "/zajecia" },
  { etykieta: "Cennik", href: "/cennik" },
  { etykieta: "Płatności", href: "/platnosci" },
  { etykieta: "Zapisy", href: "/zapisy" },
  { etykieta: "Kontakt", href: "/kontakt" },
];

export const NAWIGACJA_DOKUMENTY = [
  { etykieta: "Regulamin", href: "/regulamin" },
  { etykieta: "Polityka prywatności", href: "/polityka-prywatnosci" },
  { etykieta: "Informacje o płatnościach", href: "/platnosci" },
];

/* ------------------------------------------------------------------ */
/* Pomocnicze                                                          */
/* ------------------------------------------------------------------ */

export function zl(kwota: number): string {
  return `${kwota} zł`;
}
