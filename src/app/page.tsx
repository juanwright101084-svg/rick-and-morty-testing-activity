<<<<<<< HEAD
﻿import { getCharacters } from '@/lib/api';
=======
import { getCharacters } from '@/lib/api';
>>>>>>> e9f4d1a8ed0afc7e0d25100640608ed62ebf1ef0
import CharacterCard from '@/components/CharacterCard';
import Pagination from '@/components/Pagination';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
<<<<<<< HEAD
  const page = typeof resolvedSearchParams.page === 'string'
    ? parseInt(resolvedSearchParams.page)
    : 1;
=======
  const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1;
>>>>>>> e9f4d1a8ed0afc7e0d25100640608ed62ebf1ef0
  const data = await getCharacters(page);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-orange-500 drop-shadow-lg">
        Rick and Morty Characters
      </h1>
<<<<<<< HEAD

=======
      
>>>>>>> e9f4d1a8ed0afc7e0d25100640608ed62ebf1ef0
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={data.info.pages} />
    </main>
  );
}
