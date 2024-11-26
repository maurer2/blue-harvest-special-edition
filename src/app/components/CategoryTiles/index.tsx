import type { ReactElement } from 'react';
import Link from 'next/link';
import { Users, Eclipse, Film, Cat, Car, Rocket, type LucideProps } from 'lucide-react';

type CategoryTilesProps = {
  categories: Record<string, string> | null;
};

const iconConfig: LucideProps = {
  size: 32,
  role: 'graphics-symbol',
  'aria-hidden': true,
};
const iconMap = {
  people: <Users {...iconConfig} />,
  planets: <Eclipse {...iconConfig} />,
  films: <Film {...iconConfig} />,
  species: <Cat {...iconConfig} />,
  vehicles: <Car {...iconConfig} />,
  starships: <Rocket {...iconConfig} />,
};

async function CategoryTiles({ categories }: CategoryTilesProps): Promise<ReactElement> {
  const entries = categories !== null ? Object.entries(categories) : [];

  if (!entries.length) {
    return <p>No categories found.</p>;
  }

  return (
    <ul
      className="grid grid-cols-[repeat(auto-fill,minmax(128px,1fr))] gap-6"
      role="list"
      aria-label="List of categories"
    >
      {entries.map(([name]) => (
        <li className="contents" key={name} role="listitem">
          <Link
            href={`/categories/${name}/1`}
            className="flex aspect-square flex-col items-center justify-center gap-4 border p-4 capitalize hover:border-teal-300 hover:text-teal-300"
          >
            {name in iconMap ? iconMap[name as keyof typeof iconMap] : null}
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default CategoryTiles;
