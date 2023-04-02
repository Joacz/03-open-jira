import { Entry } from 'interfaces';
import mongoose, { Model, Schema } from 'mongoose';

interface IEntry extends Entry { }

const entrySchema = new Schema({

  description: { type: String, required: true },
  createdAt: { type: Number, required: true },
  status: {
    type: String,
    enum: {
      values: ['pending', 'in-progress', 'finished'],
      message: '{VALUE} is not a valid status'
    }
  }

});

const EntryModel: Model<IEntry> = mongoose.models.Entry
  || mongoose.model('Entry', entrySchema);

export default EntryModel;