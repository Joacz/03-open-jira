import { db } from 'database';
import { Entry } from 'models';
import { IEntry } from 'models/Entry';
import type { NextApiRequest, NextApiResponse } from 'next';

// we can return a message (i.e: for error) or an entries array
type Data =
  | { message: string; }
  | IEntry[];

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  // check method
  switch (req.method) {
    case 'GET':
      return getEntries(res);
    default:
      return res.status(404).json({ message: 'Requested endpoint does not exist' });
  }

}

const getEntries = async (res: NextApiResponse<Data>) => {

  // connecting db and getting entries.
  await db.connect();
  const entries = await Entry.find().sort({ createdAt: 'ascending' });
  await db.disconnect();

  // return entries
  res.status(200).json(entries);

};