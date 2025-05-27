import { Form, redirect, useFetcher } from 'react-router';
import PageHeader from '~/components/page-header';
import type { Route } from './+types/create-list';
import { createList } from '~/.server/services/list';

interface Errors {
  listName?: string;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const listName = formData.get('listName') as string;
  const errors: Errors = {};

  if (typeof listName !== 'string' || !listName) {
    errors.listName = 'Required';
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const { newList } = await createList(listName);

  throw redirect(`/lists/${newList.id}/add-items`);
}

export default function CreateList({ actionData }: Route.ComponentProps) {
  const errors = actionData?.errors;

  return (
    <div className='flex flex-col gap-3'>
      <PageHeader>Create a new list</PageHeader>
      <Form
        noValidate
        method='post'
        className='flex flex-col gap-3'
      >
        <div className='flex flex-col'>
          <label htmlFor='listName'>List Name</label>
          <input
            name='listName'
            id='listName'
            className={`border rounded p-0.5  ${
              errors?.listName ? 'border-red-400' : 'border-slate-700 '
            } `}
            required
          />
          {errors?.listName && (
            <p className='text-red-400 text-sm'>{errors.listName}</p>
          )}
        </div>
        <button
          type='submit'
          className='border rounded bg-green-800 border-slate-700 py-1.5 px-4'
        >
          Save
        </button>
      </Form>
    </div>
  );
}
