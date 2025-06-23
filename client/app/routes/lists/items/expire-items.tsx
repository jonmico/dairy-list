import { redirect } from 'react-router';
import type { Route } from './+types/expire-items';

export async function action(request: Route.ActionArgs) {
  const { id } = request.params;
  // TODO: Write this.
  console.log('This is the expire items action.');

  throw redirect(`/lists/${id}`);
}
