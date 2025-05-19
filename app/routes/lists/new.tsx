import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { redirect, useFetcher } from 'react-router';
import type { Route } from './+types/new';
import { createList } from '../../.server/api/list';
import { Trash2 } from 'lucide-react';

// TODO: Does date input work on mobile?
// TODO: Validation for 5 digits in SKU, styles are not applying
/* 
  TODO: Repeating classNames a million times is not good.
  Make some string variables?
*/

/*
  FIXME: The padding in NewList is annoying. It might be an issue with the layout in general.
  I have px-1 on a div surrounding the h1 in NewList and I have px-1 on a div surrounding
  <NewListForm> and <ItemList>. The reason for this is to keep them in line with one another in the layout.
  I need to set some type of padding on the div surrounding <NewListForm> and <ItemList> because
  overflow: hidden on the surrounding div is clipping the input highlight and it looks bad.
  This padding is a short term fix but I am not very happy with it. We need to play around with 
  the overflow settings more and figure out how to make <ItemList> scrollable.
*/

interface ListItemInputData {
  brand: string;
  name: string;
  sku: number;
  expirationDate: string;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const list = formData.get('list') as string;

  const parsedList = JSON.parse(list) as ListItemInputData[];

  const newList = await createList(parsedList, 'test name');

  throw redirect(`/lists/${newList.id}`);
}

export default function NewList() {
  const fetcher = useFetcher();
  const [list, setList] = useState<ListItemInputData[]>([]);

  const itemList = list.map((item) => (
    <li
      className=' h-30 flex justify-between items-center'
      key={item.sku}
    >
      <div>
        {item.brand} - {item.name}: {item.sku}
      </div>
      <button
        className='p-1  hover:text-slate-300 transition-colors delay-150 ease-in-out'
        onClick={() => handleRemoveItem(item.sku)}
      >
        <Trash2 />
      </button>
    </li>
  ));

  function handleRemoveItem(sku: number) {
    setList((state) => state.filter((item) => item.sku !== sku));
  }

  function handleSaveList(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const jsonList = JSON.stringify(list);

    fetcher.submit({ list: jsonList }, { method: 'post' });
  }

  return (
    <div className='h-full grid grid-rows-[auto_1fr_auto] gap-3'>
      <div className='px-1'>
        <h1 className='text-xl font-bold border-b border-b-slate-700/75'>
          Create a new list
        </h1>
      </div>
      <div className='grid grid-rows-[auto_1fr] gap-3 overflow-hidden px-1'>
        <NewListForm setList={setList} />
        <ItemList>{itemList}</ItemList>
      </div>
      <div>
        {list.length > 0 && (
          <fetcher.Form onSubmit={handleSaveList}>
            <button className='w-full border rounded bg-blue-700 border-slate-700 py-1 px-4'>
              Save List
            </button>
          </fetcher.Form>
        )}
      </div>
    </div>
  );
}

interface ListItemProps {
  item: ListItemInputData;
}

function ListItem() {}

interface NewListFormProps {
  setList: React.Dispatch<React.SetStateAction<ListItemInputData[]>>;
}

function NewListForm(props: NewListFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ListItemInputData>();

  function handleAddItem(data: ListItemInputData) {
    props.setList((state) => [
      ...state,
      {
        brand: data.brand,
        name: data.name,
        sku: data.sku,
        expirationDate: data.expirationDate,
      },
    ]);

    reset();
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleAddItem)}
      className='flex flex-col gap-3'
    >
      <FormInput>
        <label htmlFor='brand'>Brand</label>
        <input
          {...register('brand', { required: true })}
          className='user-invalid:border-red-400 border rounded border-slate-700 p-0.5'
          id='brand'
          required
        />
        {errors.brand && <div className='text-red-400 text-sm'>Required</div>}
      </FormInput>
      <FormInput>
        <label htmlFor='name'>Name</label>
        <input
          {...register('name', { required: true })}
          className='user-invalid:border-red-400 border rounded border-slate-700 p-0.5'
          id='name'
          required
        />
        {errors.name && <div className='text-red-400 text-sm'>Required</div>}
      </FormInput>
      <FormInput>
        <label htmlFor='sku'>SKU (Last 5)</label>
        <input
          {...register('sku', { required: true, minLength: 5 })}
          id='sku'
          type='number'
          inputMode='numeric'
          className='user-invalid:border-red-400 border rounded border-slate-700 p-0.5'
          required
          minLength={5}
        />
        {errors.sku && (
          <div>
            {errors.sku.type === 'required' && (
              <div className='text-red-400 text-sm'>Required</div>
            )}
            {errors.sku.type === 'minLength' && (
              <div className='text-red-400 text-sm'>
                Minimum of 5 digits required
              </div>
            )}
          </div>
        )}
      </FormInput>
      <FormInput>
        <label htmlFor='expirationDate'>Expiration Date</label>
        <input
          {...register('expirationDate', { required: true })}
          id='expirationDate'
          type='date'
          required
          className='user-invalid:border-red-400 border rounded border-slate-700 p-0.5'
        />
        {errors.expirationDate && (
          <div className='text-red-400 text-sm'>Required</div>
        )}
      </FormInput>
      <button
        type='submit'
        className='border rounded bg-blue-700 border-slate-700 py-1 px-4'
      >
        Add Item
      </button>
    </form>
  );
}

interface FormInputProps {
  children: React.ReactNode;
}

function FormInput(props: FormInputProps) {
  return <div className='flex flex-col gap-0.5'>{props.children}</div>;
}

interface ItemListProps {
  children: React.ReactNode;
}

function ItemList(props: ItemListProps) {
  return (
    <div className='overflow-auto'>
      <ul className='flex flex-col gap-1'>{props.children}</ul>
    </div>
  );
}
