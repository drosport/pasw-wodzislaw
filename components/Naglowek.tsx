"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { KONTAKT, MARKA, NAWIGACJA, brakuje } from "@/lib/dane";

export default function Naglowek() {
  const sciezka = usePathname();
  const [otwarte, ustawOtwarte] = useState(false);

  useEffect(() => {
    ustawOtwarte(false);
  }, [sciezka]);

  const aktywna = (href: string) =>
    sciezka === href || sciezka.startsWith(`${href}/`);

  return (
    <>
      <div className="pasek-gorny">
        <div className="kontener">
          <div className="pasek-gorny-opis">
            {KONTAKT.salaNazwa}, {KONTAKT.salaUlica}, {KONTAKT.salaMiasto}
          </div>
          <div className="pasek-gorny-kontakt">
            {!brakuje(KONTAKT.telefon) && (
              <a href={`tel:${KONTAKT.telefonHref}`}>{KONTAKT.telefon}</a>
            )}
            {!brakuje(KONTAKT.email) && (
              <a href={`mailto:${KONTAKT.email}`}>{KONTAKT.email}</a>
            )}
            {brakuje(KONTAKT.telefon) && brakuje(KONTAKT.email) && (
              <Link href="/kontakt">Kontakt</Link>
            )}
          </div>
        </div>
      </div>

      <header className="naglowek">
        <div className="kontener">
          <Link href="/" className="znak" aria-label={`${MARKA.nazwaPelna}, strona główna`}>
            <img
              src="/pasw-logo.svg"
              alt=""
              width={52}
              height={52}
              decoding="async"
              aria-hidden="true"
            />
            <span>
              <span className="znak-nazwa">
                Pszczyńska Akademia
                <br />
                Sztuk Walki
              </span>
              <span className="znak-sekcja">{MARKA.sekcja}</span>
            </span>
          </Link>

          <nav className="nawigacja" aria-label="Nawigacja główna">
            <ul className="nawigacja-lista">
              {NAWIGACJA.map((pozycja) => (
                <li key={pozycja.href}>
                  <Link
                    href={pozycja.href}
                    aria-current={aktywna(pozycja.href) ? "page" : undefined}
                  >
                    {pozycja.etykieta}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/zapisy" className="przycisk przycisk-glowny przycisk-maly">
              Zapisz się na zajęcia
            </Link>
          </nav>

          <button
            type="button"
            className="przelacznik-menu"
            aria-expanded={otwarte}
            aria-controls="menu-mobilne"
            onClick={() => ustawOtwarte((stan) => !stan)}
          >
            <span aria-hidden="true" />
            Menu
          </button>
        </div>

        {otwarte && (
          <div className="menu-mobilne" id="menu-mobilne">
            <div className="kontener">
              <ul>
                {NAWIGACJA.map((pozycja) => (
                  <li key={pozycja.href}>
                    <Link
                      href={pozycja.href}
                      aria-current={aktywna(pozycja.href) ? "page" : undefined}
                    >
                      {pozycja.etykieta}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/zapisy" className="przycisk przycisk-glowny">
                Zapisz się na zajęcia
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
