import Link from "next/link";

export default function PasWezwania({
  tytul = "Zapisy na zajęcia",
  tresc = "Wypełnij krótki formularz zgłoszeniowy, a skontaktujemy się z Tobą i ustalimy termin pierwszego treningu. Zgłoszenie nie jest zobowiązaniem do zapisu.",
  przyciskGlowny = { etykieta: "Zapisz się na zajęcia", href: "/zapisy" },
  przyciskDrugi = { etykieta: "Kontakt", href: "/kontakt" },
}: {
  tytul?: string;
  tresc?: string;
  przyciskGlowny?: { etykieta: string; href: string };
  przyciskDrugi?: { etykieta: string; href: string };
}) {
  return (
    <section className="pas-wezwania sekcja-ciemna">
      <div className="kontener">
        <div>
          <h2>{tytul}</h2>
          <p>{tresc}</p>
        </div>
        <div className="grupa-przyciskow">
          <Link href={przyciskGlowny.href} className="przycisk przycisk-glowny">
            {przyciskGlowny.etykieta}
          </Link>
          <Link href={przyciskDrugi.href} className="przycisk przycisk-obrys">
            {przyciskDrugi.etykieta}
          </Link>
        </div>
      </div>
    </section>
  );
}
