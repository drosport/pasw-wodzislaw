import { NextResponse } from "next/server";
import { KONTAKT, MARKA, brakuje } from "@/lib/dane";

export const runtime = "nodejs";

type Zgloszenie = Record<string, unknown>;

const POLA_WYMAGANE: Record<string, string[]> = {
  zapis: ["imie", "nazwisko", "email", "telefon", "grupa", "wariant"],
  kontakt: ["imie", "nazwisko", "email", "temat", "wiadomosc"],
};

function tekst(wartosc: unknown, limit = 2000): string {
  if (typeof wartosc !== "string") return "";
  return wartosc.trim().slice(0, limit);
}

function poprawnyEmail(wartosc: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(wartosc);
}

function escapujHtml(wartosc: string): string {
  return wartosc
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* Prosty limit zgłoszeń na adres IP, w pamięci procesu. */
const historia = new Map<string, number[]>();
const OKNO_MS = 10 * 60 * 1000;
const LIMIT = 5;

function przekroczonyLimit(klucz: string): boolean {
  const teraz = Date.now();
  const proby = (historia.get(klucz) ?? []).filter((czas) => teraz - czas < OKNO_MS);
  proby.push(teraz);
  historia.set(klucz, proby);
  if (historia.size > 5000) historia.clear();
  return proby.length > LIMIT;
}

export async function POST(zadanie: Request) {
  let dane: Zgloszenie;
  try {
    dane = (await zadanie.json()) as Zgloszenie;
  } catch {
    return NextResponse.json({ blad: "Nieprawidłowe żądanie." }, { status: 400 });
  }

  /* Pułapka na roboty. Odpowiadamy powodzeniem, żeby nie ułatwiać obejścia. */
  if (tekst(dane.strona_www)) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    zadanie.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    zadanie.headers.get("x-real-ip") ||
    "nieznane";

  if (przekroczonyLimit(ip)) {
    return NextResponse.json(
      {
        blad:
          "Wysłano zbyt wiele zgłoszeń z tego adresu. Spróbuj ponownie za kilka minut albo skontaktuj się telefonicznie.",
      },
      { status: 429 }
    );
  }

  const typ = tekst(dane.typ, 20) === "kontakt" ? "kontakt" : "zapis";

  const pola = {
    imie: tekst(dane.imie, 80),
    nazwisko: tekst(dane.nazwisko, 80),
    email: tekst(dane.email, 120),
    telefon: tekst(dane.telefon, 30),
    grupa: tekst(dane.grupa, 120),
    wariant: tekst(dane.wariant, 160),
    temat: tekst(dane.temat, 120),
    opiekun: tekst(dane.opiekun, 120),
    wiadomosc: tekst(dane.wiadomosc, 2000),
  };

  const brakujace = POLA_WYMAGANE[typ].filter(
    (pole) => !pola[pole as keyof typeof pola]
  );
  if (brakujace.length > 0) {
    return NextResponse.json(
      { blad: "Uzupełnij wszystkie pola oznaczone jako obowiązkowe." },
      { status: 400 }
    );
  }

  if (!poprawnyEmail(pola.email)) {
    return NextResponse.json(
      { blad: "Podany adres e-mail wygląda na nieprawidłowy." },
      { status: 400 }
    );
  }

  if (dane.zgoda_dane !== "on" && dane.zgoda_dane !== true) {
    return NextResponse.json(
      { blad: "Potwierdź zapoznanie się z polityką prywatności." },
      { status: 400 }
    );
  }

  const wiersze: [string, string][] =
    typ === "zapis"
      ? [
          ["Imię i nazwisko", `${pola.imie} ${pola.nazwisko}`],
          ["Adres e-mail", pola.email],
          ["Telefon", pola.telefon],
          ["Grupa wiekowa", pola.grupa],
          ["Wybrany wariant", pola.wariant],
          ["Opiekun prawny", pola.opiekun || "nie podano"],
          ["Dodatkowe informacje", pola.wiadomosc || "brak"],
        ]
      : [
          ["Imię i nazwisko", `${pola.imie} ${pola.nazwisko}`],
          ["Adres e-mail", pola.email],
          ["Telefon", pola.telefon || "nie podano"],
          ["Temat", pola.temat],
          ["Wiadomość", pola.wiadomosc],
        ];

  const trescTekstowa = wiersze
    .map(([etykieta, wartosc]) => `${etykieta}: ${wartosc}`)
    .join("\n");

  const trescHtml = `
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #17181a;">
      <p style="margin:0 0 16px;">${
        typ === "zapis"
          ? "Nowe zgłoszenie na zajęcia"
          : "Nowa wiadomość z formularza kontaktowego"
      } na stronie ${escapujHtml(MARKA.nazwaPelna)}.</p>
      <table cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
        ${wiersze
          .map(
            ([etykieta, wartosc]) => `
          <tr>
            <td style="padding:6px 20px 6px 0; color:#7c8085; vertical-align:top; white-space:nowrap;">${escapujHtml(
              etykieta
            )}</td>
            <td style="padding:6px 0;">${escapujHtml(wartosc).replace(
              /\n/g,
              "<br />"
            )}</td>
          </tr>`
          )
          .join("")}
      </table>
    </div>
  `;

  const klucz = process.env.RESEND_API_KEY;
  const nadawca = process.env.ADRES_NADAWCY;
  const odbiorca = process.env.ADRES_ODBIORCY ?? KONTAKT.email;

  if (!klucz || !nadawca || brakuje(odbiorca)) {
    console.error(
      "[formularz] Brak konfiguracji wysyłki poczty. Zgłoszenie nie zostało wysłane:\n" +
        trescTekstowa
    );
    return NextResponse.json(
      {
        blad:
          "Formularz nie jest jeszcze podłączony do skrzynki pocztowej. Skontaktuj się z nami telefonicznie albo mailowo.",
      },
      { status: 503 }
    );
  }

  try {
    const odpowiedz = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${klucz}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: nadawca,
        to: [odbiorca],
        reply_to: pola.email,
        subject:
          typ === "zapis"
            ? `Zgłoszenie na zajęcia, ${pola.imie} ${pola.nazwisko}`
            : `Wiadomość ze strony, ${pola.temat}`,
        text: trescTekstowa,
        html: trescHtml,
      }),
    });

    if (!odpowiedz.ok) {
      const szczegoly = await odpowiedz.text();
      console.error("[formularz] Odpowiedź dostawcy poczty:", odpowiedz.status, szczegoly);
      return NextResponse.json(
        {
          blad:
            "Nie udało się wysłać zgłoszenia. Spróbuj ponownie za chwilę albo skontaktuj się telefonicznie.",
        },
        { status: 502 }
      );
    }
  } catch (blad) {
    console.error("[formularz] Błąd wysyłki:", blad);
    return NextResponse.json(
      {
        blad:
          "Nie udało się wysłać zgłoszenia. Spróbuj ponownie za chwilę albo skontaktuj się telefonicznie.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
