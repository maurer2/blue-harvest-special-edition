import { render, screen } from '@testing-library/react';
import type { ComponentPropsWithoutRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import NavigationEntry from '.';

type NavigationEntryProps = ComponentPropsWithoutRef<typeof NavigationEntry>;

vi.mock('next/navigation', () => ({
  usePathname() {
    return '/categories/current-page/1';
  },
}));

describe.skip('Navigation Entry', () => {
  const props: NavigationEntryProps = {
    name: 'current-page',
  };

  it('should render', () => {
    render(<NavigationEntry {...props} />);

    expect(screen.getByRole('link', { name: 'current-page' })).toBeInTheDocument();
    expect(screen.getByRole('link', { current: 'page' })).toBeInTheDocument();
  });
});
