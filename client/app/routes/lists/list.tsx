import { getList } from '~/.server/services/list';
import type { Route } from './+types/list';

export async function loader({ params }: Route.LoaderArgs) {
  let data = await getList(params.id);

  if (!data.list) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  return { list: data.list };
}

export default function List({ loaderData }: Route.ComponentProps) {
  let list = loaderData.list.items.map((item) => {
    return (
      <li key={item.id}>
        <div>
          {item.brand} - {item.name}
        </div>
        <div>
          {item.sku} - {new Date(item.expirationDate).toDateString()}
        </div>
      </li>
    );
  });
  return (
    <div>
      <h1>Welcome to the List page.</h1>
      <ul>{list}</ul>
    </div>
  );
}
