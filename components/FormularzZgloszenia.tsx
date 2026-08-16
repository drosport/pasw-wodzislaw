"use client";

import Link from "next/link";
import { useState } from "react";
import { GRUPY } from "@/lib/dane";

type Stan = "gotowy" | "wysylanie" | "wyslany" | "blad";
type Tryb = "zapis" | "kontakt";

export default function FormularzZgloszenia({
  tryb = "zapis",
}: {
  tryb?: Tryb;
}) {
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
        body: JSON.stringify({ ...dane, typ: tryb }),
      });
      const tresc = await odpowiedz.json().catch(() => ({}));

      if (!odpowiedz.ok) {
        ustawStan("blad");
        ustawKomunikat(
          tresc.blad ??
            "Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę albo skontaktuj się telefonicznie."
        );
        return;
      }

      formularz.reset();
      ustawStan("wyslany");
    } catch {
      ustawStan("blad");
      ustawKomunikat(
        "Nie udało się połączyć z serwerem. Sprawdź połączenie z internetem i spróbuj ponownie."
      );
    }
  }

  if (stan === "wyslany") {
    return (
      <div className="komunikat komunikat-sukces" role="status">
        <p style={{ fontWeight: 600, marginBottom: "8px" }}>
          {tryb === "zapis"
            ? "Zgłoszenie zostało wysłane."
            : "Wiadomość została wysłana."}
        </p>
        <p style={{ margin: 0 }}>
          {tryb === "zapis"
            ? "Skontaktujemy się w ciągu dwóch dni roboczych, żeby potwierdzić termin pierwszego treningu. Jeżeli sprawa jest pilna, zadzwoń."
            : "Odpowiemy w ciągu dwóch dni roboczych. Jeżeli sprawa jest pilna, zadzwoń."}
        </p>
      </div>
    );
  }

  return (
    <form className="formularz" onSubmit={wyslij}>
      <div className="para-pol">
        <div className="pole">
          <label htmlFor="imie">
            {tryb === "zapis" ? "Imię uczestnika" : "Imię"}{" "}
            <span className="wymagane">*</span>
          </label>
          <input
            id="imie"
            name="imie"
            type="text"
            required
            autoComplete="given-name"
            maxLength={80}
          />
        </div>
        <div className="pole">
          <label htmlFor="nazwisko">
            {tryb === "zapis" ? "Nazwisko uczestnika" : "Nazwisko"}{" "}
            <span className="wymagane">*</span>
          </label>
          <input
            id="nazwisko"
            name="nazwisko"
            type="text"
            required
            autoComplete="family-name"
            maxLength={80}
          />
        </div>
      </div>

      <div className="para-pol">
        <div className="pole">
          <label htmlFor="email">
            Adres e-mail <span className="wymagane">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={120}
          />
        </div>
        <div className="pole">
          <label htmlFor="telefon">
            Telefon{" "}
            {tryb === "zapis" ? <span className="wymagane">*</span> : null}
          </label>
          <input
            id="telefon"
            name="telefon"
            type="tel"
            required={tryb === "zapis"}
            autoComplete="tel"
            maxLength={30}
          />
        </div>
      </div>

      {tryb === "zapis" ? (
        <>
          <div className="para-pol">
            <div className="pole">
              <label htmlFor="grupa">
                Grupa wiekowa <span className="wymagane">*</span>
              </label>
              <select id="grupa" name="grupa" required defaultValue="">
                <option value="" disabled>
                  Wybierz grupę
                </option>
                {GRUPY.map((grupa) => (
                  <option
                    key={grupa.nazwa}
                    value={`${grupa.nazwa}, ${grupa.wiek}`}
                  >
                    {grupa.nazwa}, {grupa.wiek}
                  </option>
                ))}
              </select>
            </div>
            <div className="pole">
              <label htmlFor="wariant">
                Wybrany wariant <span className="wymagane">*</span>
              </label>
              <select id="wariant" name="wariant" required defaultValue="">
                <option value="" disabled>
                  Wybierz wariant
                </option>
                <option value="Jeden trening w tygodniu, składka miesięczna">
                  Jeden trening w tygodniu, składka miesięczna
                </option>
                <option value="Dwa treningi w tygodniu, składka miesięczna">
                  Dwa treningi w tygodniu, składka miesięczna
                </option>
                <option value="Pakiet na 5 miesięcy, płatność z góry">
                  Pakiet na 5 miesięcy, płatność z góry
                </option>
                <option value="Pakiet na rok szkolny, płatność z góry">
                  Pakiet na rok szkolny, płatność z góry
                </option>
                <option value="Wejście jednorazowe">Wejście jednorazowe</option>
                <option value="Jeszcze nie wiem, proszę o kontakt">
                  Jeszcze nie wiem, proszę o kontakt
                </option>
              </select>
            </div>
          </div>

          <div className="pole">
            <label htmlFor="opiekun">Imię i nazwisko opiekuna prawnego</label>
            <input
              id="opiekun"
              name="opiekun"
              type="text"
              maxLength={120}
              aria-describedby="opiekun-podpowiedz"
            />
            <p className="pole-podpowiedz" id="opiekun-podpowiedz">
              Wypełnij, jeżeli uczestnik nie ukończył 18 lat. Umowę zawiera
              wtedy opiekun prawny.
            </p>
          </div>
        </>
      ) : (
        <div className="pole">
          <label htmlFor="temat">
            Czego dotyczy sprawa <span className="wymagane">*</span>
          </label>
          <select id="temat" name="temat" required defaultValue="">
            <option value="" disabled>
              Wybierz temat
            </option>
            <option value="Zapisy i pierwszy trening">
              Zapisy i pierwszy trening
            </option>
            <option value="Harmonogram i terminy zajęć">
              Harmonogram i terminy zajęć
            </option>
            <option value="Cennik, składki i płatności">
              Cennik, składki i płatności
            </option>
            <option value="Rezygnacja lub zmiana wariantu">
              Rezygnacja lub zmiana wariantu
            </option>
            <option value="Reklamacja">Reklamacja</option>
            <option value="Inna sprawa">Inna sprawa</option>
          </select>
        </div>
      )}

      <div className="pole">
        <label htmlFor="wiadomosc">
          {tryb === "zapis" ? "Dodatkowe informacje" : "Treść wiadomości"}{" "}
          {tryb === "kontakt" ? <span className="wymagane">*</span> : null}
        </label>
        <textarea
          id="wiadomosc"
          name="wiadomosc"
          required={tryb === "kontakt"}
          maxLength={2000}
          aria-describedby="wiadomosc-podpowiedz"
        />
        <p className="pole-podpowiedz" id="wiadomosc-podpowiedz">
          {tryb === "zapis"
            ? "Na przykład preferowany termin zajęć albo pytanie, na które mamy odpowiedzieć."
            : "Opisz sprawę możliwie konkretnie, ułatwi to odpowiedź."}{" "}
          Nie podawaj informacji o stanie zdrowia, nie zbieramy takich danych
          przez stronę internetową.
        </p>
      </div>

      {/* Pułapka na roboty spamujące, ukryta przed użytkownikiem */}
      <div className="pole-ukryte" aria-hidden="true">
        <label htmlFor="strona-www">Nie wypełniaj tego pola</label>
        <input
          id="strona-www"
          name="strona_www"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
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
        <button
          type="submit"
          className="przycisk przycisk-glowny"
          disabled={stan === "wysylanie"}
        >
          {stan === "wysylanie"
            ? "Wysyłanie"
            : tryb === "zapis"
              ? "Wyślij zgłoszenie"
              : "Wyślij wiadomość"}
        </button>
      </div>

      <p className="pole-podpowiedz">
        Pola oznaczone gwiazdką są obowiązkowe.
        {tryb === "zapis"
          ? " Wysłanie zgłoszenia nie jest zawarciem umowy ani zobowiązaniem do zapisu."
          : ""}
      </p>
    </form>
  );
}
