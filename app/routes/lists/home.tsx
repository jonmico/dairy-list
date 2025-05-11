import { ListPlus } from 'lucide-react';
import { Link } from 'react-router';

export default function Home() {
  return (
    <div>
      <Link
        className=' p-2 border border-slate-700/75 rounded inline-block w-min hover:border-blue-700/75 transition-colors duration-200 ease-in-out'
        to={'new'}
      >
        <ListPlus />
      </Link>
      <h2>This is the Lists Home page.</h2>
    </div>
  );
}
