import { getList } from '~/.server/api/list';
import type { Route } from './+types/list';

export async function loader({ params }: Route.LoaderArgs) {
  let list = await getList(params.id);

  if (!list) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  return { list };
}

export default function List({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1>Welcome to the List page.</h1>
    </div>
  );
}
