import type { Metadata } from "next";
import Link from "next/link";
import FormularzZgloszenia from "@/components/FormularzZgloszenia";
import NaglowekStrony from "@/components/NaglowekStrony";
import { Wartosc } from "@/components/Wartosc";
import { KONTAKT, SPOLKA, brakuje } from "@/lib/dane";

export const metadata: Metadata = {
  title: "Zapisy na zajęcia",
  description:
    "Formularz zgłoszeniowy na zajęcia sztuk walki w Wodzisławiu Śląskim. Podaj grupę wiekową i wybrany wariant uczestnictwa.",
};

export default function Zapisy() {
  return (
    <>
      <NaglowekStrony
        okruszek="Zapisy"
        tytul="Zgłoszenie na zajęcia"
        opis="Wypełnij formularz, a skontaktujemy się z Tobą, żeby potwierdzić grupę i termin pierwszego treningu. Zgłoszenie nie jest zawarciem umowy."
      />

      <section className="sekcja">
        <div className="kontener">
          <div className="uklad-tresci">
            <div>
              <span className="etykieta">Formularz</span>
              <h2>Dane do zgłoszenia</h2>
              <p className="wprowadzenie" style={{ marginBottom: "44px" }}>
                Potrzebujemy podstawowych danych kontaktowych oraz informacji,
                w jakiej grupie i w jakim wariancie uczestnik chce trenować.
              </p>
              <FormularzZgloszenia />
            </div>

            <div>
              <div className="blok-danych">
                <h3>Co dzieje się po wysłaniu</h3>
                <ol className="kroki" style={{ borderTop: 0 }}>
                  <li>
                    <div>
                      <h3>Kontakt zwrotny</h3>
                      <p>
                        Odzywamy się w ciągu dwóch dni roboczych, telefonicznie
                        albo mailowo.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Pierwszy trening</h3>
                      <p>
                        Ustalamy termin. Uczestnicy niepełnoletni przychodzą
                        z opiekunem prawnym.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Zapis i płatność</h3>
                      <p>
                        Po decyzji o kontynuowaniu wybierasz wariant i formę
                        płatności. Zasady opisuje regulamin.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="blok-danych" style={{ marginTop: "24px" }}>
                <h3>Wolisz zadzwonić</h3>
                <p className="tekst-drugi" style={{ fontSize: "0.96rem" }}>
                  {brakuje(KONTAKT.telefon) ? (
                    <Wartosc wartosc={KONTAKT.telefon} opis="telefon do uzupełnienia" />
                  ) : (
                    <a href={`tel:${KONTAKT.telefonHref}`}>{KONTAKT.telefon}</a>
                  )}
                  <br />
                  {KONTAKT.godzinyKontaktu}
                </p>
              </div>

              <div className="blok-danych" style={{ marginTop: "24px" }}>
                <h3>Przetwarzanie danych</h3>
                <p className="tekst-drugi" style={{ fontSize: "0.92rem" }}>
                  Administratorem danych podanych w formularzu jest{" "}
                  {SPOLKA.nazwaPelna}. Dane przetwarzamy wyłącznie w celu
                  obsługi zgłoszenia i kontaktu w sprawie zapisu na zajęcia.
                  Przez formularz nie zbieramy informacji o stanie zdrowia.
                </p>
                <p style={{ marginTop: "18px" }}>
                  <Link href="/polityka-prywatnosci" className="link-dalej">
                    Polityka prywatności
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
