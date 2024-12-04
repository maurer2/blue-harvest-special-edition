'use server';

import { revalidatePath } from 'next/cache';

export default async function revalidateCategoryPage() {
  revalidatePath('/categories/[...slug]', 'page');
}
