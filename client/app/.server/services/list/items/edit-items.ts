import type { Item } from '~/types/types';

const URL = import.meta.env.VITE_BASE_URL;

interface ExpireItemsResponse {
  list: { id: string; createdAt: string; name: string; items: Item[] };
}

export async function editItems(id: string, list: Item[]) {
  // TODO: Write this.
  const res = await fetch(`${URL}/lists/${id}/items/edit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ list }),
  });

  const data: ExpireItemsResponse = await res.json();

  return { list: data.list };
}
