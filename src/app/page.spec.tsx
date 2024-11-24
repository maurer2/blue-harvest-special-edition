import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Home from './page';

describe('Home', () => {
  it('should render', () => {
    render(<Home />);

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
