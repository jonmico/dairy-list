import { useState } from 'react';
import { useFetcher } from 'react-router';
import type { Item } from '~/types/types';
import type { action } from './edit-items';
import { getList } from '~/.server/services/list';
import type { Route } from './+types/items';

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

export default function Items({ loaderData }: Route.ComponentProps) {
  const [checkedItems, setCheckedItems] = useState<Item[]>([]);
  const fetcher = useFetcher<typeof action>();

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
      { method: 'post', action: 'edit-items' }
    );
  }
  return (
    <>
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
    </>
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
