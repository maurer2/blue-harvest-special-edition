'use client';

import type { ReactElement } from 'react';
import { useSearchParams } from 'next/navigation';
import { UnfoldVertical, FoldVertical } from 'lucide-react';
import { QUERY_PARAM_KEYS } from '@/app/categories/[...slug]/constants';

function ToggleBar(): ReactElement {
  const searchParams = useSearchParams();
  const hasExpandedParam = searchParams.get(QUERY_PARAM_KEYS.EXPANDED) !== null;

  const handleClick = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (hasExpandedParam) {
      newSearchParams.delete(QUERY_PARAM_KEYS.EXPANDED);
    } else {
      newSearchParams.append(QUERY_PARAM_KEYS.EXPANDED, '');
    }

    const newQueryStringClean = `?${newSearchParams.toString().replace(`${QUERY_PARAM_KEYS.EXPANDED}=`, `${QUERY_PARAM_KEYS.EXPANDED}`)}`;
    window.history.replaceState(null, '', newQueryStringClean);
  };

  return (
    <div className="flex bg-gray-100 px-4 py-2">
      <button
        type="button"
        onClick={handleClick}
        role="switch"
        aria-checked={hasExpandedParam}
        id="toggle-bar-button"
        aria-label="Toggle expand and collapse state of entries"
        className="mr-2"
      >
        {hasExpandedParam ? <UnfoldVertical aria-hidden /> : <FoldVertical aria-hidden />}
      </button>
      <label htmlFor="toggle-bar-button">
        {hasExpandedParam ? 'All entries are expanded' : 'All entries are collapsed'}
      </label>
    </div>
  );
}

export default ToggleBar;
