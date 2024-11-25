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
  const isActive = pathname.startsWith(`/categories/${name}`);

  return (
    <Link
      href={`/categories/${name}/1`}
      className={clsx('capitalize underline-offset-4 hover:underline', {
        underline: isActive,
      })}
      aria-current={isActive ? 'page' : undefined}
    >
      {name}
    </Link>
  );
}

export default NavigationEntry;
