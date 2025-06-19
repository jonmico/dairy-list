import { redirect } from 'react-router';
import type { Route } from './+types/expire-items';

export async function action(request: Route.ActionArgs) {
  // TODO: Write this.
  console.log('This is the expire items action.');

  throw redirect('/');
}
