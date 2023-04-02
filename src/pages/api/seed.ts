import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from 'database';
import { Entry } from 'models';
import { seedData } from 'database';

type Data = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  console.log(process.env.MONGO_URL);

  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: "You don't have access to this service." });
  }

  await db.connect();

  await Entry.deleteMany();
  await Entry.insertMany(seedData.entries);

  await db.disconnect();

  res.status(200).json({
    message: "Process completed successfully"
  });

}