const URL = import.meta.env.VITE_BASE_URL;

export async function getLists() {
  let res = await fetch(`${URL}/lists`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let data: {
    lists: {
      id: string;
      createdAt: Date;
      name: string;
    }[];
  } = await res.json();

  return data;
}
