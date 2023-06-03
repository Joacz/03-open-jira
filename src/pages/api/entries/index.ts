import { db } from 'database';
import { Entry } from 'models';
import { IEntry } from 'models/Entry';
import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
// we can return a message (i.e: for error) or an entries array
type Data =
  | { message: string; }
  | IEntry[]
  | IEntry;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  // check method
  switch (req.method) {
    case 'GET':
      return getEntries(res);
    case 'POST':
      return postEntry(req, res);
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

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { description } = req.body;

  const newEntry = new Entry({

    description: description,
    createdAt: Date.now(),

  });


  try {
    await db.connect();
    Entry.create(newEntry);
    res.status(201).json(newEntry);
    await db.disconnect();
  } catch (error) {
    await db.disconnect();
    console.log(error);

    return res.status(500).json({ message: "Something went wrong. Status code 500" });

  }

};
