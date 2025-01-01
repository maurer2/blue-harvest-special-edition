import { render, screen, within } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { Suspense } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Navigation from '.';

type NavigationProps = ComponentProps<typeof Navigation>;
type PromisePayload = NonNullable<Awaited<NavigationProps['categoriesPromise']>>;

vi.mock('next/navigation', () => ({
  usePathname() {
    return '/current-page/1';
  },
}));

describe.skip('Masthead', () => {
  let categoriesPromise: PromiseWithResolvers<PromisePayload>;

  const props: NavigationProps = {
    categoriesPromise: undefined,
  };

  beforeEach(() => {
    categoriesPromise = Promise.withResolvers();
  });

  async function renderAsyncComponent(currentProps: NavigationProps = props) {
    const component = await Navigation({ ...currentProps });

    return render(component);
  }

  describe('Component states', () => {
    it('should render suspense fallback while categories promise is pending', async () => {
      render(
        <Suspense fallback={<p>Fallback</p>}>
          <Navigation categoriesPromise={categoriesPromise.promise} />
        </Suspense>,
      );

      expect(await screen.findByText('Fallback')).toBeInTheDocument();
      expect(screen.queryByRole('banner')).not.toBeInTheDocument();
    });

    it('should render component when categories promise is resolved', async () => {
      categoriesPromise.resolve({
        message: 'ok',
        result: {
          category1: 'http://www.category1.co.uk',
          category2: 'http://www.category2.co.uk',
        },
      });

      await renderAsyncComponent({
        categoriesPromise: categoriesPromise.promise,
      });

      expect(await screen.findByRole('banner')).toBeInTheDocument();
      expect(screen.queryByText('Fallback')).not.toBeInTheDocument();
    });

    it.todo('should render error fallback when categories promise is rejected');
  });

  it('should render link to homepage', async () => {
    categoriesPromise.resolve({
      message: 'ok',
      result: {
        category1: 'http://www.category1.co.uk',
        category2: 'http://www.category2.co.uk',
      },
    });

    await renderAsyncComponent({
      categoriesPromise: categoriesPromise.promise,
    });

    expect(screen.getByRole('banner')).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /Blue Harvest/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Blue Harvest/ })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /Blue Harvest/ })).toHaveAttribute('title');

    expect(screen.getByTitle('Special Edition')).toBeInTheDocument();
    expect(screen.getByTitle('Special Edition')).toHaveTextContent('SE');
  });

  it('should render menu links', async () => {
    categoriesPromise.resolve({
      message: 'ok',
      result: {
        category1: 'http://www.category1.co.uk',
        category2: 'http://www.category2.co.uk',
      },
    });

    await renderAsyncComponent({
      categoriesPromise: categoriesPromise.promise,
    });

    expect(await screen.findByRole('navigation')).toBeInTheDocument();

    const { getAllByRole } = within(screen.getByRole('navigation'));

    expect(getAllByRole('link')).toHaveLength(2);
  });
});
