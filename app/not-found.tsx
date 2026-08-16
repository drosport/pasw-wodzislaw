import Link from "next/link";
import { NAWIGACJA } from "@/lib/dane";

export default function NieZnaleziono() {
  return (
    <section className="sekcja">
      <div className="kontener-waski" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <span className="etykieta">Błąd 404</span>
        <h1>Nie znaleziono strony</h1>
        <p className="wprowadzenie" style={{ marginBottom: "36px" }}>
          Podany adres nie istnieje albo strona została przeniesiona. Poniżej
          znajdują się odnośniki do głównych podstron.
        </p>
        <ul className="lista-linie">
          <li>
            <span className="etykieta-wiersza">
              <Link href="/">Strona główna</Link>
            </span>
          </li>
          {NAWIGACJA.map((pozycja) => (
            <li key={pozycja.href}>
              <span className="etykieta-wiersza">
                <Link href={pozycja.href}>{pozycja.etykieta}</Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
