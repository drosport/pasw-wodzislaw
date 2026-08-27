/**
 * Wysyłka poczty transakcyjnej przez Resend.
 *
 * Bez kompletu zmiennych środowiskowych funkcja nie udaje, że wysłała
 * wiadomość. Zwraca informację o braku konfiguracji, a treść zapisuje
 * w logach serwera, żeby zgłoszenie nie przepadło.
 */

import { KONTAKT, brakuje } from "@/lib/dane";

export type Wiersz = [string, string];

export function escapujHtml(wartosc: string): string {
  return wartosc
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function tabelaHtml(wiersze: Wiersz[]): string {
  return `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${wiersze
    .map(
      ([etykieta, wartosc]) =>
        `<tr><td style="padding:6px 20px 6px 0;color:#7c8085;vertical-align:top;white-space:nowrap;">${escapujHtml(
          etykieta
        )}</td><td style="padding:6px 0;">${escapujHtml(wartosc).replace(
          /\n/g,
          "<br />"
        )}</td></tr>`
    )
    .join("")}</table>`;
}

export async function wyslijWiadomosc(dane: {
  temat: string;
  naglowek: string;
  wiersze: Wiersz[];
  odpowiedzDo?: string;
  doKlienta?: string;
}): Promise<{ ok: boolean; powod?: string }> {
  const tekst = [dane.naglowek, "", ...dane.wiersze.map(([e, w]) => `${e}: ${w}`)].join("\n");

  const klucz = process.env.RESEND_API_KEY;
  const nadawca = process.env.ADRES_NADAWCY;
  const odbiorca = process.env.ADRES_ODBIORCY ?? KONTAKT.email;

  if (!klucz || !nadawca || brakuje(odbiorca)) {
    console.error(`[poczta] Brak konfiguracji wysyłki. Treść:\n${tekst}`);
    return { ok: false, powod: "brak-konfiguracji" };
  }

  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#17181a;"><p style="margin:0 0 16px;">${escapujHtml(
    dane.naglowek
  )}</p>${tabelaHtml(dane.wiersze)}</div>`;

  const odbiorcy = [odbiorca];
  if (dane.doKlienta && dane.doKlienta !== odbiorca) odbiorcy.push(dane.doKlienta);

  try {
    const odpowiedz = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${klucz}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: nadawca,
        to: odbiorcy,
        reply_to: dane.odpowiedzDo,
        subject: dane.temat,
        text: tekst,
        html,
      }),
    });

    if (!odpowiedz.ok) {
      console.error("[poczta] Odpowiedź dostawcy:", odpowiedz.status, await odpowiedz.text());
      return { ok: false, powod: "blad-dostawcy" };
    }
    return { ok: true };
  } catch (blad) {
    console.error("[poczta] Błąd wysyłki:", blad);
    return { ok: false, powod: "brak-polaczenia" };
  }
}
