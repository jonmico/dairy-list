import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ListItemInputData {
  brand: string;
  name: string;
}

export default function NewList() {
  const [list, setList] = useState<ListItemInputData[]>([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ListItemInputData>();

  function handleAddItem(data: ListItemInputData) {
    setList((state) => [...state, { brand: data.brand, name: data.name }]);
    reset();
  }

  return (
    <div className='flex flex-col gap-1'>
      <h1>Create a new list</h1>
      <form onSubmit={handleSubmit(handleAddItem)}>
        <div>
          <label htmlFor='brand'>Brand</label>
          <input
            {...register('brand', { required: true })}
            className='border rounded border-slate-700'
            id='brand'
          />
          {errors.brand && <div>Brand is required.</div>}
        </div>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            {...register('name', { required: true })}
            className='border rounded border-slate-700'
            id='name'
          />
          {errors.name && <div>Name is required.</div>}
        </div>
        <button
          type='submit'
          className='border rounded border-slate-700 py-1 px-4'
        >
          Add Item
        </button>
      </form>
      <ul>
        {list &&
          list.map((item) => (
            <li key={item.name}>
              {item.brand} - {item.name}
            </li>
          ))}
      </ul>
    </div>
  );
}
