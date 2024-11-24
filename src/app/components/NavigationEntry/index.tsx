'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactElement } from 'react';
import { clsx } from 'clsx';

type NavigationEntryProps = {
  name: string;
};

function NavigationEntry({ name }: NavigationEntryProps): ReactElement {
  const pathname = usePathname();
  const isActive = pathname.startsWith(`/${name}`);

  return (
    <Link
      href={`/${name}/1`}
      className={clsx('capitalize', {
        'underline underline-offset-4': isActive,
      })}
      aria-current={isActive ? 'page' : undefined}
    >
      {name}
    </Link>
  );
}

export default NavigationEntry;
