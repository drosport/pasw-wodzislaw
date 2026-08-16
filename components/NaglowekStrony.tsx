import Link from "next/link";

export default function NaglowekStrony({
  tytul,
  opis,
  okruszek,
}: {
  tytul: string;
  opis?: string;
  okruszek: string;
}) {
  return (
    <div className="naglowek-strony sekcja-ciemna">
      <div className="kontener">
        <nav className="okruszki" aria-label="Ścieżka nawigacji">
          <Link href="/">Strona główna</Link>
          <span aria-hidden="true">/</span>
          {okruszek}
        </nav>
        <h1>{tytul}</h1>
        {opis && <p className="hero-opis">{opis}</p>}
      </div>
    </div>
  );
}
