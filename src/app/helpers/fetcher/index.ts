import type z from 'zod';
import { ZodError } from 'zod';

// https://github.com/colinhacks/zod#writing-generic-functions
export default async function fetcher<T extends z.ZodTypeAny>(url: string, schema?: T) {
  try {
    const response = await fetch(url, { cache: 'force-cache' });

    if (!response.ok) {
      throw new Error('Error fetching data');
    }

    const data = await response.json();

    if (!schema) {
      return data;
    }

    const parsedData = schema.parse(data);
    return parsedData;
  } catch (error) {
    if (error instanceof Error || error instanceof ZodError) {
      console.warn(error.message);
      throw new Error(error.message, { cause: error });
    }

    console.warn('Unknown error');
    throw new Error('Unknown error');
  }
}
