import type { ComponentPropsWithoutRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';

import NavigationEntry from '../index';

type NavigationEntryProps = ComponentPropsWithoutRef<typeof NavigationEntry>;

vi.mock('next/navigation', () => ({
  usePathname() {
    return '/categories/current-page/1';
  },
}));

describe('Navigation Entry', () => {
  const props: NavigationEntryProps = {
    name: 'current-page',
  };

  it('renders name', async () => {
    const { getByText } = render(<NavigationEntry {...props} />);

    await expect.element(getByText('current-page')).toBeInTheDocument();
  });
});
