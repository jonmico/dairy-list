interface ListItemInputData {
  brand: string;
  name: string;
  sku: number;
  expirationDate: string;
}

export async function createList(list: ListItemInputData[], listName: string) {
  const res = await fetch('http://localhost:3000/api/lists/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ list, listName }),
  });

  const data: { newList: { id: string; createdAt: string; name: string } } =
    await res.json();

  return data;
}
