import { NextResponse } from "next/server";
import { wyslijWiadomosc } from "@/lib/poczta";
import { konfiguracja, poprawnePowiadomienie, potwierdzTransakcje } from "@/lib/przelewy24";

export const runtime = "nodejs";

/**
 * Adres urlStatus, pod który Przelewy24 wysyła powiadomienie o płatności.
 *
 * Kolejność jest istotna: najpierw sprawdzamy podpis, potem potwierdzamy
 * transakcję u operatora. Bez potwierdzenia operator zwraca środki kupującemu.
 */
export async function POST(zadanie: Request) {
  const k = konfiguracja();
  if (!k) {
    console.error("[platnosc] Powiadomienie odrzucone, brak konfiguracji operatora.");
    return new NextResponse("brak konfiguracji", { status: 503 });
  }

  let powiadomienie: Record<string, unknown>;
  try {
    powiadomienie = (await zadanie.json()) as Record<string, unknown>;
  } catch {
    return new NextResponse("nieprawidłowe żądanie", { status: 400 });
  }

  if (!poprawnePowiadomienie(powiadomienie, k)) {
    console.error("[platnosc] Powiadomienie z nieprawidłowym podpisem:", powiadomienie.sessionId);
    return new NextResponse("nieprawidłowy podpis", { status: 400 });
  }

  const sessionId = String(powiadomienie.sessionId ?? "");
  const orderId = Number(powiadomienie.orderId);
  const amount = Number(powiadomienie.amount);

  const potwierdzenie = await potwierdzTransakcje({ sessionId, orderId, amount });

  if (!potwierdzenie.ok) {
    console.error("[platnosc] Potwierdzenie nieudane:", sessionId, potwierdzenie.szczegoly);
    // Zwracamy błąd, żeby operator ponowił powiadomienie.
    return new NextResponse("potwierdzenie nieudane", { status: 500 });
  }

  await wyslijWiadomosc({
    temat: `Płatność zaksięgowana, ${(amount / 100).toFixed(2)} zł`,
    naglowek: "Operator potwierdził płatność. Zestaw danych zapisu przyszedł wcześniej, pod tym samym identyfikatorem.",
    wiersze: [
      ["Identyfikator płatności", sessionId],
      ["Numer zamówienia u operatora", String(orderId)],
      ["Kwota", `${(amount / 100).toFixed(2)} zł`],
      ["Metoda", String(powiadomienie.methodId ?? "nieznana")],
      ["Tytuł", String(powiadomienie.statement ?? "")],
    ],
  });

  return NextResponse.json({ ok: true });
}
