import { Fragment } from 'react';

/**
 * Exibe um texto da configuração destacando os marcadores pendentes, ex.: "[TELEFONE]".
 * Depois que o dado real é preenchido, vira texto comum.
 */
export function Ph({ children }: { children: string }) {
  const parts = children.split(/(\[[^\]]+\])/g);
  if (parts.length === 1) return <>{children}</>;
  return (
    <>
      {parts.map((part, i) =>
        /^\[[^\]]+\]$/.test(part) ? (
          <span key={i} className="ph" title="Dado pendente: preencher em src/config/clinic.ts">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
