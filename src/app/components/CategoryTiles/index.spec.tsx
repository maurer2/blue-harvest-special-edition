import { expect, describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ComponentPropsWithoutRef } from 'react';

import CategoryTiles from '.';

type CategoryTilesProps = ComponentPropsWithoutRef<typeof CategoryTiles>;

vi.mock('next/navigation', () => ({
  usePathname() {
    return '/current-page/1';
  },
}));

describe('Categories', () => {
  const props: CategoryTilesProps = {
    categories: {
      category1: 'http://www.category1.co.uk',
      category2: 'http://www.category2.co.uk',
    },
  };

  async function renderSeverComponent(currentProps: CategoryTilesProps = props) {
    const component = await CategoryTiles({ ...currentProps });

    return render(component);
  }

  it('should render', async () => {
    await renderSeverComponent();

    expect(screen.getByLabelText('List of categories')).toBeInTheDocument();
  });

  it('should render list of menu links with icon', async () => {
    await renderSeverComponent();

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);

    screen.debug();
  });
});
