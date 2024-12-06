import { render, screen } from '@testing-library/react';
import type { ComponentPropsWithoutRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import CategoryDetailsHeader from '.';

type CategoryDetailsHeaderProps = ComponentPropsWithoutRef<typeof CategoryDetailsHeader>;

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn().mockImplementation(() => new URLSearchParams()),
}));

describe('CategoryDetailsHeader', () => {
  const props: CategoryDetailsHeaderProps = {
    category: 'category',
    pageNumber: '2',
    nextPage: 'http://www.meow.co.uk/category/1',
    previousPage: 'http://www.meow.co.uk/category/3',
  };

  it('should render', async () => {
    render(<CategoryDetailsHeader {...props} />);

    expect(
      screen.getByLabelText('Category title and category level navigation'),
    ).toBeInTheDocument();
  });

  it('should render title of current category', async () => {
    render(<CategoryDetailsHeader {...props} />);

    expect(screen.getByRole('heading', { level: 2, name: 'category' })).toBeInTheDocument();
  });

  it('should render previous and next page button with number of current page', async () => {
    render(<CategoryDetailsHeader {...props} />);

    expect(screen.getByRole('link', { name: 'Previous page' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Next page' })).toBeInTheDocument();
    expect(screen.getByTestId('current-page-number')).toBeInTheDocument();
    expect(screen.getByTestId('current-page-number')).toHaveTextContent('2');
  });

  it('should render previous page button as disabled if there is no previous page', async () => {
    const currentProps: CategoryDetailsHeaderProps = {
      ...props,
      previousPage: null,
    };

    render(<CategoryDetailsHeader {...currentProps} />);

    expect(screen.getByRole('link', { name: 'Previous page' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Previous page' })).toHaveAttribute('inert');
  });

  it('should render next page button as disabled if there is no next page', async () => {
    const currentProps: CategoryDetailsHeaderProps = {
      ...props,
      nextPage: null,
    };

    render(<CategoryDetailsHeader {...currentProps} />);

    expect(screen.getByRole('link', { name: 'Next page' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Next page' })).toHaveAttribute('inert');
  });
});
