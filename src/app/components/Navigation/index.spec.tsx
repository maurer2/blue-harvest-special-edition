import { render, screen } from '@testing-library/react';
import type { ComponentPropsWithoutRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import Navigation from '.';

type NavigationProps = ComponentPropsWithoutRef<typeof Navigation>;

vi.mock('next/navigation', () => ({
  usePathname() {
    return '/current-page/1';
  },
}));

describe('Navigation', () => {
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

    expect(screen.getByLabelText('Main navigation with Home button')).toBeInTheDocument();
  });

  it('should render home button', async () => {
    await renderSeverComponent();

    expect(
      screen.getByRole('heading', { level: 1, name: 'Blue Harvest (SE)' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Blue Harvest (SE)' })).toHaveAttribute('href', '/');
  });

  it('should render list of menu links', async () => {
    await renderSeverComponent();

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
