import { expect, describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ComponentPropsWithoutRef } from 'react';

import NavigationEntry from '.';

type NavigationEntryProps = ComponentPropsWithoutRef<typeof NavigationEntry>;

vi.mock('next/navigation', () => ({
  usePathname() {
    return '/current-page/1';
  },
}));

describe('Navigation Entry', () => {
  const props: NavigationEntryProps = {
    name: 'current-page',
  };

  it('should render', () => {
    render(<NavigationEntry {...props} />);

    expect(screen.getByRole('link', { name: 'current-page' })).toBeInTheDocument();
    expect(screen.getByRole('link', { current: 'page' })).toBeInTheDocument();
  });
});
