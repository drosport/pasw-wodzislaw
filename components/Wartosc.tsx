import { brakuje } from "@/lib/dane";

/**
 * Wypisuje wartość z pliku danych. Jeżeli pole nie zostało jeszcze
 * uzupełnione, oznacza je w widoczny sposób, żeby brak nie przeszedł
 * niezauważony do publikacji.
 */
export function Wartosc({
  wartosc,
  opis,
}: {
  wartosc: string;
  opis?: string;
}) {
  if (brakuje(wartosc)) {
    return (
      <span className="brak-danych" title="Pole do uzupełnienia w lib/dane.ts">
        {opis ?? "do uzupełnienia"}
      </span>
    );
  }
  return <>{wartosc}</>;
}
