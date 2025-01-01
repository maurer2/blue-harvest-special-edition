'use client';

import { FoldVertical, UnfoldVertical } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ReactElement } from 'react';
import { useTransition } from 'react';

type ToggleBarProps = {
  onRevalidateCurrentCategoryPage: () => Promise<void>;
};

const QUERY_PARAM_KEYS = {
  EXPANDED: 'expanded',
};

function ToggleBar({ onRevalidateCurrentCategoryPage }: ToggleBarProps): ReactElement {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const hasExpandedParam = searchParams.get(QUERY_PARAM_KEYS.EXPANDED) !== null;

  const handleClick = async () => {
    startTransition(async () => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      if (hasExpandedParam) {
        newSearchParams.delete(QUERY_PARAM_KEYS.EXPANDED);
      } else {
        newSearchParams.append(QUERY_PARAM_KEYS.EXPANDED, '');
      }

      window.history.replaceState(null, '', `?${newSearchParams.toString()}`);

      await onRevalidateCurrentCategoryPage();
      router.refresh();
    });
  };

  return (
    <div className="flex gap-2 bg-gray-100 px-4 py-2">
      <button
        type="button"
        onClick={handleClick}
        role="switch"
        aria-checked={hasExpandedParam}
        id="toggle-bar-button"
        aria-label="Toggle expand and collapse state of entries"
        className="cursor-pointer"
      >
        {hasExpandedParam ? <UnfoldVertical aria-hidden /> : <FoldVertical aria-hidden />}
      </button>
      <label htmlFor="toggle-bar-button" className="cursor-pointer">
        {hasExpandedParam ? 'Collapse all entries' : 'Expand all entries'}
      </label>
      <p className="motion-safe:animate-pulse ml-auto">{isPending ? 'Please wait!' : ''}</p>
    </div>
  );
}

export default ToggleBar;
