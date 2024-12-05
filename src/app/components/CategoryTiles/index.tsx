import { Car, Cat, Eclipse, Film, type LucideProps, Rocket, Users } from 'lucide-react';
import Link from 'next/link';
import type { ReactElement } from 'react';

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
            className="outline:teal-300 flex aspect-square flex-col items-center justify-center gap-4 border p-4 capitalize outline-none hover:border-teal-300 hover:text-teal-300 focus-visible:border-teal-300 focus-visible:text-teal-300"
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
