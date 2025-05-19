import { ListPlus } from 'lucide-react';
import { Link } from 'react-router';
import { getLists } from '~/.server/api/list';
import type { Route } from './+types/home';

export async function loader() {
  let lists = await getLists();

  return { lists };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  let list = loaderData.lists.map((list) => {
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
          to={'new'}
        >
          <ListPlus />
        </Link>
      </div>
      <ul>{list}</ul>
    </div>
  );
}
