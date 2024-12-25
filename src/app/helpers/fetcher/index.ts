import { ZodError, type z } from 'zod';

// https://github.com/colinhacks/zod#writing-generic-functions
export default async function fetcher<T extends z.ZodTypeAny>(
  url: string,
  schema: T,
): Promise<z.infer<T>> {
  try {
    const response = await fetch(url, { cache: 'force-cache' });

    if (!response.ok) {
      throw new Error('Error fetching data');
    }

    const data = await response.json();

    if (!schema) {
      return data;
    }

    const parsedData = schema.parse(data) as z.infer<T>;
    return parsedData;
  } catch (error) {
    if (error instanceof Error || error instanceof ZodError) {
      console.warn(error.message);

      throw new Error(error.message, { cause: error });
    }

    throw new Error('Unknown error');
  }
}
