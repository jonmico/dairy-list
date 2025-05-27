import { ListPlus } from 'lucide-react';
import { Link } from 'react-router';
import type { Route } from './+types/home';
import { getLists } from '~/.server/services/list';

export async function loader() {
  const data = await getLists();

  return { lists: data.lists };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const list = loaderData.lists.map((list) => {
    return (
      <li key={list.id}>
        <Link to={`${list.id}`}>{list.name}</Link>
      </li>
    );
  });

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-end'>
        <Link
          className=' p-2 border border-slate-700/75 rounded inline-block w-min hover:border-blue-700/75 transition-colors duration-200 ease-in-out'
          to={'create'}
        >
          <ListPlus />
        </Link>
      </div>
      <ul>{list}</ul>
    </div>
  );
}
