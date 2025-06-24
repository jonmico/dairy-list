const URL = import.meta.env.VITE_BASE_URL;

export async function expireItems(id: string) {
  // TODO: Write this.
  const res = await fetch(`${URL}/lists/${id}/items/expire`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  console.log(data);
  console.log('Expire items. Congratulations, you made it.');
}
