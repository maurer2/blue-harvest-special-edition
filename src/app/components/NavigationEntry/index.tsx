'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactElement } from 'react';

type NavigationEntryProps = {
  name: string;
};

function NavigationEntry({ name }: NavigationEntryProps): ReactElement {
  const pathname = usePathname();
  const isActive =
    pathname.startsWith(`/categories/${name}`) || pathname.startsWith(`/details/${name}`);

  return (
    <Link
      href={`/categories/${name}/1`}
      className={clsx(
        'capitalize underline-offset-4 outline-none hover:text-white hover:underline focus-visible:text-white focus-visible:underline',
        {
          underline: isActive,
        },
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {name}
    </Link>
  );
}

export default NavigationEntry;
