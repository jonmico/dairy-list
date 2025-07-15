import { ClipboardEdit, EllipsisVertical, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router';
import { getList } from '~/.server/services/list';
import type { Route } from './+types/list';

export async function loader({ params }: Route.LoaderArgs) {
  const data = await getList(params.id);

  if (!data.list) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  return { list: data.list };
}

// TODO: Group items by date
// TODO: Add 'Save' button to save checked expired items.
// TODO: Probably switch this to a fetcher instead of a form.
export default function List({ loaderData }: Route.ComponentProps) {
  return (
    <div className='h-full grid grid-rows-[auto_1fr_auto]'>
      <div className='flex justify-between items-center gap-3'>
        <h1 className='text-xl font-bold border-b border-b-slate-700/75 w-full'>
          {loaderData.list.name}
        </h1>
        <PopOverMenu />
      </div>
      <Outlet />
    </div>
  );
}

// TODO: Figure out how to make this a reusable component. Break into separate file.
function PopOverMenu() {
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target;

      if (!target || !(target instanceof Element)) return;

      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsVisible(false);
        setTimeout(() => setIsPopOverOpen(false), 150);
      }
    }

    if (isPopOverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPopOverOpen]);

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
      <button
        ref={buttonRef}
        onClick={handlePopOver}
      >
        <EllipsisVertical />
      </button>
      {isPopOverOpen && (
        <Popover
          ref={popoverRef}
          isVisible={isVisible}
        />
      )}
    </div>
  );
}

interface PopoverProps {
  isVisible: boolean;
  ref: React.Ref<HTMLDivElement>;
}

function Popover(props: PopoverProps) {
  return (
    <div
      ref={props.ref}
      className={`absolute top-full right-0 z-50 bg-slate-900 border rounded border-slate-700 p-2 min-w-[150px] transition-all duration-150 ease-out ${
        props.isVisible
          ? 'opacity-100 scale-100 translate-y-0'
          : 'opacity-0 scale-95 -translate-y-1'
      }`}
    >
      <ul className='flex flex-col gap-2'>
        <li>
          <Link
            className='flex items-center justify-between'
            to={'expired'}
          >
            Edit
            <ClipboardEdit size={16} />
          </Link>
        </li>
        <li className='flex items-center justify-between'>
          Delete
          <Trash2 size={16} />
        </li>
      </ul>
    </div>
  );
}
