"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  DOKUMENTY,
  FORMY,
  FormaRozliczenia,
  KATEGORIE,
  KONTAKT,
  Kategoria,
  PLATNOSCI,
  SKLADKA,
  UZUPELNIC,
  WEJSCIE_JEDNORAZOWE,
  WPISOWE,
  brakuje,
  cenaPakietu,
  policzZamowienie,
  zl,
} from "@/lib/dane";

type Etap = 1 | 2 | 3;

const ETAPY: { numer: Etap; nazwa: string }[] = [
  { numer: 1, nazwa: "Wybór wariantu" },
  { numer: 2, nazwa: "Dane uczestnika" },
  { numer: 3, nazwa: "Podsumowanie i płatność" },
];

function kwotaFormy(
  forma: FormaRozliczenia,
  kategoria: Kategoria,
  treningi: 1 | 2
): string {
  if (forma === "skladka") return `${zl(SKLADKA[kategoria][treningi])} miesięcznie`;
  if (forma === "jednorazowe") return `${zl(WEJSCIE_JEDNORAZOWE)} jednorazowo`;
  const { po } = cenaPakietu(kategoria, treningi, forma);
  return `${zl(po)} jednorazowo`;
}

export default function Zapisy() {
  const [etap, ustawEtap] = useState<Etap>(1);
  const [wysylanie, ustawWysylanie] = useState(false);
  const [blad, ustawBlad] = useState("");
  const [zapisaneBezPlatnosci, ustawZapisaneBezPlatnosci] = useState(false);

  const [forma, ustawForme] = useState<FormaRozliczenia>("skladka");
  const [kategoria, ustawKategorie] = useState<Kategoria>("dzieci");
  const [treningi, ustawTreningi] = useState<1 | 2>(1);
  const [nowyUczestnik, ustawNowyUczestnik] = useState(true);

  const [imie, ustawImie] = useState("");
  const [nazwisko, ustawNazwisko] = useState("");
  const [email, ustawEmail] = useState("");
  const [telefon, ustawTelefon] = useState("");
  const [opiekun, ustawOpiekuna] = useState("");
  const [uwagi, ustawUwagi] = useState("");

  const [zgodaRegulamin, ustawZgodeRegulamin] = useState(false);
  const [zgodaDane, ustawZgodeDane] = useState(false);
  const [zgodaCykliczna, ustawZgodeCykliczna] = useState(false);

  const zamowienie = useMemo(
    () => policzZamowienie({ forma, kategoria, treningi, nowyUczestnik }),
    [forma, kategoria, treningi, nowyUczestnik]
  );

  const jednorazowe = forma === "jednorazowe";
  const dzien = brakuje(PLATNOSCI.dzienObciazenia)
    ? UZUPELNIC
    : PLATNOSCI.dzienObciazenia;

  function dalej(docelowy: Etap) {
    ustawBlad("");
    ustawEtap(docelowy);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function sprawdzDane(): boolean {
    if (!imie.trim() || !nazwisko.trim() || !email.trim() || !telefon.trim()) {
      ustawBlad("Uzupełnij wszystkie pola oznaczone jako obowiązkowe.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      ustawBlad("Podany adres e-mail wygląda na nieprawidłowy.");
      return false;
    }
    return true;
  }

  async function zaplac() {
    ustawBlad("");
    if (!zgodaRegulamin || !zgodaDane) {
      ustawBlad("Zaakceptuj regulamin i potwierdź zapoznanie się z polityką prywatności.");
      return;
    }
    if (zamowienie.cykliczna && !zgodaCykliczna) {
      ustawBlad("Aby włączyć składkę miesięczną, wyraź zgodę na obciążanie cykliczne.");
      return;
    }

    ustawWysylanie(true);
    try {
      const odpowiedz = await fetch("/api/platnosc/rozpocznij", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          forma,
          kategoria,
          treningi,
          nowyUczestnik,
          imie,
          nazwisko,
          email,
          telefon,
          opiekun,
          uwagi,
          zgodaRegulamin,
          zgodaDane,
          zgodaCykliczna,
          strona_www: "",
        }),
      });
      const tresc = await odpowiedz.json().catch(() => ({}));

      if (odpowiedz.ok && tresc.adresPlatnosci) {
        window.location.href = tresc.adresPlatnosci;
        return;
      }

      ustawWysylanie(false);
      ustawZapisaneBezPlatnosci(tresc.zgloszenieZapisane === true);
      ustawBlad(tresc.blad ?? "Nie udało się rozpocząć płatności. Spróbuj ponownie.");
    } catch {
      ustawWysylanie(false);
      ustawBlad("Nie udało się połączyć z serwerem. Sprawdź połączenie i spróbuj ponownie.");
    }
  }

  if (zapisaneBezPlatnosci) {
    return (
      <div className="komunikat komunikat-sukces" role="status">
        <p style={{ fontWeight: 600, marginBottom: "8px" }}>
          Zgłoszenie zostało zapisane.
        </p>
        <p style={{ margin: 0 }}>
          Płatności online nie są jeszcze uruchomione. Skontaktujemy się w ciągu
          dwóch dni roboczych i podamy sposób zapłaty. Jeżeli sprawa jest pilna,
          zadzwoń pod numer {KONTAKT.telefon}.
        </p>
      </div>
    );
  }

  return (
    <div>
      <ol className="kroki-paska">
        {ETAPY.map((e) => (
          <li
            key={e.numer}
            aria-current={e.numer === etap ? "step" : undefined}
            data-zrobione={e.numer < etap ? "tak" : "nie"}
          >
            {e.nazwa}
          </li>
        ))}
      </ol>

      {/* Etap 1 ------------------------------------------------------- */}
      {etap === 1 && (
        <div>
          <fieldset className="pole-zestaw">
            <legend className="legenda-wyboru">Forma rozliczenia</legend>
            <div className="wybor">
              {FORMY.map((f) => (
                <label key={f.id}>
                  <input
                    type="radio"
                    name="forma"
                    value={f.id}
                    checked={forma === f.id}
                    onChange={() => ustawForme(f.id)}
                  />
                  <span>
                    <span className="wybor-nazwa">{f.etykieta}</span>
                    <span className="wybor-opis">{f.opis}</span>
                    <span className="wybor-kwota">
                      {kwotaFormy(f.id, kategoria, treningi)}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="pole-zestaw">
            <legend className="legenda-wyboru">Kategoria uczestnika</legend>
            <div className="wybor">
              {KATEGORIE.map((k) => (
                <label key={k.id}>
                  <input
                    type="radio"
                    name="kategoria"
                    value={k.id}
                    checked={kategoria === k.id}
                    onChange={() => ustawKategorie(k.id)}
                  />
                  <span>
                    <span className="wybor-nazwa">{k.etykieta}</span>
                    <span className="wybor-opis">{k.opis}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {!jednorazowe && (
            <fieldset className="pole-zestaw">
              <legend className="legenda-wyboru">Liczba treningów w tygodniu</legend>
              <div className="wybor wybor-dwie">
                {([1, 2] as const).map((n) => (
                  <label key={n}>
                    <input
                      type="radio"
                      name="treningi"
                      value={n}
                      checked={treningi === n}
                      onChange={() => ustawTreningi(n)}
                    />
                    <span>
                      <span className="wybor-nazwa">
                        {n === 1 ? "Jeden trening" : "Dwa treningi"}
                      </span>
                      <span className="wybor-opis">
                        {n === 1
                          ? "Środa albo piątek, do ustalenia z instruktorem."
                          : "Środa i piątek."}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {!jednorazowe && (
            <fieldset className="pole-zestaw">
              <legend className="legenda-wyboru">Opłata wpisowa</legend>
              <div className="wybor wybor-dwie">
                <label>
                  <input
                    type="radio"
                    name="wpisowe"
                    checked={nowyUczestnik}
                    onChange={() => ustawNowyUczestnik(true)}
                  />
                  <span>
                    <span className="wybor-nazwa">Zapisuję się pierwszy raz</span>
                    <span className="wybor-opis">
                      Do pierwszej płatności doliczamy jednorazową opłatę
                      wpisową.
                    </span>
                    <span className="wybor-kwota">{zl(WPISOWE)}</span>
                  </span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="wpisowe"
                    checked={!nowyUczestnik}
                    onChange={() => ustawNowyUczestnik(false)}
                  />
                  <span>
                    <span className="wybor-nazwa">Trenuję już u nas</span>
                    <span className="wybor-opis">
                      Opłata wpisowa została już wniesiona wcześniej.
                    </span>
                  </span>
                </label>
              </div>
            </fieldset>
          )}

          <div className="nawigacja-krokow">
            <button
              type="button"
              className="przycisk przycisk-glowny"
              onClick={() => dalej(2)}
            >
              Dalej, dane uczestnika
            </button>
          </div>
        </div>
      )}

      {/* Etap 2 ------------------------------------------------------- */}
      {etap === 2 && (
        <div className="formularz">
          <div className="para-pol">
            <div className="pole">
              <label htmlFor="imie">
                Imię uczestnika <span className="wymagane">*</span>
              </label>
              <input
                id="imie"
                value={imie}
                onChange={(e) => ustawImie(e.target.value)}
                autoComplete="given-name"
                maxLength={80}
              />
            </div>
            <div className="pole">
              <label htmlFor="nazwisko">
                Nazwisko uczestnika <span className="wymagane">*</span>
              </label>
              <input
                id="nazwisko"
                value={nazwisko}
                onChange={(e) => ustawNazwisko(e.target.value)}
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
                type="email"
                value={email}
                onChange={(e) => ustawEmail(e.target.value)}
                autoComplete="email"
                maxLength={120}
                aria-describedby="email-podpowiedz"
              />
              <p className="pole-podpowiedz" id="email-podpowiedz">
                Na ten adres wyślemy potwierdzenie płatności oraz informacje
                o kolejnych obciążeniach.
              </p>
            </div>
            <div className="pole">
              <label htmlFor="telefon">
                Telefon <span className="wymagane">*</span>
              </label>
              <input
                id="telefon"
                type="tel"
                value={telefon}
                onChange={(e) => ustawTelefon(e.target.value)}
                autoComplete="tel"
                maxLength={30}
              />
            </div>
          </div>

          <div className="pole">
            <label htmlFor="opiekun">Imię i nazwisko opiekuna prawnego</label>
            <input
              id="opiekun"
              value={opiekun}
              onChange={(e) => ustawOpiekuna(e.target.value)}
              maxLength={120}
              aria-describedby="opiekun-podpowiedz"
            />
            <p className="pole-podpowiedz" id="opiekun-podpowiedz">
              Wypełnij, jeżeli uczestnik nie ukończył 18 lat. Umowę zawiera
              wtedy opiekun prawny.
            </p>
          </div>

          <div className="pole">
            <label htmlFor="uwagi">Uwagi</label>
            <textarea
              id="uwagi"
              value={uwagi}
              onChange={(e) => ustawUwagi(e.target.value)}
              maxLength={1000}
              aria-describedby="uwagi-podpowiedz"
            />
            <p className="pole-podpowiedz" id="uwagi-podpowiedz">
              Na przykład prośba o zniżkę rodzinną albo preferowany dzień
              treningu. Nie podawaj informacji o stanie zdrowia, nie zbieramy
              takich danych przez stronę internetową.
            </p>
          </div>

          {blad && (
            <div className="komunikat komunikat-blad" role="alert">
              {blad}
            </div>
          )}

          <div className="nawigacja-krokow">
            <button
              type="button"
              className="przycisk przycisk-glowny"
              onClick={() => {
                if (sprawdzDane()) dalej(3);
              }}
            >
              Dalej, podsumowanie
            </button>
            <button type="button" className="przycisk-wstecz" onClick={() => dalej(1)}>
              Wróć do wyboru wariantu
            </button>
          </div>
        </div>
      )}

      {/* Etap 3 ------------------------------------------------------- */}
      {etap === 3 && (
        <div>
          <div className="podsumowanie">
            <div className="podsumowanie-naglowek">Do zapłaty teraz</div>
            <div className="podsumowanie-tresc">
              <ul className="podsumowanie-pozycje">
                {zamowienie.pozycje.map((pozycja) => (
                  <li key={pozycja.nazwa}>
                    <span>{pozycja.nazwa}</span>
                    <span className="kwota-pozycji">{zl(pozycja.kwota)}</span>
                  </li>
                ))}
              </ul>
              <div className="podsumowanie-suma">
                <span>Razem</span>
                <span className="kwota-pozycji">{zl(zamowienie.doZaplatyTeraz)}</span>
              </div>
            </div>
          </div>

          {zamowienie.cykliczna && (
            <div className="ramka-cykliczna">
              <h3>Zgoda na cykliczne obciążanie BLIK</h3>
              <dl className="lista-danych">
                <dt>Kwota pierwszej płatności</dt>
                <dd>{zl(zamowienie.doZaplatyTeraz)}</dd>
                <dt>Kwota kolejnych obciążeń</dt>
                <dd>{zl(zamowienie.kwotaCykliczna)}</dd>
                <dt>Częstotliwość</dt>
                <dd>Raz w miesiącu</dd>
                <dt>Dzień obciążenia</dt>
                <dd>{dzien}</dd>
                <dt>Miesiące bez pobrania</dt>
                <dd>
                  {brakuje(PLATNOSCI.miesiaceWylaczone)
                    ? UZUPELNIC
                    : PLATNOSCI.miesiaceWylaczone}
                </dd>
                <dt>Okres obowiązywania</dt>
                <dd>Do odwołania zgody przez Ciebie</dd>
                <dt>Odwołanie zgody</dt>
                <dd>
                  E-mailem na {KONTAKT.email} albo w aplikacji Twojego banku,
                  w sekcji zgód BLIK
                </dd>
              </dl>
              <p style={{ marginTop: "20px", fontSize: "0.93rem" }}>
                Kwota obciążenia nie zmieni się bez Twojej nowej zgody. Opłata
                wpisowa naliczana jest wyłącznie teraz i nie wchodzi do kwoty
                kolejnych obciążeń.
              </p>
            </div>
          )}

          <div className="formularz" style={{ marginTop: "34px" }}>
            {zamowienie.cykliczna && (
              <div className="zgoda">
                <input
                  id="zgoda-cykliczna"
                  type="checkbox"
                  checked={zgodaCykliczna}
                  onChange={(e) => ustawZgodeCykliczna(e.target.checked)}
                />
                <label htmlFor="zgoda-cykliczna">
                  Wyrażam zgodę na cykliczne obciążanie mojego rachunku kwotą{" "}
                  {zl(zamowienie.kwotaCykliczna)} raz w miesiącu, w ramach
                  usługi BLIK Płatności Cykliczne, do czasu odwołania zgody.{" "}
                  <span className="wymagane">*</span>
                </label>
              </div>
            )}

            <div className="zgoda">
              <input
                id="zgoda-regulamin"
                type="checkbox"
                checked={zgodaRegulamin}
                onChange={(e) => ustawZgodeRegulamin(e.target.checked)}
              />
              <label htmlFor="zgoda-regulamin">
                Akceptuję <Link href="/regulamin">regulamin</Link> w wersji{" "}
                {DOKUMENTY.regulaminWersja} i zawieram umowę o udział
                w zajęciach. <span className="wymagane">*</span>
              </label>
            </div>

            <div className="zgoda">
              <input
                id="zgoda-dane"
                type="checkbox"
                checked={zgodaDane}
                onChange={(e) => ustawZgodeDane(e.target.checked)}
              />
              <label htmlFor="zgoda-dane">
                Zapoznałem się z{" "}
                <Link href="/polityka-prywatnosci">polityką prywatności</Link>{" "}
                w wersji {DOKUMENTY.politykaWersja}.{" "}
                <span className="wymagane">*</span>
              </label>
            </div>

            {blad && (
              <div className="komunikat komunikat-blad" role="alert">
                {blad}
              </div>
            )}

            <div className="nawigacja-krokow">
              <button
                type="button"
                className="przycisk przycisk-glowny"
                onClick={zaplac}
                disabled={wysylanie}
              >
                {wysylanie
                  ? "Przekierowanie do płatności"
                  : `Zapłać ${zl(zamowienie.doZaplatyTeraz)}`}
              </button>
              <button type="button" className="przycisk-wstecz" onClick={() => dalej(2)}>
                Wróć do danych
              </button>
            </div>

            <p className="pole-podpowiedz">
              Po kliknięciu przejdziesz do serwisu Przelewy24, gdzie wybierzesz
              metodę płatności. Dane karty i kod BLIK podajesz wyłącznie
              operatorowi, nie trafiają na tę stronę.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
