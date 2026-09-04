/**
 * Jedyne źródło danych dla całej strony.
 *
 * Strona jest stroną płatniczą sekcji Wodzisław Śląski. Opis szkoły, historia
 * Akademii i program szkolenia znajdują się na pasw.com.pl i nie są tu
 * powtarzane. Tutaj mają być wyłącznie informacje potrzebne do zapisu,
 * opłacenia zajęć i wykonania obowiązków informacyjnych.
 *
 * Pola oznaczone stałą UZUPELNIC muszą zostać wypełnione przed publikacją.
 * Listę braków wypisuje polecenie: npm run sprawdz-dane
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

export const AKADEMIA = {
  rokZalozenia: 1957,
  zalozyciele: "Józef i Jan Brudny",
  miastoZalozenia: "Pszczyna",
  strona: "https://www.pasw.com.pl/",
  stronaEtykieta: "pasw.com.pl",
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

  salaNazwa: "Szkoła Podstawowa nr 3",
  salaUlica: "ul. 26 Marca 9",
  salaKod: "44-300",
  salaMiasto: "Wodzisław Śląski",

  godzinyKontaktu: "Poniedziałek do piątku, od 9:00 do 19:00",
} as const;

/* ------------------------------------------------------------------ */
/* Treningi                                                            */
/* ------------------------------------------------------------------ */

export type Grupa = {
  nazwa: string;
  wiek: string;
  dni: string;
  godziny: string;
};

export const GRUPY: Grupa[] = [
  {
    nazwa: "Dzieci",
    wiek: "od 6 do 11 lat",
    dni: "Środy i piątki",
    godziny: "17:40 do 18:40",
  },
  {
    nazwa: "Młodzież i osoby dorosłe",
    wiek: "od 12 lat",
    dni: "Środy i piątki",
    godziny: "18:50 do 20:00",
  },
];

export type Instruktor = {
  imie: string;
  funkcja: string;
};

export const INSTRUKTORZY: Instruktor[] = [
  {
    imie: UZUPELNIC,
    funkcja: "Instruktor prowadzący, sekcja Wodzisław Śląski",
  },
];

/* ------------------------------------------------------------------ */
/* Cennik                                                              */
/* ------------------------------------------------------------------ */

export type Kategoria = "dzieci" | "mlodziez" | "dorosli";

export const KATEGORIE: { id: Kategoria; etykieta: string; opis: string }[] = [
  {
    id: "dzieci",
    etykieta: "Dziecko do 12 lat",
    opis: "Uczestnik, który nie ukończył 12 lat",
  },
  {
    id: "mlodziez",
    etykieta: "Młodzież ucząca się",
    opis: "Uczeń lub student do ukończenia 24 roku życia",
  },
  {
    id: "dorosli",
    etykieta: "Osoba dorosła",
    opis: "Pozostali uczestnicy pełnoletni",
  },
];

/** Składka miesięczna, w złotych, według kategorii i liczby treningów. */
export const SKLADKA: Record<Kategoria, Record<1 | 2, number>> = {
  dzieci: { 1: 120, 2: 160 },
  mlodziez: { 1: 120, 2: 160 },
  dorosli: { 1: 140, 2: 180 },
};

/** Jednorazowa opłata wpisowa dla nowych uczestników. */
export const WPISOWE = 30;

export const WEJSCIE_JEDNORAZOWE = 40;

/** Pakiety opłacane z góry. Zniżka liczona od sumy składek za dany okres. */
export const PAKIETY = [
  { id: "pakiet5", miesiace: 5, znizkaProcent: 10, etykieta: "Pakiet na 5 miesięcy" },
  { id: "pakiet10", miesiace: 10, znizkaProcent: 20, etykieta: "Pakiet na rok szkolny" },
] as const;

export type IdPakietu = (typeof PAKIETY)[number]["id"];

export function cenaPakietu(
  kategoria: Kategoria,
  treningi: 1 | 2,
  idPakietu: IdPakietu
): { przed: number; po: number; miesiace: number; znizka: number } {
  const pakiet = PAKIETY.find((p) => p.id === idPakietu)!;
  const przed = SKLADKA[kategoria][treningi] * pakiet.miesiace;
  const po = Math.round((przed * (100 - pakiet.znizkaProcent)) / 100);
  return { przed, po, miesiace: pakiet.miesiace, znizka: pakiet.znizkaProcent };
}

export const ZNIZKI_RODZINNE = [
  "Drugie dziecko z tej samej rodziny, 10 procent zniżki od składki miesięcznej.",
  "Trzecie dziecko i każde kolejne, treningi bezpłatnie.",
];

export const UWAGI_CENNIK = [
  "Zniżki nie łączą się. Uczestnik korzysta z jednej, najkorzystniejszej dla siebie.",
  "Rok szkolny obejmuje 10 miesięcy treningowych.",
  "Ceny są cenami brutto i są identyczne z kwotami pobieranymi przy płatności.",
  "Zniżki rodzinne rozliczamy poza systemem płatności. Zgłoś je przed pierwszą wpłatą, ustalimy kwotę i wyślemy odnośnik do zapłaty.",
];

/* ------------------------------------------------------------------ */
/* Formy rozliczenia w koszyku                                         */
/* ------------------------------------------------------------------ */

export type FormaRozliczenia = "skladka" | "pakiet5" | "pakiet10" | "jednorazowe";

export const FORMY: {
  id: FormaRozliczenia;
  etykieta: string;
  opis: string;
  cykliczna: boolean;
}[] = [
  {
    id: "skladka",
    etykieta: "Składka miesięczna",
    opis:
      "Pobierana automatycznie co miesiąc, na podstawie jednorazowej zgody BLIK. Można ją odwołać w każdej chwili.",
    cykliczna: true,
  },
  {
    id: "pakiet5",
    etykieta: "Pakiet na 5 miesięcy",
    opis: "Jedna płatność za pięć miesięcy, ze zniżką 10 procent. Bez kolejnych pobrań.",
    cykliczna: false,
  },
  {
    id: "pakiet10",
    etykieta: "Pakiet na rok szkolny",
    opis: "Jedna płatność za dziesięć miesięcy, ze zniżką 20 procent. Bez kolejnych pobrań.",
    cykliczna: false,
  },
  {
    id: "jednorazowe",
    etykieta: "Wejście jednorazowe",
    opis: "Opłata za pojedynczy trening, bez zapisu na stałe.",
    cykliczna: false,
  },
];

export type PozycjaZamowienia = { nazwa: string; kwota: number };

export type Zamowienie = {
  pozycje: PozycjaZamowienia[];
  doZaplatyTeraz: number;
  cykliczna: boolean;
  kwotaCykliczna: number;
  opisCyklu: string;
};

/**
 * Liczy zamówienie. Wpisowe doliczane jest wyłącznie do pierwszej płatności
 * i nigdy nie wchodzi do kwoty obciążeń cyklicznych.
 */
export function policzZamowienie(wybor: {
  forma: FormaRozliczenia;
  kategoria: Kategoria;
  treningi: 1 | 2;
  nowyUczestnik: boolean;
}): Zamowienie {
  const { forma, kategoria, treningi, nowyUczestnik } = wybor;
  const pozycje: PozycjaZamowienia[] = [];
  let cykliczna = false;
  let kwotaCykliczna = 0;
  let opisCyklu = "";

  if (forma === "skladka") {
    const kwota = SKLADKA[kategoria][treningi];
    pozycje.push({
      nazwa: `Składka miesięczna, ${treningi === 1 ? "jeden trening" : "dwa treningi"} w tygodniu`,
      kwota,
    });
    cykliczna = true;
    kwotaCykliczna = kwota;
    opisCyklu = `${kwota} zł co miesiąc`;
  } else if (forma === "jednorazowe") {
    pozycje.push({ nazwa: "Wejście jednorazowe", kwota: WEJSCIE_JEDNORAZOWE });
  } else {
    const pakiet = PAKIETY.find((p) => p.id === forma)!;
    const { po } = cenaPakietu(kategoria, treningi, forma);
    pozycje.push({
      nazwa: `${pakiet.etykieta}, ${treningi === 1 ? "jeden trening" : "dwa treningi"} w tygodniu`,
      kwota: po,
    });
  }

  if (nowyUczestnik && forma !== "jednorazowe") {
    pozycje.push({ nazwa: "Opłata wpisowa, jednorazowa", kwota: WPISOWE });
  }

  return {
    pozycje,
    doZaplatyTeraz: pozycje.reduce((suma, p) => suma + p.kwota, 0),
    cykliczna,
    kwotaCykliczna,
    opisCyklu,
  };
}

/* ------------------------------------------------------------------ */
/* Płatności                                                           */
/* ------------------------------------------------------------------ */

export const PLATNOSCI = {
  // Cennik 2026/2027: płatność miesięczna do 5. dnia każdego miesiąca.
  dzienObciazenia: "5. dnia miesiąca",

  // Do potwierdzenia. Cennik mówi o 10 miesiącach treningowych,
  // ale nie wskazuje, które są wyłączone.
  miesiaceWylaczone: UZUPELNIC,

  terminZwrotu: "14 dni",
  terminReklamacji: "14 dni",
  okresOdstapienia: "14 dni",
} as const;

/**
 * Dane operatora płatności. Przed publikacją należy je zweryfikować
 * z aktualnym regulaminem Przelewy24.
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
  kapitalZakladowy: "4 737 100,00 zł, opłacony w całości",
  nadzor:
    "Krajowy rejestr dostawców usług płatniczych prowadzony przez Komisję Nadzoru Finansowego, numer wpisu IP24/2014",
} as const;

/** Rachunek do przelewu tradycyjnego, dla osób, które nie płacą online. */
export const RACHUNEK = {
  numer: "66 1020 2472 0000 6202 0781 4983",
  tytulPrzyklad: "Jan Kowalski, Wodzisław, wrzesień 2026",
} as const;

export const METODY_PLATNOSCI = [
  "BLIK, w tym płatność cykliczna dla składek miesięcznych",
  "Przelew online z konta bankowego",
  "Karta płatnicza, Visa oraz Mastercard",
  "Przelew tradycyjny na rachunek bankowy spółki",
];

/* ------------------------------------------------------------------ */
/* Podmioty przetwarzające dane                                        */
/* ------------------------------------------------------------------ */

export type Podwykonawca = {
  rola: string;
  podmiot: string;
  zakres: string;
};

export const PODWYKONAWCY: Podwykonawca[] = [
  {
    rola: "Obsługa płatności",
    podmiot: "PayPro S.A., operator serwisu Przelewy24, Poznań",
    zakres:
      "Dane niezbędne do realizacji transakcji, identyfikator zgody na obciążanie cykliczne, historia płatności",
  },
  {
    rola: "Hosting i infrastruktura",
    podmiot: "Vercel Inc., Stany Zjednoczone",
    zakres: "Dane techniczne, w tym adres IP i logi serwera, oraz dane przesyłane przez formularze",
  },
  {
    rola: "Poczta transakcyjna",
    podmiot: "Resend, Stany Zjednoczone",
    zakres: "Adres e-mail i treść wiadomości wysyłanych w związku z obsługą zapisu i płatności",
  },
  {
    rola: "Obsługa księgowa",
    podmiot: "Biuro rachunkowe obsługujące administratora",
    zakres: "Dane rozliczeniowe niezbędne do prowadzenia ksiąg i rozliczeń podatkowych",
  },
];

/* ------------------------------------------------------------------ */
/* Funkcje uruchomione na stronie                                      */
/* ------------------------------------------------------------------ */

export const FUNKCJE = {
  panelUczestnika: false,
} as const;

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
 * Adres produkcyjny, nadpisywany zmienną NEXT_PUBLIC_ADRES_STRONY. Wartość
 * pochodzi z panelu hostingu, więc jest normalizowana, bo trafia do
 * `new URL()` w metadanych układu.
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
  { etykieta: "Treningi", href: "/treningi" },
  { etykieta: "Cennik", href: "/cennik" },
  { etykieta: "Płatności", href: "/platnosci" },
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
