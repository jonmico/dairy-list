const URL = import.meta.env.VITE_BASE_URL;

interface ListItemInputData {
  brand: string;
  name: string;
  sku: number;
  expirationDate: string;
}

export async function addItems(listId: string, list: ListItemInputData[]) {
  let res = await fetch(`${URL}/lists/${listId}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ list }),
  });

  let data: { updatedList: { id: string; createdAt: Date; name: string } } =
    await res.json();

  return data;
}
