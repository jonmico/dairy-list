// TODO: Write this function.

import { db } from "~/.server/db";

interface ListItemInputData {
  brand: string;
  name: string;
  sku: number;
  expirationDate: string;
}

export async function createList(list: ListItemInputData[]) {
 const items = await db.listItem.createMany({
  data: [
    ...list.map((item) => {name: item.name, sku: item.sku,  })
  ]
 })
}
