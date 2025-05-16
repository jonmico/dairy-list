interface ListItemInputData {
  brand: string;
  name: string;
  sku: number;
  expirationDate: string;
}

export async function createList(list: FormDataEntryValue) {
  console.log('This is the createList function.');
}
