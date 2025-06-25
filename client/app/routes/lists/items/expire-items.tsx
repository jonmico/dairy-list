import { expireItems } from '~/.server/services/list';
import type { Route } from './+types/expire-items';

export async function action({ request, params }: Route.ActionArgs) {
  const { id } = params;
  const formData = await request.formData();
  const list = formData.get('list') as string;
  const parsedList = JSON.parse(list) as string[];

  console.log('parsedList', parsedList);

  await expireItems(id, parsedList);

  return { message: 'this is some data' };
}
