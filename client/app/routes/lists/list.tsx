import { ClipboardEdit, EllipsisVertical, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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

interface Item {
  id: string;
  createdAt: string;
  name: string;
  expirationDate: string;
  brand: string;
  sku: number;
  dairyListId: string;
}

export default function List({ loaderData }: Route.ComponentProps) {
  const [checkedList, setCheckedList] = useState<Item[]>([]);
  const [list, setList] = useState(loaderData.list.items);

  function handleAddToCheckedList(id: string) {
    setCheckedList((prevCheckedList) => [
      ...prevCheckedList,
      ...list.filter((item) => item.id === id),
    ]);
    setList((prevList) => prevList.filter((item) => item.id !== id));
  }

  function handleRemoveFromCheckedList(id: string) {
    setList((prevList) => [
      ...prevList,
      ...checkedList.filter((item) => item.id === id),
    ]);
    setCheckedList((prevCheckedList) =>
      prevCheckedList.filter((item) => item.id !== id)
    );
  }

  const renderedList = list.map((item) => {
    return (
      <ListItem
        handleCheckItem={() => handleAddToCheckedList(item.id)}
        key={item.sku}
        item={item}
      />
    );
  });

  const renderedCheckedList = checkedList?.map((item) => {
    return (
      <CheckedListItem
        handleCheckItem={() => handleRemoveFromCheckedList(item.id)}
        item={item}
        key={item.sku}
      />
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
      <div>
        <h2>This is the renderedList</h2>
        <ul>{renderedList}</ul>
      </div>
      {renderedCheckedList.length > 0 && (
        <div>
          <h2>This is the renderedCheckList</h2>
          <ul>{renderedCheckedList}</ul>
        </div>
      )}
    </div>
  );
}

interface ListItemProps {
  item: {
    id: string;
    createdAt: string;
    name: string;
    expirationDate: string;
    brand: string;
    sku: number;
    dairyListId: string;
  };
  handleCheckItem: () => void;
}

function ListItem(props: ListItemProps) {
  const date = new Date(props.item.expirationDate).toLocaleDateString();
  const skuString = String(props.item.sku);

  return (
    <li className='flex gap-3 items-center'>
      <input
        onChange={props.handleCheckItem}
        id={skuString}
        type='checkbox'
      />
      <label htmlFor={skuString}>
        {props.item.name} - {props.item.brand} - {date}
      </label>
    </li>
  );
}

interface CheckedListItemProps {
  item: {
    id: string;
    createdAt: string;
    name: string;
    expirationDate: string;
    brand: string;
    sku: number;
    dairyListId: string;
  };
  handleCheckItem: () => void;
}

interface CheckedListProps {
  checkedList: Item[];
  handleRemoveItem: (id: string) => void;
}

function CheckedList(props: CheckedListProps) {}

function CheckedListItem(props: CheckedListItemProps) {
  const date = new Date(props.item.expirationDate).toLocaleDateString();
  const skuString = String(props.item.sku);

  return (
    <li className='flex gap-3 text-gray-500/75 items-center'>
      <input
        onChange={props.handleCheckItem}
        id={skuString}
        type='checkbox'
        checked={true}
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
