import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFetcher } from 'react-router';
import type { Route } from './+types/new';
import { createList } from '../../.server/api/list';

// TODO: Does date input work on mobile?
// TODO: Validation for 5 digits in SKU, styles are not applying
/* 
  TODO: Repeating classNames a million times is not good.
  Make some string variables?
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

  createList(parsedList);

  return null;
}

export default function NewList() {
  const fetcher = useFetcher();
  const [list, setList] = useState<ListItemInputData[]>([]);

  const itemList = list.map((item) => (
    <li key={item.sku}>
      {item.brand} - {item.name}: {item.sku}
    </li>
  ));

  function handleSaveList(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const jsonList = JSON.stringify(list);

    console.log(jsonList);

    fetcher.submit({ list: jsonList }, { method: 'post' });
  }

  return (
    <div className='flex flex-col gap-3'>
      <h1 className='text-xl font-bold border-b border-b-slate-700/75'>
        Create a new list
      </h1>
      <NewListForm setList={setList} />
      <ItemList>{itemList}</ItemList>
      {list.length > 0 && (
        <fetcher.Form onSubmit={handleSaveList}>
          <button className='border rounded bg-blue-700 border-slate-700 py-1 px-4'>
            Save List
          </button>
        </fetcher.Form>
      )}
    </div>
  );
}

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
  return <ul className='flex flex-col gap-1'>{props.children}</ul>;
}
