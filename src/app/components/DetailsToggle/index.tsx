'use client';

import { useState, type ReactElement, type PropsWithChildren } from 'react';
// import { clsx } from 'clsx';

type DetailsToggleProps = PropsWithChildren<{
  toggleText: string;
  // isExpanded: boolean;
}>;

function DetailsToggle({ toggleText, children }: DetailsToggleProps): ReactElement {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <details open={isExpanded} onToggle={(event) => setIsExpanded(event.currentTarget.open)}>
      <summary className="marker:text-teal-300">{toggleText}</summary>
      <div className="mt-2">{children}</div>
    </details>
  );
}

export default DetailsToggle;
