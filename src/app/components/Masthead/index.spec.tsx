import { render, screen, within } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Navigation from '.';

type NavigationProps = ComponentProps<typeof Navigation>;
type PromisePayload = NonNullable<Awaited<NavigationProps['categoriesPromise']>>;

vi.mock('next/navigation', () => ({
  usePathname() {
    return '/current-page/1';
  },
}));

describe('Masthead', () => {
  let categoriesPromise: PromiseWithResolvers<PromisePayload>;

  beforeEach(() => {
    categoriesPromise = Promise.withResolvers();
  });

  const props: NavigationProps = {
    categoriesPromise: undefined,
  };

  async function renderClientComponentThatContainsUse(currentProps: NavigationProps = props) {
    const component = await Navigation({ ...currentProps });

    return render(component);
  }

  it('should render', async () => {
    const { resolve, promise } = categoriesPromise;

    resolve({
      message: 'ok',
      result: {
        category1: 'http://www.category1.co.uk',
        category2: 'http://www.category2.co.uk',
      },
    });

    await renderClientComponentThatContainsUse({
      categoriesPromise: promise,
    });

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render link to homepage', async () => {
    const { resolve, promise } = categoriesPromise;

    resolve({
      message: 'ok',
      result: {
        category1: 'http://www.category1.co.uk',
        category2: 'http://www.category2.co.uk',
      },
    });

    await renderClientComponentThatContainsUse({
      categoriesPromise: promise,
    });

    expect(screen.getByRole('banner')).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /Blue Harvest/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Blue Harvest/ })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /Blue Harvest/ })).toHaveAttribute('title');

    expect(screen.getByTitle('Special Edition')).toBeInTheDocument();
    expect(screen.getByTitle('Special Edition')).toHaveTextContent('SE');
  });

  it('should render menu links', async () => {
    const { resolve, promise } = categoriesPromise;

    resolve({
      message: 'ok',
      result: {
        category1: 'http://www.category1.co.uk',
        category2: 'http://www.category2.co.uk',
      },
    });

    await renderClientComponentThatContainsUse({
      categoriesPromise: promise,
    });

    expect(screen.getByRole('navigation')).toBeInTheDocument();

    const { getAllByRole } = within(screen.getByRole('navigation'));

    expect(getAllByRole('link')).toHaveLength(2);
  });
});
