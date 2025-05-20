import { db } from '~/.server/db';

export async function getLists() {
  let lists = await db.dairyList.findMany({ orderBy: { createdAt: 'desc' } });

  return lists;
}
