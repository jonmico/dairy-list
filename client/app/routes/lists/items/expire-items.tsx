import { redirect } from 'react-router';
import type { Route } from './+types/expire-items';
import { expireItems } from '~/.server/services/list';

export async function action(request: Route.ActionArgs) {
  const { id } = request.params;
  // TODO: Write this.
  await expireItems(id);

  return { message: 'this is some data' };
}
