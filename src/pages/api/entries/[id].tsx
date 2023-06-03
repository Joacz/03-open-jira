import { db } from 'database';
import { Entry } from 'models';
import { IEntry } from 'models/Entry';
import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose, { MongooseError } from 'mongoose';
// we can return a message (i.e: for error) or an entries array
type Data = { message: {} } | IEntry;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // check method
  switch (req.method) {
    case 'GET':
      return findById(req, res);
    case 'PUT':
      return changeEntry(req, res);
    default:
      return res
        .status(404)
        .json({ message: 'Requested endpoint does not exist' });
  }
}

const changeEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  const entryToUpdate = await Entry.findById(id);
  await db.connect();

  if (!entryToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: 'Entry with id ' + id + " doesn't exist." });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true }
    );

    await db.disconnect();
    res.status(200).json(updatedEntry!);
  } catch (err: any) {
    await db.disconnect();
    return res.status(400).json({
      message: {
        'Bad Request': err?.errors.status.message || err,
      },
    });
  }
};

const findById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entry = await Entry.findById(id);

  if (!entry) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: 'Entry with id ' + id + " doesn't exist." });
  }

  await db.disconnect();
  return res.status(200).json(entry!);
};
