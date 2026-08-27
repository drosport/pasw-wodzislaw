/**
 * Integracja z Przelewy24, REST API v1.
 *
 * Moduł obsługuje rejestrację transakcji, weryfikację podpisu powiadomienia
 * oraz potwierdzenie transakcji. Konfiguracja pochodzi wyłącznie ze zmiennych
 * środowiskowych, więc repozytorium nie zawiera żadnych kluczy.
 *
 * Dopóki zmienne nie są ustawione, moduł zgłasza to jawnie zamiast udawać,
 * że płatność została przyjęta.
 */

import { createHash } from "node:crypto";

const ADRES_PRODUKCYJNY = "https://secure.przelewy24.pl";
const ADRES_TESTOWY = "https://sandbox.przelewy24.pl";

export type Konfiguracja = {
  merchantId: number;
  posId: number;
  crc: string;
  apiKey: string;
  adres: string;
  tryb: "produkcja" | "sandbox";
};

export function konfiguracja(): Konfiguracja | null {
  const merchantId = Number(process.env.P24_MERCHANT_ID);
  const posId = Number(process.env.P24_POS_ID || process.env.P24_MERCHANT_ID);
  const crc = process.env.P24_CRC?.trim();
  const apiKey = process.env.P24_API_KEY?.trim();
  const sandbox = process.env.P24_SANDBOX === "true";

  if (!merchantId || !posId || !crc || !apiKey) return null;

  return {
    merchantId,
    posId,
    crc,
    apiKey,
    adres: sandbox ? ADRES_TESTOWY : ADRES_PRODUKCYJNY,
    tryb: sandbox ? "sandbox" : "produkcja",
  };
}

function podpis(dane: Record<string, unknown>): string {
  // Przelewy24 liczy sumę z dokładnej postaci tekstowej JSON, bez ukośników
  // maskujących, dlatego kolejność kluczy ma znaczenie.
  const tekst = JSON.stringify(dane).replace(/\//g, "\\/");
  return createHash("sha384").update(tekst, "utf8").digest("hex");
}

function naglowekAutoryzacji(k: Konfiguracja): string {
  return "Basic " + Buffer.from(`${k.posId}:${k.apiKey}`).toString("base64");
}

export type DaneRejestracji = {
  sessionId: string;
  /** Kwota w groszach. */
  amount: number;
  description: string;
  email: string;
  client: string;
  urlReturn: string;
  urlStatus: string;
  /** Czas na opłacenie, w minutach. Zero oznacza brak limitu. */
  timeLimit?: number;
};

export type WynikRejestracji =
  | { ok: true; token: string; adresPlatnosci: string }
  | { ok: false; blad: string; szczegoly?: string };

export async function zarejestrujTransakcje(
  dane: DaneRejestracji
): Promise<WynikRejestracji> {
  const k = konfiguracja();
  if (!k) {
    return {
      ok: false,
      blad: "brak-konfiguracji",
      szczegoly:
        "Brak zmiennych P24_MERCHANT_ID, P24_POS_ID, P24_CRC lub P24_API_KEY.",
    };
  }

  const sign = podpis({
    sessionId: dane.sessionId,
    merchantId: k.merchantId,
    amount: dane.amount,
    currency: "PLN",
    crc: k.crc,
  });

  const cialo = {
    merchantId: k.merchantId,
    posId: k.posId,
    sessionId: dane.sessionId,
    amount: dane.amount,
    currency: "PLN",
    description: dane.description,
    email: dane.email,
    client: dane.client,
    country: "PL",
    language: "pl",
    urlReturn: dane.urlReturn,
    urlStatus: dane.urlStatus,
    timeLimit: dane.timeLimit ?? 30,
    encoding: "UTF-8",
    sign,
  };

  try {
    const odpowiedz = await fetch(`${k.adres}/api/v1/transaction/register`, {
      method: "POST",
      headers: {
        Authorization: naglowekAutoryzacji(k),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cialo),
    });

    const tresc = (await odpowiedz.json().catch(() => null)) as
      | { data?: { token?: string }; error?: unknown }
      | null;

    if (!odpowiedz.ok || !tresc?.data?.token) {
      return {
        ok: false,
        blad: "odrzucone-przez-operatora",
        szczegoly: `${odpowiedz.status} ${JSON.stringify(tresc)}`,
      };
    }

    return {
      ok: true,
      token: tresc.data.token,
      adresPlatnosci: `${k.adres}/trnRequest/${tresc.data.token}`,
    };
  } catch (blad) {
    return {
      ok: false,
      blad: "brak-polaczenia",
      szczegoly: String(blad),
    };
  }
}

/** Sprawdza podpis powiadomienia przychodzącego pod adres urlStatus. */
export function poprawnePowiadomienie(
  powiadomienie: Record<string, unknown>,
  k: Konfiguracja
): boolean {
  const oczekiwany = podpis({
    merchantId: k.merchantId,
    posId: k.posId,
    sessionId: powiadomienie.sessionId,
    amount: powiadomienie.amount,
    originAmount: powiadomienie.originAmount,
    currency: powiadomienie.currency,
    orderId: powiadomienie.orderId,
    methodId: powiadomienie.methodId,
    statement: powiadomienie.statement,
    crc: k.crc,
  });
  return oczekiwany === powiadomienie.sign;
}

/**
 * Potwierdza transakcję. Bez tego kroku operator uznaje płatność za
 * niepotwierdzoną i zwraca środki kupującemu.
 */
export async function potwierdzTransakcje(dane: {
  sessionId: string;
  orderId: number;
  amount: number;
}): Promise<{ ok: boolean; szczegoly?: string }> {
  const k = konfiguracja();
  if (!k) return { ok: false, szczegoly: "brak-konfiguracji" };

  const sign = podpis({
    sessionId: dane.sessionId,
    orderId: dane.orderId,
    amount: dane.amount,
    currency: "PLN",
    crc: k.crc,
  });

  try {
    const odpowiedz = await fetch(`${k.adres}/api/v1/transaction/verify`, {
      method: "PUT",
      headers: {
        Authorization: naglowekAutoryzacji(k),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merchantId: k.merchantId,
        posId: k.posId,
        sessionId: dane.sessionId,
        amount: dane.amount,
        currency: "PLN",
        orderId: dane.orderId,
        sign,
      }),
    });

    if (!odpowiedz.ok) {
      return { ok: false, szczegoly: `${odpowiedz.status} ${await odpowiedz.text()}` };
    }
    return { ok: true };
  } catch (blad) {
    return { ok: false, szczegoly: String(blad) };
  }
}
