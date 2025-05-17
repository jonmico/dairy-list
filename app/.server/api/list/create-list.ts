// TODO: Write this function.
import { db } from '~/.server/db';

interface ListItemInputData {
  brand: string;
  name: string;
  sku: number;
  expirationDate: string;
}

export async function createList(list: ListItemInputData[], listName: string) {
  // return await db.$transaction(async (tx) => {
  //   let newList = await tx.dairyList.create({
  //     data: {
  //       name: listName,
  //     },
  //   });
  // });

  let newList = await db.dairyList.create({
    data: {
      name: listName,
      items: {
        createMany: {
          data: list.map((item) => {
            return {
              name: item.name,
              sku: Number(item.sku),
              expirationDate: new Date(item.expirationDate),
              brand: item.brand,
            };
          }),
        },
      },
    },
  });

  return newList;
}
