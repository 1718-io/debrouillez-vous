import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface VisitorCounterProps {
  initialCount?: number;
}

export default function VisitorCounter({ initialCount = 0 }: VisitorCounterProps) {
  const [count, setCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch('/api/visits', { headers: { Accept: 'application/json' } })
      .then((response) => {
        if (!response.ok) throw new Error('Visitor count unavailable');
        return response.json() as Promise<{ viewsCount: number }>;
      })
      .then(({ viewsCount }) => {
        if (!active || !Number.isFinite(viewsCount)) return;
        setCount(viewsCount);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <span
      aria-live="polite"
      aria-busy={isLoading}
      className="inline-flex min-h-[1em] items-center align-middle tabular-nums transition-all duration-700"
    >
      {isLoading ? (
        <LoaderCircle className="size-[0.72em] animate-spin text-signal" aria-label="Chargement du nombre de soutiens" />
      ) : (
        count.toLocaleString('fr-FR')
      )}
    </span>
  );
}
