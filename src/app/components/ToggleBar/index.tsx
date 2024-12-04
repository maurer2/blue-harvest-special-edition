'use client';

import type { ReactElement } from 'react';
import { useSearchParams } from 'next/navigation';
import { UnfoldVertical, FoldVertical } from 'lucide-react';

const expandedParamName = 'expanded';

function ToggleBar(): ReactElement {
  const searchParams = useSearchParams();
  const hasExpandedParam = searchParams.get(expandedParamName) !== null;

  const handleClick = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (hasExpandedParam) {
      newSearchParams.delete(expandedParamName);
    } else {
      newSearchParams.append(expandedParamName, '');
    }

    const newQueryStringClean = `?${newSearchParams.toString().replace(`${expandedParamName}=`, `${expandedParamName}`)}`;
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
