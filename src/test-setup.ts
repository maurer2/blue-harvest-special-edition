import { afterEach, expect } from 'vitest';
import * as matchers from 'jest-extended';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
