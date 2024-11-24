type PeopleProps = {
  category: string;
  page: string;
};

export default async function People({ category, page }: PeopleProps) {
  return (
    <div>
      <p>{category}</p>
      <p>{page}</p>
    </div>
  );
}
