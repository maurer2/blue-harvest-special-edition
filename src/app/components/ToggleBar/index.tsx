'use client';

import type { ReactElement } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { UnfoldVertical, FoldVertical } from 'lucide-react';
import { QUERY_PARAM_KEYS } from '@/app/categories/[...slug]/constants';
import revalidateCategoryPage from '../../server-functions/revalidate-category-page';

function ToggleBar(): ReactElement {
  const searchParams = useSearchParams();
  const router = useRouter();

  const hasExpandedParam = searchParams.get(QUERY_PARAM_KEYS.EXPANDED) !== null;

  const handleClick = async () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (hasExpandedParam) {
      newSearchParams.delete(QUERY_PARAM_KEYS.EXPANDED);
    } else {
      newSearchParams.append(QUERY_PARAM_KEYS.EXPANDED, '');
    }

    const newQueryString = `?${newSearchParams.toString().replace(`${QUERY_PARAM_KEYS.EXPANDED}=`, `${QUERY_PARAM_KEYS.EXPANDED}`)}`;
    window.history.replaceState(null, '', newQueryString);

    await revalidateCategoryPage();
    router.refresh();
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
    </div>
  );
}

export default ToggleBar;
