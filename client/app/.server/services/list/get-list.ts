const URL = import.meta.env.VITE_BASE_URL;

export async function getList(listId: string) {
  const res = await fetch(`${URL}/lists/${listId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data: {
    list: {
      id: string;
      createdAt: string;
      name: string;
      items: {
        id: string;
        createdAt: string;
        name: string;
        expirationDate: string;
        brand: string;
        sku: number;
        dairyListId: string;
      }[];
    };
  } = await res.json();

  return data;
}
