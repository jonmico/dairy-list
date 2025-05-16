// TODO: Write this function.

interface ListItemInputData {
  brand: string;
  name: string;
  sku: number;
  expirationDate: string;
}

export async function createList(list: ListItemInputData[]) {
  console.log(list);
}
