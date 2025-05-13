import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ListItemInputData {
  brand: string;
  name: string;
  sku: number;
}

export default function NewList() {
  const [list, setList] = useState<ListItemInputData[]>([]);

  const itemList = list.map((item) => (
    <li key={item.name}>
      {item.brand} - {item.name}: {item.sku}
    </li>
  ));

  return (
    <div className='flex flex-col gap-3'>
      <h1 className='text-xl font-bold border-b border-b-slate-700/75'>
        Create a new list
      </h1>
      <NewListForm setList={setList} />
      <ItemList>{itemList}</ItemList>
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
      { brand: data.brand, name: data.name, sku: data.sku },
    ]);

    reset();
  }

  return (
    <form onSubmit={handleSubmit(handleAddItem)}>
      <div>
        <label htmlFor='brand'>Brand</label>
        <input
          {...register('brand', { required: true })}
          className='border rounded border-slate-700'
          id='brand'
        />
        {errors.brand && <div>Required.</div>}
      </div>
      <div>
        <label htmlFor='name'>Name</label>
        <input
          {...register('name', { required: true })}
          className='border rounded border-slate-700'
          id='name'
        />
        {errors.name && <div>Required.</div>}
      </div>
      <div>
        <label htmlFor='sku'>SKU (Last 5)</label>
        <input
          {...register('sku', { required: true, minLength: 5 })}
          id='sku'
          type='number'
          inputMode='numeric'
          className='border rounded border-slate-700'
        />
        {errors.sku && (
          <div>
            {errors.sku.type === 'required' && <div>Required</div>}
            {errors.sku.type === 'minLength' && (
              <div>Minimum of 5 digits required</div>
            )}
          </div>
        )}
      </div>
      <button
        type='submit'
        className='border rounded border-slate-700 py-1 px-4'
      >
        Add Item
      </button>
    </form>
  );
}

interface ItemListProps {
  children: React.ReactNode;
}

function ItemList(props: ItemListProps) {
  return <ul>{props.children}</ul>;
}
