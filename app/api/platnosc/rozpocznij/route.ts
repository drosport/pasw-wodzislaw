import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import {
  DOKUMENTY,
  FormaRozliczenia,
  Kategoria,
  MARKA,
  STRONA,
  policzZamowienie,
} from "@/lib/dane";
import { wyslijWiadomosc } from "@/lib/poczta";
import { zarejestrujTransakcje } from "@/lib/przelewy24";

export const runtime = "nodejs";

const FORMY_DOZWOLONE: FormaRozliczenia[] = [
  "skladka",
  "pakiet5",
  "pakiet10",
  "jednorazowe",
];
const KATEGORIE_DOZWOLONE: Kategoria[] = ["dzieci", "mlodziez", "dorosli"];

function tekst(wartosc: unknown, limit: number): string {
  return typeof wartosc === "string" ? wartosc.trim().slice(0, limit) : "";
}

function poprawnyEmail(wartosc: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(wartosc);
}

/* Limit zgłoszeń na adres IP, w pamięci procesu. */
const historia = new Map<string, number[]>();
const OKNO_MS = 10 * 60 * 1000;
const LIMIT = 8;

function przekroczonyLimit(klucz: string): boolean {
  const teraz = Date.now();
  const proby = (historia.get(klucz) ?? []).filter((czas) => teraz - czas < OKNO_MS);
  proby.push(teraz);
  historia.set(klucz, proby);
  if (historia.size > 5000) historia.clear();
  return proby.length > LIMIT;
}

export async function POST(zadanie: Request) {
  let dane: Record<string, unknown>;
  try {
    dane = (await zadanie.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ blad: "Nieprawidłowe żądanie." }, { status: 400 });
  }

  if (tekst(dane.strona_www, 50)) return NextResponse.json({ ok: true });

  const ip =
    zadanie.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    zadanie.headers.get("x-real-ip") ||
    "nieznane";
  if (przekroczonyLimit(ip)) {
    return NextResponse.json(
      { blad: "Zbyt wiele prób z tego adresu. Spróbuj ponownie za kilka minut." },
      { status: 429 }
    );
  }

  const forma = tekst(dane.forma, 20) as FormaRozliczenia;
  const kategoria = tekst(dane.kategoria, 20) as Kategoria;
  const treningi = Number(dane.treningi) === 2 ? 2 : 1;
  const nowyUczestnik = dane.nowyUczestnik === true;

  if (!FORMY_DOZWOLONE.includes(forma) || !KATEGORIE_DOZWOLONE.includes(kategoria)) {
    return NextResponse.json({ blad: "Nieznany wariant rozliczenia." }, { status: 400 });
  }

  const pola = {
    imie: tekst(dane.imie, 80),
    nazwisko: tekst(dane.nazwisko, 80),
    email: tekst(dane.email, 120),
    telefon: tekst(dane.telefon, 30),
    opiekun: tekst(dane.opiekun, 120),
    uwagi: tekst(dane.uwagi, 1000),
  };

  for (const wymagane of ["imie", "nazwisko", "email", "telefon"] as const) {
    if (!pola[wymagane]) {
      return NextResponse.json(
        { blad: "Uzupełnij wszystkie pola oznaczone jako obowiązkowe." },
        { status: 400 }
      );
    }
  }
  if (!poprawnyEmail(pola.email)) {
    return NextResponse.json(
      { blad: "Podany adres e-mail wygląda na nieprawidłowy." },
      { status: 400 }
    );
  }
  if (dane.zgodaRegulamin !== true || dane.zgodaDane !== true) {
    return NextResponse.json(
      { blad: "Zaakceptuj regulamin i potwierdź zapoznanie się z polityką prywatności." },
      { status: 400 }
    );
  }

  const zamowienie = policzZamowienie({ forma, kategoria, treningi, nowyUczestnik });

  if (zamowienie.cykliczna && dane.zgodaCykliczna !== true) {
    return NextResponse.json(
      { blad: "Aby włączyć składkę miesięczną, wyraź zgodę na obciążanie cykliczne." },
      { status: 400 }
    );
  }

  const sessionId = randomUUID();
  const opis = `${MARKA.nazwaPelna}, ${zamowienie.pozycje
    .map((p) => p.nazwa)
    .join(", ")}`.slice(0, 250);

  const wiersze: [string, string][] = [
    ["Uczestnik", `${pola.imie} ${pola.nazwisko}`],
    ["Adres e-mail", pola.email],
    ["Telefon", pola.telefon],
    ["Opiekun prawny", pola.opiekun || "nie podano"],
    ["Kategoria cenowa", kategoria],
    ["Treningi w tygodniu", String(treningi)],
    ["Forma rozliczenia", forma],
    ["Pozycje", zamowienie.pozycje.map((p) => `${p.nazwa}, ${p.kwota} zł`).join("\n")],
    [
      "Opłata wpisowa",
      nowyUczestnik ? "naliczona, pierwszy zapis" : "nie naliczona, deklaracja o wcześniejszym uczestnictwie",
    ],
    ["Do zapłaty", `${zamowienie.doZaplatyTeraz} zł`],
    [
      "Obciążenie cykliczne",
      zamowienie.cykliczna ? `tak, ${zamowienie.opisCyklu}` : "nie",
    ],
    [
      "Zaakceptowane dokumenty",
      `Regulamin ${DOKUMENTY.regulaminWersja}, Polityka prywatności ${DOKUMENTY.politykaWersja}`,
    ],
    ["Identyfikator płatności", sessionId],
    ["Uwagi", pola.uwagi || "brak"],
  ];

  await wyslijWiadomosc({
    temat: `Nowy zapis, ${pola.imie} ${pola.nazwisko}, ${zamowienie.doZaplatyTeraz} zł`,
    naglowek:
      "Zapis złożony na stronie, przed przejściem do płatności. Potwierdzenie opłacenia przyjdzie osobną wiadomością.",
    wiersze,
    odpowiedzDo: pola.email,
  });

  const wynik = await zarejestrujTransakcje({
    sessionId,
    amount: zamowienie.doZaplatyTeraz * 100,
    description: opis,
    email: pola.email,
    client: `${pola.imie} ${pola.nazwisko}`.slice(0, 50),
    urlReturn: `${STRONA.adres}/platnosc/potwierdzenie?id=${sessionId}`,
    urlStatus: `${STRONA.adres}/api/platnosc/status`,
  });

  if (!wynik.ok) {
    console.error("[platnosc] Rejestracja nieudana:", wynik.blad, wynik.szczegoly);
    const brakKluczy = wynik.blad === "brak-konfiguracji";
    return NextResponse.json(
      {
        blad: brakKluczy
          ? "Płatności online nie są jeszcze uruchomione. Twoje zgłoszenie zostało zapisane, skontaktujemy się i podamy sposób zapłaty."
          : "Nie udało się rozpocząć płatności. Spróbuj ponownie za chwilę albo skontaktuj się z nami telefonicznie.",
        zgloszenieZapisane: brakKluczy,
      },
      { status: brakKluczy ? 503 : 502 }
    );
  }

  return NextResponse.json({ ok: true, adresPlatnosci: wynik.adresPlatnosci });
}
