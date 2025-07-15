import { editItems } from '~/.server/services/list';
import type { Route } from './+types/edit-items';
import type { Item } from '~/types/types';

export async function action({ request, params }: Route.ActionArgs) {
  const { id } = params;
  const formData = await request.formData();
  const list = formData.get('list') as string;
  const parsedList = JSON.parse(list) as Item[];

  await editItems(id, parsedList);

  return { message: 'this is some data' };
}
