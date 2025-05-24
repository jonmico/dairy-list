const URL = import.meta.env.VITE_BASE_URL;

interface ListItemInputData {
  brand: string;
  name: string;
  sku: number;
  expirationDate: string;
}

export async function createList(listName: string) {
  const res = await fetch(`${URL}/lists/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ listName }),
  });

  const data: { newList: { id: string; createdAt: string; name: string } } =
    await res.json();

  return data;
}
