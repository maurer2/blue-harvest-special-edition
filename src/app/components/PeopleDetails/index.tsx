import Link from 'next/link';
import type { ReactElement } from 'react';
import type { People } from '@/app/schemas/people';

type PeopleDetailsProps = {
  details: People;
};

async function PeopleDetails({ details }: PeopleDetailsProps): Promise<ReactElement> {
  return <div>{JSON.stringify(details)}</div>;
}

export default PeopleDetails;
