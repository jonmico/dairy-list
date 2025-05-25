import { getList } from '~/.server/services/list';
import type { Route } from './+types/list';
import PageHeader from '~/components/page-header';
import { ClipboardEdit, EllipsisVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';

export async function loader({ params }: Route.LoaderArgs) {
  let data = await getList(params.id);

  if (!data.list) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  return { list: data.list };
}

export default function List({ loaderData }: Route.ComponentProps) {
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  let list = loaderData.list.items.map((item) => {
    return (
      <li key={item.id}>
        <div>
          {item.brand} - {item.name}
        </div>
        <div>
          {item.sku} - {new Date(item.expirationDate).toDateString()}
        </div>
      </li>
    );
  });

  return (
    <div>
      <div className='flex justify-between items-center gap-3'>
        <h1 className='text-xl font-bold border-b border-b-slate-700/75 w-full'>
          {loaderData.list.name}
        </h1>
        <PopOverMenu />
      </div>
      <ul>{list}</ul>
    </div>
  );
}

function PopOverMenu() {
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  function handlePopOver() {
    if (!isPopOverOpen) {
      setIsPopOverOpen(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setIsPopOverOpen(false), 150);
    }
  }

  return (
    <div className='relative flex items-center'>
      <button onClick={handlePopOver}>
        <EllipsisVertical />
      </button>
      {isPopOverOpen && <Popover isVisible={isVisible} />}
    </div>
  );
}

interface PopoverProps {
  isVisible: boolean;
}

function Popover(props: PopoverProps) {
  return (
    <div
      className={`absolute top-full right-0 z-50 bg-slate-900 border rounded border-slate-700 p-2 min-w-[150px] transition-all duration-150 ease-out ${
        props.isVisible
          ? 'opacity-100 scale-100 translate-y-0'
          : 'opacity-0 scale-95 -translate-y-1'
      }`}
    >
      <ul className='flex flex-col gap-2'>
        <li className='flex items-center justify-between'>
          Edit
          <ClipboardEdit size={16} />
        </li>
        <li className='flex items-center justify-between'>
          Delete
          <Trash2 size={16} />
        </li>
      </ul>
    </div>
  );
}
