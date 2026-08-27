"use client";

import Link from "next/link";
import { useState } from "react";

type Stan = "gotowy" | "wysylanie" | "wyslany" | "blad";

/**
 * Formularz wiadomości na podstronie kontaktu. Zapis na zajęcia obsługuje
 * osobny kreator na podstronie /zapisy, razem z płatnością.
 */
export default function FormularzKontaktowy() {
  const [stan, ustawStan] = useState<Stan>("gotowy");
  const [komunikat, ustawKomunikat] = useState("");

  async function wyslij(zdarzenie: React.FormEvent<HTMLFormElement>) {
    zdarzenie.preventDefault();
    const formularz = zdarzenie.currentTarget;
    const dane = Object.fromEntries(new FormData(formularz).entries());

    ustawStan("wysylanie");
    ustawKomunikat("");

    try {
      const odpowiedz = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dane),
      });
      const tresc = await odpowiedz.json().catch(() => ({}));

      if (!odpowiedz.ok) {
        ustawStan("blad");
        ustawKomunikat(
          tresc.blad ??
            "Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę albo zadzwoń."
        );
        return;
      }

      formularz.reset();
      ustawStan("wyslany");
    } catch {
      ustawStan("blad");
      ustawKomunikat(
        "Nie udało się połączyć z serwerem. Sprawdź połączenie i spróbuj ponownie."
      );
    }
  }

  if (stan === "wyslany") {
    return (
      <div className="komunikat komunikat-sukces" role="status">
        <p style={{ fontWeight: 600, marginBottom: "8px" }}>
          Wiadomość została wysłana.
        </p>
        <p style={{ margin: 0 }}>
          Odpowiemy w ciągu dwóch dni roboczych. Jeżeli sprawa jest pilna,
          zadzwoń.
        </p>
      </div>
    );
  }

  return (
    <form className="formularz" onSubmit={wyslij}>
      <div className="para-pol">
        <div className="pole">
          <label htmlFor="imie">
            Imię <span className="wymagane">*</span>
          </label>
          <input id="imie" name="imie" type="text" required autoComplete="given-name" maxLength={80} />
        </div>
        <div className="pole">
          <label htmlFor="nazwisko">
            Nazwisko <span className="wymagane">*</span>
          </label>
          <input id="nazwisko" name="nazwisko" type="text" required autoComplete="family-name" maxLength={80} />
        </div>
      </div>

      <div className="para-pol">
        <div className="pole">
          <label htmlFor="email">
            Adres e-mail <span className="wymagane">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" maxLength={120} />
        </div>
        <div className="pole">
          <label htmlFor="telefon">Telefon</label>
          <input id="telefon" name="telefon" type="tel" autoComplete="tel" maxLength={30} />
        </div>
      </div>

      <div className="pole">
        <label htmlFor="temat">
          Czego dotyczy sprawa <span className="wymagane">*</span>
        </label>
        <select id="temat" name="temat" required defaultValue="">
          <option value="" disabled>
            Wybierz temat
          </option>
          <option value="Zapisy i pierwszy trening">Zapisy i pierwszy trening</option>
          <option value="Terminy treningów">Terminy treningów</option>
          <option value="Cennik, składki i płatności">Cennik, składki i płatności</option>
          <option value="Zniżka rodzinna">Zniżka rodzinna</option>
          <option value="Rezygnacja lub zmiana wariantu">Rezygnacja lub zmiana wariantu</option>
          <option value="Reklamacja">Reklamacja</option>
          <option value="Inna sprawa">Inna sprawa</option>
        </select>
      </div>

      <div className="pole">
        <label htmlFor="wiadomosc">
          Treść wiadomości <span className="wymagane">*</span>
        </label>
        <textarea
          id="wiadomosc"
          name="wiadomosc"
          required
          maxLength={2000}
          aria-describedby="wiadomosc-podpowiedz"
        />
        <p className="pole-podpowiedz" id="wiadomosc-podpowiedz">
          Opisz sprawę możliwie konkretnie. Nie podawaj informacji o stanie
          zdrowia, nie zbieramy takich danych przez stronę internetową.
        </p>
      </div>

      {/* Pułapka na roboty spamujące, ukryta przed użytkownikiem */}
      <div className="pole-ukryte" aria-hidden="true">
        <label htmlFor="strona-www">Nie wypełniaj tego pola</label>
        <input id="strona-www" name="strona_www" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="zgoda">
        <input id="zgoda-dane" name="zgoda_dane" type="checkbox" required />
        <label htmlFor="zgoda-dane">
          Zapoznałem się z{" "}
          <Link href="/polityka-prywatnosci">polityką prywatności</Link> i
          przyjmuję do wiadomości zasady przetwarzania danych podanych w tym
          formularzu. <span className="wymagane">*</span>
        </label>
      </div>

      {stan === "blad" && (
        <div className="komunikat komunikat-blad" role="alert">
          {komunikat}
        </div>
      )}

      <div>
        <button type="submit" className="przycisk przycisk-glowny" disabled={stan === "wysylanie"}>
          {stan === "wysylanie" ? "Wysyłanie" : "Wyślij wiadomość"}
        </button>
      </div>

      <p className="pole-podpowiedz">Pola oznaczone gwiazdką są obowiązkowe.</p>
    </form>
  );
}
