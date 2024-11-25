import { expect, describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ComponentPropsWithoutRef } from 'react';

import Categories from '.';

type CategoriesProps = ComponentPropsWithoutRef<typeof Categories>;

vi.mock('next/navigation', () => ({
  usePathname() {
    return '/current-page/1';
  },
}));

describe('Categories', () => {
  const props: CategoriesProps = {
    categories: {
      category1: 'http://www.category1.co.uk',
      category2: 'http://www.category2.co.uk',
    },
  };

  async function renderSeverComponent(currentProps: CategoriesProps = props) {
    const component = await Categories({ ...currentProps });

    return render(component);
  }

  it('should render', async () => {
    await renderSeverComponent();

    screen.debug();

    expect(screen.getByLabelText('List of categories')).toBeInTheDocument();
  });

  // it('should render home button', async () => {
  //   await renderSeverComponent();

  //   expect(
  //     screen.getByRole('heading', { level: 1, name: 'Blue Harvest (SE)' }),
  //   ).toBeInTheDocument();
  //   expect(screen.getByRole('link', { name: 'Blue Harvest (SE)' })).toHaveAttribute('href', '/');
  // });

  // it('should render list if menu links', async () => {
  //   await renderSeverComponent();

  //   expect(screen.getByRole('list')).toBeInTheDocument();
  //   expect(screen.getAllByRole('listitem')).toHaveLength(2);
  // });
});
