'use client';

import { type PropsWithChildren, type ReactElement, useState } from 'react';

// import { clsx } from 'clsx';

type DetailsToggleProps = PropsWithChildren<{
  toggleText: string;
  hasForceExpand: boolean;
}>;

function DetailsToggle({ toggleText, hasForceExpand, children }: DetailsToggleProps): ReactElement {
  const [isExpanded, setIsExpanded] = useState(hasForceExpand);

  return (
    <details open={isExpanded} onToggle={(event) => setIsExpanded(event.currentTarget.open)}>
      <summary className="cursor-pointer marker:text-teal-300">{toggleText}</summary>
      <div className="mt-2">{children}</div>
    </details>
  );
}

export default DetailsToggle;
