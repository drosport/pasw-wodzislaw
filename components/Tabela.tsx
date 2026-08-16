import type { CSSProperties, ReactNode } from "react";

/**
 * Otoczka tabeli. Na szerokich ekranach tabela przewija się w poziomie,
 * jeżeli nie mieści się w kolumnie. Poniżej 760 pikseli arkusz przestawia
 * ją na układ pionowy, wiersz po wierszu.
 */
export default function Tabela({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className="tabela-otoczka" style={style}>
      {children}
    </div>
  );
}
