const URL = import.meta.env.VITE_BASE_URL;

export async function getLists() {
  const res = await fetch(`${URL}/lists`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data: {
    lists: {
      id: string;
      createdAt: Date;
      name: string;
    }[];
  } = await res.json();

  return data;
}
