import { ClipboardEdit, EllipsisVertical, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getList } from '~/.server/services/list';
import type { Item } from '~/types/types';
import type { Route } from './+types/list';
import { Form, useFetcher } from 'react-router';
import type { action } from './items/expire-items';

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
  const [checkedItems, setCheckedItems] = useState<Item[]>([]);
  const fetcher = useFetcher<typeof action>();

  console.log(checkedItems);

  function handleCheck(item: Item, checked: boolean) {
    setCheckedItems((state) => {
      if (checked) {
        item.expired = true;
        return [...state, item];
      } else {
        return state.filter((i) => i.id !== item.id);
      }
    });
  }

  const renderedList = loaderData.list.items.map((item) => {
    if (!item.expired)
      return (
        <ListItem
          handleCheck={handleCheck}
          key={item.sku}
          item={item}
        />
      );
  });

  function handleSaveExpiredItems(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const jsonCheckedItems = JSON.stringify([...checkedItems]);

    setCheckedItems([]);

    fetcher.submit(
      { list: jsonCheckedItems },
      { method: 'post', action: 'expire-items' }
    );
  }

  return (
    <div className='h-full grid grid-rows-[auto_1fr_auto]'>
      <div className='flex justify-between items-center gap-3'>
        <h1 className='text-xl font-bold border-b border-b-slate-700/75 w-full'>
          {loaderData.list.name}
        </h1>
        <PopOverMenu />
      </div>
      <div>
        <div>
          <ul className='overflow-scroll flex flex-col gap-2 py-1.5'>
            {renderedList}
          </ul>
        </div>
      </div>
      {checkedItems.length > 0 ? (
        <form onSubmit={handleSaveExpiredItems}>
          <button className='w-full rounded py-1.5 px-4 bg-indigo-700'>
            Save
          </button>
        </form>
      ) : null}
    </div>
  );
}

interface ListItemProps {
  item: Item;
  handleCheck: (item: Item, checked: boolean) => void;
}

// FIXME: When refreshing page, random items are checked and still in the list. Why?
// TODO: This needs to be styled better.
function ListItem(props: ListItemProps) {
  const date = new Date(props.item.expirationDate).toLocaleDateString();
  const skuString = String(props.item.sku);
  const [isChecked, setIsChecked] = useState(false);

  function handleCheck(evt: React.ChangeEvent<HTMLInputElement>) {
    setIsChecked(evt.target.checked);
    const item = { ...props.item };
    props.handleCheck(item, evt.target.checked);
  }

  return (
    <li
      className={`flex gap-3 items-center bg-blue-950/50 rounded p-2 ${
        isChecked && 'line-through text-slate-500/65'
      }`}
    >
      <input
        checked={isChecked}
        onChange={handleCheck}
        id={skuString}
        type='checkbox'
      />
      <label htmlFor={skuString}>
        {props.item.name} - {props.item.brand} - {date}
      </label>
    </li>
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
