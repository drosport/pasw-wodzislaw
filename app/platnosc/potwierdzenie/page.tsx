import type { Metadata } from "next";
import Link from "next/link";
import NaglowekStrony from "@/components/NaglowekStrony";
import { KONTAKT, PLATNOSCI } from "@/lib/dane";

export const metadata: Metadata = {
  title: "Potwierdzenie płatności",
  robots: { index: false, follow: false },
};

export default async function Potwierdzenie({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  return (
    <>
      <NaglowekStrony
        okruszek="Potwierdzenie płatności"
        tytul="Dziękujemy"
        opis="Płatność została przekazana do operatora. Potwierdzenie zaksięgowania wyślemy na podany adres e-mail."
      />

      <section className="sekcja">
        <div className="kontener-waski">
          <div className="komunikat komunikat-sukces" role="status">
            <p style={{ fontWeight: 600, marginBottom: "8px" }}>
              Zgłoszenie zostało przyjęte.
            </p>
            <p style={{ margin: 0 }}>
              Skontaktujemy się w ciągu dwóch dni roboczych, żeby potwierdzić
              grupę i termin pierwszego treningu.
            </p>
          </div>

          {id && (
            <p className="przypis-tabeli" style={{ marginTop: "22px" }}>
              Identyfikator płatności: {id}. Podaj go, jeżeli będziesz pisać
              w sprawie tej wpłaty.
            </p>
          )}

          <div className="blok-danych" style={{ marginTop: "40px" }}>
            <h3>Co dalej</h3>
            <ul className="lista-kreski" style={{ fontSize: "0.96rem" }}>
              <li>
                Potwierdzenie płatności przychodzi e-mailem po zaksięgowaniu
                przez operatora, zwykle w ciągu kilku minut.
              </li>
              <li>
                Jeżeli wybrałeś składkę miesięczną, kolejne obciążenia będą
                realizowane automatycznie. Zgodę możesz odwołać w każdej chwili,
                pisząc na adres {KONTAKT.email} albo w aplikacji swojego banku.
              </li>
              <li>
                Odstąpienie od umowy przysługuje w terminie{" "}
                {PLATNOSCI.okresOdstapienia} od jej zawarcia. Zasady opisuje
                regulamin.
              </li>
            </ul>
            <p style={{ marginTop: "24px" }}>
              <Link href="/platnosci" className="link-dalej">
                Zasady płatności i rezygnacji
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
