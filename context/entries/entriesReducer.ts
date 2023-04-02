import { Entry, EntryStatus } from 'interfaces';
import { EntriesState } from './EntriesProvider';

type EntriesType =
  { type: 'Entry - Add New', payload: Entry }
  | { type: 'Entry - Find By Id', payload: { id: string, status: EntryStatus } }



export const entriesReducer = (state: EntriesState, action: EntriesType): EntriesState => {
  switch (action.type) {
    case 'Entry - Add New':
      return {
        ...state,
        entries: [...state.entries, action.payload]
      };
    case 'Entry - Find By Id':
      const newEntry = state.entries.filter(e => e._id === action.payload.id);

      if (newEntry.length > 0) {

        newEntry[0].status = action.payload.status;


        return {
          ...state,
          entries: [...state.entries.filter(e => e._id !== action.payload.id), ...newEntry]
        };
      }
    default:
      return state;
  }
};
