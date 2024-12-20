import { FileQuestion, type LucideProps, RectangleEllipsis } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import Link from 'next/link';
import { type ReactElement, Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type CategoryTilesProps = {
  categories?: Record<string, string>;
};

const iconMap: Record<string, keyof typeof dynamicIconImports> = {
  people: 'users',
  planets: 'eclipse',
  films: 'film',
  species: 'cat',
  vehicles: 'car',
  starships: 'rocket',
};
const iconConfig: LucideProps = {
  size: 32,
  role: 'graphics-symbol',
  'aria-hidden': true,
};

async function CategoryTiles({ categories }: CategoryTilesProps): Promise<ReactElement> {
  const entries = typeof categories !== 'undefined' ? Object.entries(categories) : [];

  if (!entries.length) {
    return <p>No categories found.</p>;
  }

  return (
    <ul
      className="grid grid-cols-[repeat(auto-fill,minmax(128px,1fr))] gap-6"
      role="list"
      aria-label="List of categories"
    >
      {entries.map(([name]) => {
        const iconName = iconMap[name];
        const Icon = lazy(dynamicIconImports[iconName]);

        return (
          <li className="contents" key={name} role="listitem">
            <Link
              href={`/categories/${name}/1`}
              className="outline:teal-300 flex aspect-square flex-col items-center justify-center gap-4 border p-4 capitalize outline-none hover:border-teal-300 hover:text-teal-300 focus-visible:border-teal-300 focus-visible:text-teal-300"
            >
              <ErrorBoundary fallback={<FileQuestion {...iconConfig} />}>
                <Suspense
                  fallback={
                    <RectangleEllipsis {...iconConfig} className="motion-safe:animate-pulse" />
                  }
                >
                  <Icon {...iconConfig} />
                </Suspense>
              </ErrorBoundary>
              {name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default CategoryTiles;
