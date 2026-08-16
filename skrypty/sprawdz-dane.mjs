/**
 * Wypisuje pola z lib/dane.ts, które nie zostały jeszcze uzupełnione.
 * Uruchomienie: npm run sprawdz-dane
 *
 * Skrypt czyta plik jako tekst, żeby nie wymagać kompilacji TypeScriptu.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const katalog = dirname(fileURLToPath(import.meta.url));
const plik = join(katalog, "..", "lib", "dane.ts");
const tresc = readFileSync(plik, "utf8");

const linie = tresc.split("\n");
const braki = [];

let sekcja = "";

linie.forEach((linia, indeks) => {
  const naglowek = linia.match(/^\/\* (.+?) *\*\/$/);
  if (naglowek && !naglowek[1].startsWith("---")) {
    sekcja = naglowek[1].trim();
  }

  if (!linia.includes("UZUPELNIC")) return;
  if (linia.includes("export const UZUPELNIC")) return;
  if (linia.includes("wartosc === UZUPELNIC")) return;

  const bezWciecia = linia.trimStart();
  if (bezWciecia.startsWith("//")) return;
  if (bezWciecia.startsWith("*") || bezWciecia.startsWith("/*")) return;

  const nazwa = linia.match(/^\s*([A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż0-9_]+)\s*:/);
  braki.push({
    numer: indeks + 1,
    pole: nazwa ? nazwa[1] : linia.trim(),
    sekcja,
  });
});

if (braki.length === 0) {
  console.log("\n  Wszystkie pola w lib/dane.ts są uzupełnione.\n");
  process.exit(0);
}

console.log(`\n  Pola do uzupełnienia w lib/dane.ts: ${braki.length}\n`);
for (const brak of braki) {
  const miejsce = `lib/dane.ts:${brak.numer}`;
  console.log(`  ${miejsce.padEnd(18)} ${brak.pole}`);
}
console.log(
  "\n  Strony nie należy publikować przed uzupełnieniem tych wartości.\n"
);
process.exit(1);
