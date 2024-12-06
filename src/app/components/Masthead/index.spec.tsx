import { render, screen, within } from '@testing-library/react';
import type { ComponentPropsWithoutRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import Navigation from '.';

type NavigationProps = ComponentPropsWithoutRef<typeof Navigation>;

vi.mock('next/navigation', () => ({
  usePathname() {
    return '/current-page/1';
  },
}));

describe('Masthead', () => {
  const props: NavigationProps = {
    categories: {
      category1: 'http://www.category1.co.uk',
      category2: 'http://www.category2.co.uk',
    },
  };

  async function renderSeverComponent(currentProps: NavigationProps = props) {
    const component = await Navigation({ ...currentProps });

    return render(component);
  }

  it('should render', async () => {
    await renderSeverComponent();

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render homepage button', async () => {
    await renderSeverComponent();

    expect(screen.getByRole('link', { name: 'Blue Harvest (SE)' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Blue Harvest (SE)' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Blue Harvest (SE)' })).toHaveAttribute('title');
  });

  it('should render menu links', async () => {
    await renderSeverComponent();

    expect(screen.getByRole('navigation')).toBeInTheDocument();

    const { getAllByRole } = within(screen.getByRole('navigation'));

    expect(getAllByRole('link')).toHaveLength(2);
  });
});
