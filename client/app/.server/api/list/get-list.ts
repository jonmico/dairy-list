import { db } from '~/.server/db';

export async function getList(listId: string) {
  let list = await db.dairyList.findUnique({
    where: {
      id: listId,
    },
    include: {
      items: {
        orderBy: {
          expirationDate: 'asc',
        },
      },
    },
  });

  return list;
}
