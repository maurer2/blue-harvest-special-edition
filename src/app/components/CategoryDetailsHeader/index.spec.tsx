import { render, screen } from '@testing-library/react';
import type { ComponentPropsWithoutRef } from 'react';
import { describe, expect, it } from 'vitest';

import CategoryDetailsHeader from '.';

type CategoryDetailsHeaderProps = ComponentPropsWithoutRef<typeof CategoryDetailsHeader>;

describe('CategoryDetailsHeader', () => {
  const props: CategoryDetailsHeaderProps = {
    category: 'category',
    pageNumber: '1',
    nextPage: 'http://www.category1.co.uk',
    previousPage: 'http://www.category1.co.uk',
    hasExpandedParam: false,
  };

  async function renderSeverComponent(currentProps: CategoryDetailsHeaderProps = props) {
    const component = await CategoryDetailsHeader({ ...currentProps });

    return render(component);
  }

  it('should render', async () => {
    await renderSeverComponent();

    expect(screen.getByRole('heading', { level: 2, name: 'category' })).toBeInTheDocument();
  });

  it('should render previous and next page button with number of current page', async () => {
    await renderSeverComponent();

    expect(screen.getByRole('link', { name: 'Previous page' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Next page' })).toBeInTheDocument();
    expect(screen.getByTestId('current-page-number')).toHaveTextContent('1');
    expect(screen.getByTestId('current-page-number')).toBeInTheDocument();
  });

  it('should render previous page button as disabled if there is no previous page', async () => {
    await renderSeverComponent({
      ...props,
      previousPage: null,
    });

    expect(screen.getByRole('link', { name: 'Previous page' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Previous page' })).toHaveAttribute('inert');
  });

  it('should render next page button as disabled if there is no next page', async () => {
    await renderSeverComponent({
      ...props,
      nextPage: null,
    });

    expect(screen.getByRole('link', { name: 'Next page' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Next page' })).toHaveAttribute('inert');
  });
});
